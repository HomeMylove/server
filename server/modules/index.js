const { diceGame } = require('./modules/diceGame')
const { getWallpaper } = require('./modules/getWallpaper')
const { autoChat } = require('./modules/autoChat')
const { greeting } = require('./modules/greeting')
const { callName } = require('./modules/callName')
const { rememberMyName, remindMyName } = require('./modules/rememberMyName')

module.exports = {
    diceGame,
    getWallpaper,
    autoChat,
    greeting,
    callName,
    rememberMyName,
    remindMyName
}