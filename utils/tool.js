/**
 * 工具函数包
 * 将xml数据转换成js对象用到的库 xml2js
 */

 const {parseString} = require('xml2js')
 const {writeFile, readFile} = require('fs')
 const {resolve} = require('path')

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
    },

    writeFileAsync(data, fileName) {
        data = JSON.stringify(data)
        const filePath = resolve(__dirname, fileName)
        return new Promise((resolve, reject) => {
            // writeFile是异步方法, 为了保证保存成功, 需要外面包装一层promise
            writeFile(filePath, data, err => {
                if(!err) {
                    console.log('文件保存成功');
                    resolve();
                } else {
                    reject('writeFileAsync时出问题了', err)
                }
            })
        })
    },

    readFileAsync(fileName) {
        const filePath = resolve(__dirname, fileName)
        return new Promise((resolve, reject) => {
            readFile(filePath, (err, data) => {
                if(!err) {
                    // json字符串转化成js对象
                    data = JSON.parse(data)
                    console.log('读取文件成功');
                    resolve(data)
                } else {
                    reject('readFileAsync方法出了问题', err)
                }
            })
        })
    }
 }