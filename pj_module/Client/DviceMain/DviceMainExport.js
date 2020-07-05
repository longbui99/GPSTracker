const DBMS = require("../../Config/DBMS");

// app: Server listening request and response to client side
// User: Database

module.exports = function (app, Users, ObjectId) {
  Users.collection("GPSDeviceCollection")
    .find({})
    .toArray((err, res) => {
      if (err) throw err;
      //console.log("GPSDeviceCollection");
      //console.log(res);
    });

  app.post("/cli-main/get-devices-client-information", (req, res) => {
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
