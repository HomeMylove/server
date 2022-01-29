1.
index.js 为模块的入口文件

具体模块的定义 在路径 modules 中


2.将模块定义在文件夹中
模块应具有入口文件 index.js

3.暴露方式
将 函数作为模块暴露
module.exports = fun

基本模板
```

可能有用的数据
{
  anonymous: null,       
  font: 0,
  group_id: 302391473,   
  message: '你好',       
  message_id: -943068795,
  message_seq: 158,      
  message_type: 'group',
  post_type: 'message',
  raw_message: '你好',
  self_id: 3102734141,
  sender: {
    age: 0,
    area: '',  // 成员在群里的昵称
    card: '',
    level: '',
    nickname: '莫失',
    role: 'owner',
    sex: 'unknown',
    title: '',
    user_id: 2014559177
  },
  sub_type: 'normal',
  time: 1643197366,
  user_id: 2014559177
}