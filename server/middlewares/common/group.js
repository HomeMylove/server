const funs = require('../../modules/index')
const config = require('../../config')
const path = require('path')

const robotNames = [...config.robotNicknames, config.robotName]

// const fs = require('fs')
// const help = fs.readFileSync(path.join(__dirname, 'explain.json'), 'utf8')
// console.log(help);
const explain = require('./explain')


module.exports.groupHandler = (req, res, next) => {
    let body = req['body']


    // 群消息则进入
    if (body['message_type'] === 'group') {

        // 消息内容
        let rawMsg = body['raw_message'].trim()
        let groupId = body['group_id']
        let userId = body['user_id']

        // 机器人id
        const selfId = body['self_id']

        // 骰子对决功能
        if (rawMsg.indexOf('掷骰子') !== -1) {
            funs.diceGame(body, res)

            // 随机壁纸功能
        } else if (['随机壁纸'].indexOf(rawMsg) !== -1) {
            funs.getWallpaper(body, res)

            // 问候
        } else if (['早', '早上好', '下午好', '晚上好'].indexOf(rawMsg) !== -1) {
            // funs.greeting(body, res)

        } else if (rawMsg === '签到') {
            funs.signIn(body, res)
        }

        // console.log(robotName);
        let name = robotNames.find(item => rawMsg.indexOf(item) == 0)
        if (name) {
            // 去掉名字
            rawMsg = rawMsg.replace(name, '').trim()
            body['raw_message'] = rawMsg
            if (!rawMsg) {
                if (userId == config.SUPERUSER) {
                    res.sendMsg({ groupId, msg: `${config.robotName}在哦~主人~` })
                } else {
                    res.sendMsg({ groupId, msg: `客人,请问有什么事吗` })
                }

            } else if (rawMsg.indexOf(`以后叫我`) === 0) {
                funs.rememberMyName(body, res)
            } else if (rawMsg === `我是谁`) {
                funs.remindMyName(body, res)
            } else if (rawMsg == '帮助') {
                res.sendMsg({ groupId, msg: explain['help'] })
            } else if (rawMsg == '你是谁') {
                res.sendMsg({ groupId, msg: explain['selfIntroduce'] })
            } else if (rawMsg === '签到') {
                funs.signIn(body, res)
            } else {
                funs.autoChat(body, res)
            }


        }


    }

    next()
}