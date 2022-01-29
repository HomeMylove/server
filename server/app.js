const express = require('express')
    // 创建app
const app = express()
    // 解决跨域问题(如果有的话)
const cors = require('cors')
app.use(cors())
    // 提取 post 请求的 body 数据
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 全局函数
// 重置数据库
const resetSignIn = require('./modules/modules/signIn/resetSignIn')
resetSignIn()

//引入中间件 为 res 绑定 公共方法
const { commonFuns } = require('./middlewares/commonFuns')
app.use(commonFuns)

// 引入中间件 处理群聊消息 和 私聊消息
const { groupHandler, privateHandler } = require('./middlewares/middleware')
app.use(groupHandler)
app.use(privateHandler)


app.post('/', (req, res) => {
    // console.log('这是在最后一部打印的================');
    let body = req.body
        // console.log(body);

    let msgType = body['message_type'] // 私人还是群聊
    let postType = body['post_type'] // 消息类型
    let userId = body['sender']['user_id']
    let rawMsg = body['raw_message']

    const user = {
            user_id: userId,
            group_id: body['group_id']
        }
        // res.selectData(user).then(results => {
        //         console.log(results[0]);
        //     })
        // res.updateData(user, {
        //     name: 'helloOK'
        // })

    // console.log('这是在最后一步打印的**************');

    res.send('ok')

})


// 监听5701端口
app.listen(5701, () => {
    console.log('express server is running at 127.0.0.1');
})