/**
 * 服务器有效性验证模块
 */
const config = require('../config')
const sha1 = require('sha1')
const {getUserDataAsync, parseXmlAsync, formatMessage} = require('../utils/tool')
const template = require('./template')
const reply = require('./reply')
module.exports = () => {
    return async (req, res, next) => {
        // 微信服务器提交的数据
        /*
        { 
        signature: '2446d5870f9a65e41a4d99a7b14c21ed48b1ddfc',  // 微信加密签名
        echostr: '6675293312379317214',         // 随机字符串
        timestamp: '1600168590',                // 时间戳
        nonce: '1052907086'                     // 随机数字
                                                // 需要通过(nonce, timestap, token)3个参数, 经过排序加密, 与加密签名比较, 一致的话ok
         }
            */
        console.log(req.query)
    
        const {signature, echostr, timestamp, nonce } = req.query
        const { token } = config
        const sha1Str = sha1([timestamp, nonce, token].sort().join(''))
        // if(sha1Str === signature) {
        //     res.send(echostr)
        // } else {
        //     res.end('error')
        // }

        /**
         * 微信服务器会发送两种类型的消息给开发者服务器
         * 1. get请求
         *  - 验证服务器的有效性
         * 2. post请求
         *  - 微信服务器会将用户发送的数据以post请求的方法转发到开发者的服务器上
         */
        if(req.method === 'GET') {
            // 如果一样, 说明消息来自微信服务器, 返回echostr给微信服务器
            if(sha1Str === signature) {
                res.send(echostr)
            } else {
                res.end('error')
            }
        } else if(req.method === 'POST') {
            // 微信服务器会将用户发送的数据以post请求的方法转发到开发者的服务器上
            // 验证消息来自微信服务器
            if(sha1Str !== signature) {
                res.end('error')
            }
            console.log(req.query);
            // 如果开发者服务器没有返回响应给微信服务器, 微信服务器会发三次请求过来
            const xmlData = await getUserDataAsync(req)
            console.log('xmlData', xmlData);
            // <xml>
            //     <ToUserName><![CDATA[gh_5ddd24014701]]></ToUserName>     //开发者的id
            //     <FromUserName><![CDATA[oCn2N6o8vVN_5AtWiJtltM5VViz0]]></FromUserName>    // 用户的open_id
            //     <CreateTime>1604306393</CreateTime>  // 发送的时间戳
            //     <MsgType><![CDATA[text]]></MsgType>  // 发送消息的类型
            //     <Content><![CDATA[123456]]></Content>    // 发送的内容
            //     <MsgId>22968142988163643</MsgId>     // 消息id, 微信服务器会默认保存3天用户发送的数据, 通过此id, 三天就能找到消息数据
            // </xml>
            // 将xml数据解析成js对象
            const jsData = await parseXmlAsync(xmlData)
            console.log('jsData:', jsData);
            // { xml:
            //     { ToUserName: [ 'gh_5ddd24014701' ],
            //       FromUserName: [ 'oCn2N6o8vVN_5AtWiJtltM5VViz0' ],
            //       CreateTime: [ '1604307220' ],
            //       MsgType: [ 'text' ],
            //       Content: [ '147' ],
            //       MsgId: [ '22968154426758942' ] } }

            // 格式化上面的数据, 同步的方法
            const message = formatMessage(jsData)
            console.log('message:', message);
            const options = reply(message)
            console.log('---auth', options)
            let replyMessage = template(options)
            console.log('replyMessage: ', replyMessage)

            res.send(replyMessage)
        } else {
            res.end('error')
        }
    
    }
}