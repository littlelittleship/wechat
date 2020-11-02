/**
 * 获取access_token: 微信接口调用的唯一凭证
 * 
 * 特点: 
 * 1. 唯一的
 * 2. 有效期2小时, 提前5分钟请求
 * 3. 接口权限: 每天 2000 次
 * 
 * 请求的地址
 *  GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
 * 
 * 设计思路
 * 1. 首次本地没有, 发送请求获取access_token, 保存起来, (保存为: 本地文件)
 * 2. 第二次或以后
 *  先去本地读取文件, 判断它是否过期
 *      过期了:重新请求, 获取access_token, 保存下来,覆盖之前的文件
 *      没有过期: 直接使用
 * 
 * 整理思路
 * 读取本地文件(readAccessToken)
 *      有文件
 *          判断是否过期(isValidAccessToken)
 *              过期了: 重新请求access_token(getAccessToken), 保存下来覆盖之前的文件(saveAccessToken), (保证文件是唯一的)
 *              没有过期, 直接使用
 *      没有文件
 *          发送发送请求,获取access_token(getAccessToken), 保存下来(saveAccessToken), (本地文件), 直接使用
 */

const rp = require('request-promise-native')
const {writeFile, readFile} = require('fs')     // 两个都是异步方法

//  const config = require('../config')
//  const {appID, appsecret} = config
 const {appID, appsecret} = require('../config')
const { resolve } = require('path')

 class Wechat {
    constructor() {

    }

    /**
     * 用来获取access_token
     */
    getAccessToken() {
        // 定义请求的地址
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`
        // 发送请求
        /** 
         * request
         * request-promise-native, 依赖上面的request库, 使用这个,   使用原生nodejs包装的promise对象
         */

        return new Promise((resolve, reject) => {
            rp({
                method: 'GET',
                url,
                json: 'true',
            }).then(res => {
                console.log(res)
                res.expires_in = Date.now() + (res.expires_in - 5 * 60) * 1000
                resolve(res)
            }).catch(err => {
                console.log(err)
                reject('获取access_token时出现问题', err)
            })
        })

    }

    /** 
     * 用来保存access_token
     * @param accessToken 要保存的凭据
    */
    saveAccessToken(accessToken) {
        // 将对象转化成json字符串
        accessToken = JSON.stringify(accessToken)
        return new Promise((resolve, reject) => {
            // writeFile是异步方法, 为了保证保存成功, 需要外面包装一层promise
            writeFile('./accessToken.txt', accessToken, err => {
                if(!err) {
                    console.log('文件保存成功');
                    resolve();
                } else {
                    reject('保存文件时出问题了', err)
                }
            })
        })
    }

    /**
     * 用来读取accessToken
     */
    readAccessToken() {
        return new Promise((resolve, reject) => {
            readFile('./accexxToken.txt', (err, data) => {
                if(!err) {
                    // json字符串转化成js对象
                    data = JSON.parse(data)
                    console.log('读取文件成功');
                    resolve(data)
                } else {
                    reject('readAccessToken方法除了问题', err)
                }
            })
        })
    }

    /** 
     * 用来判断accessToken是否有效
     * @params  data
     */
    isValidAccessToken(data) {
        // 检测传入的数据是否有效
        if(!data && !data.accessToken && !data.expires_in) {
            // 表示无效
            return false
        }

        // 检测accessToken是否在有效期
        return data.expires_in > DataCue.now()
    }

    /**
     * 用来获取没有过期的access_token
     * @return {Promise<any>} access_token
     */
    fetchAccessToken() {
        if(this.access_token && this.expires_in && this.isValidAccessToken(this)) {
            return Promise.resolve({
                access_token: this.access_token,
                expires_in: this.expires_in
            })
        }
        return this.readAccessToken()
            .then(async res => {
                if(this.isValidAccessToken(res)) {
                    // resolve(res)
                    console.log(1);
                    return Promise.resolve(res)
                } else {
                    const res = await this.getAccessToken()
                    await this.saveAccessToken(res)
                    console.log(2);
                    return Promise.resolve(res)
                    // this.getAccessToken()
                    // .then((res1) => {
                    //     this.saveAccessToken(res)
                    //         .then(() => {
                    //             resolve(res1)
                    //         })
                    // })
                }
            })
            .catch(async err => {
                console.log(3);
                const res = await this.getAccessToken()
                console.log(res);
                await this.saveAccessToken(res)
                return Promise.resolve(res)
                // this.getAccessToken()
                //     .then((res) => {
                //         this.saveAccessToken(res)
                //             .then(() => {
                //                 resolve(res)
                //             })
                //     })
            })
            .then(res => {
                console.log(4, res);
                this.access_token = res.access_token
                this.expires_in = res.expires_in
                return Promise.resolve(res)
            })
    }
 }

//  模拟测试
 const w = new Wechat()
 w.fetchAccessToken()

// new Promise((resolve, reject) => {
//     w.readAccessToken()
//         .then(res => {
//             if(w.isValidAccessToken(res)) {
//                 resolve(res)
//             } else {
//                 w.getAccessToken()
//                 .then((res1) => {
//                     w.saveAccessToken(res)
//                         .then(() => {
//                             resolve(res1)
//                         })
//                 })
//             }
            
//         })
//         .catch(err => {
//             w.getAccessToken()
//                 .then((res) => {
//                     w.saveAccessToken(res)
//                         .then(() => {
//                             resolve(res)
//                         })
//                 })
//         })
// }).then(res => {
//     console.log(res);
// })