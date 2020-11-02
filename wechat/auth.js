/**
 * 服务器有效性验证模块
 */
const config = require('../config')
const sha1 = require('sha1')
module.exports = () => {
    return (req, res, next) => {
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
    
         // 将3个参数按字典顺序排列, 然后再连成字符串, 与signature进行比较
        let arr = [timestamp, nonce, token ]
        arr.sort()
        console.log(arr, 'arr');
        let str = arr.join('')
        let shaStr = sha1(str)
        console.log(shaStr, 'shaStr');
        if(shaStr === signature) {
            console.log('通过了')
            res.send(echostr)
        } else {
            console.log('gg')
            res.send('error')
        }


        /**
         * 微信服务器会发送两种类型的消息给开发者服务器
         * 1. get请求
         *  - 验证服务器的有效性
         * 2. post请求
         *  - 微信服务器会将用户发送的数据以post请求的方法转发到开发者的服务器上
         */
        if(req.method === 'GET') {

        } else if(req.method === 'POST') {
            
        }
    
    }
}