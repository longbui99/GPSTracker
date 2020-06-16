
let lisst = [
    {_id:"2016-06-07",count:2},
    {_id:"2016-06-10",count:1},
    {_id:"2016-06-13",count:10},
    {_id:"2016-06-14",count:1}
]

DayStart = "2020-05-16"
let t = DayStart.split('-')
let dayStart = parseInt(t[2])
let monthStart = parseInt(t[1])

let nowDate = new Date()
let Year=  nowDate.getFullYear()
let endDate = nowDate.getDate()+1;
let endMonth = nowDate.getMonth()+1;
let loopDay = dayStart, loopMonth = monthStart;
let endOfMonth = new Date(Year,monthStart,0).getDate()

let index = 0, listSize = lisst.length;
let returnVal = []

let compareValue = 100*(parseInt(lisst[index]._id.substring(5,7)))+parseInt(lisst[index]._id.substring(8,10))

console.log("Start:\t",monthStart, dayStart)
console.log("End:\t",endMonth,endDate)
console.log("EOM:\t",endOfMonth)
console.log("CPV:\t",compareValue)
while(!(loopDay == endDate && loopMonth == endMonth)){
    if (index == listSize || (compareValue != (loopDay+100*loopMonth))){
        console.log(compareValue)
        returnVal.push(0)
    }
    else{
        returnVal.push(lisst[index].count)
        index ++;
        if (index < listSize)
        compareValue = 100*(parseInt(lisst[index]._id.substring(5,7)))+parseInt(lisst[index]._id.substring(8,10))
        // console.log(parseInt(lisst[index]._id.substring(9,10)))
    }


    if (loopDay == endOfMonth){
        loopMonth++;
        endOfMonth = new Date(Year,loopMonth,0 ).getDate()
        loopDay = 0
    }
    loopDay++;
}
console.log(returnVal)
