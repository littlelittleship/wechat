const express = require('express');
// const sha1 = require('sha1')
// const config = require('./config');
const auth = require('./wechat/auth.js')

const app = express()

app.use(auth())

// app.use(auth())

// const config = {
//     appID: 'wxb11c51bad2e60a65',
//     appsecret: '27c31814a314f7a62c62600a6716f72d',
//     token: 'littlelittle120ship'
// }
// 通过ngrok内网穿透, 获取网址

// app.use((req, res, next) => {
//     // 微信服务器提交的数据
//     /*
//     { 
//     signature: '2446d5870f9a65e41a4d99a7b14c21ed48b1ddfc',  // 微信加密签名
//     echostr: '6675293312379317214',         // 随机字符串
//     timestamp: '1600168590',                // 时间戳
//     nonce: '1052907086'                     // 随机数字
//                                             // 需要通过(nonce, timestap, token)3个参数, 经过排序加密, 与加密签名比较, 一致的话ok
//      }
//         */
//     console.log(req.query)

//     const {signature, echostr, timestamp, nonce } = req.query
//     const { token } = config

//      // 将3个参数按字典顺序排列, 然后再连成字符串, 与signature进行比较
//     let arr = [timestamp, nonce, token ]
//     arr.sort()
//     console.log(arr, 'arr');
//     let str = arr.join('')
//     let shaStr = sha1(str)
//     console.log(shaStr, 'shaStr');
//     if(shaStr === signature) {
//         console.log('通过了')
//         res.send(echostr)
//     } else {
//         console.log('gg')
//         res.send('error')
//     }

// })

// const config = {
//     token: 'littlelittle120ship',
//     appID: 'wxb11c51bad2e60a65',
//     appsecret: '27c31814a314f7a62c62600a6716f72d'
// }

// app.use((req,res, next) => {
//     // 接口配置之后的参数
//     //     { signature: '6091bf5bbc73d7a38893a312bdb437c3f77fecf6',
//     //      echostr: '2013367841178247039',
//     //      timestamp: '1604208991',
//     //      nonce: '137145145' }
//     console.log(req.query);
//     // 1. 将参与微信加密的三个参数(timestamp, nonce, token) 按照字典排序并组合在一起形成一个数组
//     // 2. 将数组里面的所有参数拼接成一个字符串, 并进行sha1加密
//     // 3. 加密完成就生成了一个signature, 和微信发送过来的进行对比
//     //    如果一样, 说明消息来自微信服务器, 返回echostr给微信服务器
//     //    如果不一样, 说明不是微信服务器发送的消息, 返回error

//     const {signature, echostr,timestamp, nonce } = req.query
//     const {token} = config

//     const arr = [timestamp, nonce, token]
//     arr.sort()
//     console.log('sort arr' , arr)
//     const str = arr.join('')
//     const sha1Str = sha1(str)
//     console.log('sha', sha1Str)

//     if(sha1Str === signature) {
//         res.send(echostr)
//     } else {
//         res.end('error')
//     }


// })

app.listen(3000, () => console.log('server is running at 127.0.0.1:3000'))