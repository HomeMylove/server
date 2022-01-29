const diceGame = require('./modules/diceGame/index')
const getWallpaper = require('./modules/getWallpaper/index')
const autoChat = require('./modules/autoChat/index')
const signIn = require('./modules/signIn/index')

const { rememberMyName, remindMyName } = require('./modules/callName/index')

module.exports = {
    diceGame,
    getWallpaper,
    autoChat,
    rememberMyName,
    remindMyName,
    signIn
}