const DBMS = require("../../Config/DBMS");

// app: Server listening request and response to client side
// User: Database

module.exports = function (app, Users, ObjectId) {
  Users.collection("ClientDeviceControl")
    .find({})
    .toArray((err, res) => {
      if (err) throw err;
      // console.log("GPSDeviceCollection");
      // console.log(res);
    });

    app.post("/cli-main/get-gps-information", (req, res) => {
      Users.collection(DBMS.GPSDeviceCollection)
        .find(
          {
            DeviceOwnerID: req.user.id,
          },
          { projection: { DeviceStatus: 1, DeviceData: 1 } }
        )
        .toArray(function (err, response) {
          // console.log(response)
          res.send(response);
        });
    });
  
    app.post("/cli-main/update-zone-latLngRad", (req, res) => {
      Users.collection(DBMS.ClientDeviceControl).updateOne(
        {
          _id: ObjectId(req.body._id),
          OwnerId: req.user.id,
          GPSID: req.body.GPSID,
        },
        {
          $set: {
            Data: [parseFloat(req.body.Long), parseFloat(req.body.Lat)],
            Radius: parseInt(req.body.Radius),
          },
        }
      );
      res.send("zone update")
    });

  app.post("/cli-main/add-new-zone", (req,res) => {
    Users.collection(DBMS.ClientDeviceControl).insertOne({
      OwnerId: req.user.id,
      GPSID: req.body.GPSID,
      GPSName: '',
      InformID: '',
      InformName: '',
      Radius: parseInt(req.body.Radius),
      Data: [ parseFloat(req.body.Long), parseFloat(req.body.Lat) ]
    })
    res.send("add new zone")
  })

  app.post("/cli-main/delete-zone", (req, res) => {
    Users.collection(DBMS.ClientDeviceControl).deleteOne(
      {
        _id: ObjectId(req.body._id),
        OwnerId: req.user.id,
        GPSID: req.body.GPSID,
      }
    )
    res.send("zone deleted")
  })

  app.post("/cli-main/get-zone-information", (req, res) => {
    Users.collection(DBMS.ClientDeviceControl)
      .find({
        OwnerId: req.user.id,
        GPSID: req.body.GPSID,
      })
      .toArray(function (err, response) {
        res.send(response);
      });
  });
};
