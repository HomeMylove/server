const axios = require('axios')
const config = require('../config')

/**
 * @function 发送一条消息
 * @param {int} msgType group or private
 * @param {int} id 
 * @param {string} msg 
 * @param {string} imgURL 图片的url,以 /images 开始
 * 
 */
module.exports.sendMsg = (msgType, id, msg, imgURL) => {
    let path = null
    if (imgURL) imgURL = `${config.host}:${config.port}` + imgURL
    msg = imgURL ? msg + `[CQ:image,file=${imgURL}]` : msg
    msg = encodeURI(msg)
    if (msgType === 'private') {
        path = `http://127.0.0.1:5700/send_private_msg?user_id=${id}&message=${msg}&auto_escape=false`
    } else {
        path = `http://127.0.0.1:5700/send_group_msg?group_id=${id}&message=${msg}&auto_escape=false`
    }
    axios.get(path).then(
        console.log('发送成功:', msg)
    ).catch(error => {
        console.error(error);
    })
}


/**
 * @function 获取群成员的信息
 * @param {int} groupId 群id
 * @param {int} userId 群成员id
 * @returns promise object 
 */
module.exports.getGroupMemberInfo = async function getGroupMemberInfo(groupId, userId) {
    let api = `http://127.0.0.1:5700/get_group_member_info?group_id=${groupId}&user_id=${userId}`
    let data
    await axios.get(api).then(response => {
        data = response['data']['data']
            // nickname = data['nickname']
    }).catch(error => {
        console.error(error);
    })
    return data
}

/**
 * @function 返回一句随机回复
 * @param {arrary} arr 
 */
module.exports.randomReply = arr => {
    let num = arr.length
    num = Math.floor(Math.random() * num)
    return arr[num]
}