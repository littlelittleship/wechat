/**
 * 工具函数包
 * 将xml数据转换成js对象用到的库 xml2js
 */

 const {parseString} = require('xml2js')

 module.exports = {
    getUserDataAsync(req) {
        return new Promise((resolve, reject) => {
            let xmlData = ''
            req.on('data', data => {
                // 读取的数据是buffer, 需要拼接成字符串
                xmlData += data.toString()
            })
            .on('end', () => {
                // 接受数据完毕, 触发
                resolve(xmlData)
            })
        })
    },

    parseXmlAsync(xmlData) {
        return new Promise((resolve, reject) => {
            parseString(xmlData, {trim: true}, (err, data) => {
                if(!err) {
                    resolve(data)
                } else {
                    reject('parseXMLAsync出了问题:', err)
                }
            })
        })
    },

    formatMessage(jsData) {
        let message = {}
        jsData = jsData.xml
        console.log('type' ,typeof jsData);
        if(typeof jsData === 'object') {
            for(let key in jsData) {
                let value = jsData[key]
                if(Array.isArray(value) && value.length > 0) {
                    message[key] = value[0]
                }
            }
        } else {
            message = {} 
        }
        return message
    }
 }