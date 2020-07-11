const DBMS = require("../Config/DBMS");
const MQTT = require("../MQTT/MQTTExport");

let User = null;
let ObjectId = null;
let io = null;
exports.Init = function (app, Users, ObjectIds, ios) {
  User = Users;
  ObjectId = ObjectIds;
  io = ios;
  app.post("/cli-main/get-devices-gps-information", (req, res) => {
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

  app.post("/cli-main/update-gps-radius", (req, res) => {
    User.collection(DBMS.ClientDeviceControl).updateOne(
      {
        OwnerId: req.user.id,
        GPSID: req.body.GPSID,
      },
      {
        $set: {
          Radius: parseInt(req.body.Radius),
        },
      }
    );
    // console.log(req.body)
    let tmp = SingleAnalyze(req.body.GPSID, req.user.id);
    res.send(tmp);
  });

  app.post("/cli-main/update-gps-coordinates", (req, res) => {
    // console.log(req.body)
    User.collection(DBMS.ClientDeviceControl).updateOne(
      {
        OwnerId: req.user.id,
        GPSID: req.body.GPSID,
      },
      {
        $set: {
          Data: [parseFloat(req.body.Long), parseFloat(req.body.Lat)],
        },
      }
    );
    let tmp = SingleAnalyze(req.body.GPSID, req.user.id);
    res.send(tmp);
  });

  app.post("/cli-main/get-original-value", async (req, res) => {
    let resp = await User.collection(DBMS.ClientDeviceControl)
      .find(
        {
          OwnerId: req.user.id,
        },
        { projection: { GPSID: 1, GPSName: 1, Data: 1, Radius: 1 } }
      )
      .toArray();
    res.send(resp);
  });
};

function calculatedistance(lon1, lat1, lon2, lat2) {
  // console.log(lon1, lat1)
  // console.log(lon2, lat2)
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
}

exports.AnalyzesSystem = async function (listGPS = null) {
  let listUserControl = await User.collection(DBMS.GPSDeviceCollection)
    .aggregate([
      {
        $addFields: {
          newId: {
            $toString: "$_id",
          },
        },
      },
      {
        $lookup: {
          from: "ClientDeviceControl",
          localField: "newId",
          foreignField: "GPSID",
          as: "Id",
        },
      },
    ])
    .toArray();
  // console.log(listUserControl)
  listUserControl.forEach((element) => {
    if (element.Id.length > 0) {
      let distance = calculatedistance(
        element.DeviceData.Longitude,
        element.DeviceData.Latitude,
        element.Id[0].Data[0],
        element.Id[0].Data[1]
      );
      let tmp = 0;
      if (element.Id[0].Radius < distance) {
        tmp = 1;
      }
      MQTT.publicizeToDevice(element.Id[0].InformId, tmp, element.DeviceStatus);
      io.to(element.DeviceOwnerID).emit("update-status-GPS", {
        id: element.Id[0].GPSID,
        status: tmp,
      });
      User.collection(DBMS.GPSDeviceCollection).updateOne(
        {
          _id: element._id,
        },
        { $set: { DeviceStatus: tmp } }
      );
    }
  });
};
exports.SingleAnalyze = SingleAnalyze;

async function SingleAnalyze(GPSoptions = null, UserId = null) {
  let DeviceGPSData = await User.collection(DBMS.GPSDeviceCollection).findOne(
    {
      _id: ObjectId(GPSoptions),
    },
    { projection: { DeviceData: 1, DeviceStatus: 1 } }
  );
  let UserGPSData = await User.collection(DBMS.ClientDeviceControl).findOne(
    {
      GPSID: GPSoptions,
    },
    { projection: { Data: 1, InformId: 1, Radius: 1 } }
  );

  let distance = calculatedistance(
    DeviceGPSData.DeviceData.Longitude,
    DeviceGPSData.DeviceData.Latitude,
    UserGPSData.Data[0],
    UserGPSData.Data[1]
  );
  let tmp = 0;
  if (UserGPSData.Radius < distance) {
    tmp = 1;
  }
  MQTT.publicizeToDevice(UserGPSData.InformId, tmp, DeviceGPSData.DeviceStatus);
  io.to(UserId).emit("update-status-GPS", {
    id: GPSoptions,
    status: tmp,
  });
  User.collection(DBMS.GPSDeviceCollection).updateOne(
    {
      _id: ObjectId(GPSoptions),
    },
    { $set: { DeviceStatus: tmp } }
  );
  // console.log(distance)
  return true;
}
