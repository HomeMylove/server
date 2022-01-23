const axios = require('axios')

/**
 * @function 发送一条消息
 * @param {int} msgType group or private
 * @param {int} id 
 * @param {string} msg 
 */
module.exports.sendMsg = function sendMsg(msgType, id, msg) {
    let path = null
    if (msgType === 'private') {
        path = `http://127.0.0.1:5700/send_private_msg?user_id=${id}&message=${msg}&auto_escape=false`
    } else {
        path = `http://127.0.0.1:5700/send_group_msg?group_id=${id}&message=${msg}&auto_escape=false`
    }
    axios.get(path).then(
        console.log('成功')
    ).catch(error => {
        console.error(error);
    })
}


/**
 * @function 获取群成员的昵称
 * @param {int} groupId 群id
 * @param {int} userId 群成员id
 * @returns promise object 
 */
module.exports.getGroupMemberInfo = async function getGroupMemberInfo(groupId, userId) {
    let api = `http://127.0.0.1:5700/get_group_member_info?group_id=${groupId}&user_id=${userId}`
    let nickname
    await axios.get(api).then(response => {
        let data = response['data']['data']
        nickname = data['nickname']
    }).catch(error => {
        console.error(error);
    })
    return nickname
}