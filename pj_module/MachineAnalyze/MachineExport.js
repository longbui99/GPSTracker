const Kmeans = require('node-kmeans');
const DBMS = require('../Config/DBMS')

exports.Kmeans = async function (res, ArrayData, kmean) {
    Kmeans.clusterize(ArrayData, { k: kmean }, (err, result) => {
        if (err) console.error(err);
        else {
            res.send(result)
        }
    });
}