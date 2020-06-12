const State = require('../../Config/Parse.json')

exports.parseState = function (state) {
    return State.State[parseInt(state)]
}
exports.parseClassState = function(state){
    return State.ClassState[parseInt(state)]
}
exports.parseLevel = function (level) {
    return State.Level[parseInt(level)]
}
exports.parseDate = function (Da) {
    let d1 = Da.split('/')
    let Dat = new Date().getTime()
    return (Dat - Date.parse(d1[1] + "/" + d1[0] + "/" + d1[2]))

}