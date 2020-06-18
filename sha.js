var kvArray = [{key: 1}, 
    {key: 2}, 
    {key: 3}];

var reformattedArray = kvArray.map(obj =>{ 
var rObj = {};
rObj[obj.key] = obj.value;
return rObj;
});

console.log(reformattedArray)