1.
index.js 为模块的入口文件

具体模块的定义 在路径 modules 中

2.common.js 为公共方法


基本模板
```
const common = require('../common')

const sendMsg = common.sendMsg


const rawMsg = body['raw_message']
const groupId = body['group_id']
const userId = body['sender']['user_id']