const State = require('../../Config/Parse.json')

exports.parseState = function (state) {
    return State.State[parseInt(state)]
}
exports.parseClassState = function (state) {
    return State.ClassState[parseInt(state)]
}
exports.parseLevel = function (level) {
    return State.Level[parseInt(level)]
}
exports.parseDate = function (Da) {
    let Dat = new Date().getTime();
    return (Dat - Date.parse(Da));

}
exports.parseDateStart = function (dashboardType) {
    if (dashboardType == 0) {
        let nowTime = new Date();
        let dayIndex = nowTime.getDay();
        dayIndex = (dayIndex != 0)?dayIndex:7;
        // nowTime = nowTime.getTime();
        nowTime.setDate(nowTime.getDate()-dayIndex)
        return [
            nowTime.toISOString().substring(0,10),
            State.DashBoard.Week.slice(0,dayIndex)
        ]
    }
    else if(dashboardType == 1){
        let nowTime = new Date()
        let month = nowTime.getMonth()
        listState = []
        for(let i = 1; i <= nowTime.getDate(); i++){
            listState.push(i+"/"+month)
        }
        nowTime.setDate(0)
        return[
            nowTime.toISOString().substring(0,10),
            listState
        ]

    }
    else if(dashboardType == 2){
        
    }
}
exports.parseDateDash = function(listData, DayStart){
    let peerDate = new Date(DayStart)
    let nowDate = new Date().toISOString().substring(0,10)
    let returnVal = [], data = "",indexListData = 0, len = listData.length;
    while(data != nowDate){
        // console.log("data;",data)
        peerDate.setDate(peerDate.getDate()+1)
        data = peerDate.toISOString().substring(0,10)
        if(indexListData == len ||  listData[indexListData]._id != data ){
            returnVal.push(0)
        }
        else{
            returnVal.push(listData[indexListData].count)
            indexListData++;
        }
    }
    return returnVal
}