const da1 = '12/05/2020';

let d1 = da1.split('/')
let Dat = new Date().getTime()
let returnVal =  Math.ceil((Dat - Date.parse(d1[1] + "/" +d1[0]+ "/" +d1[2]))/(1000*60*60*24))

console.log(returnVal)