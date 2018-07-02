
import {
    NativeModules,
} from "react-native"
const {RNUpdateApp} = NativeModules
const RNFS = require("react-native-fs")

let jobId = 0

export const androidUpdate = (url,fileName = 'comboapk') => {
    let _this = this
    // const {url, fileName} = this.fetchRes
    // 按照目录/包名/文件名 存放
    const toFile = `${RNFS.DocumentDirectoryPath}/${fileName}`

    RNFS.downloadFile({
        fromUrl: url,
        toFile,
        progressDivider: 2,   // 节流
        begin(res) {
            jobId = res.jobId   // 设置jobId，用于暂停和恢复下载任务
        },
        progress(res) {
            let progress = (res.bytesWritten / res.contentLength).toFixed(2, 10)
            // 此处 this 指向有问题，需要使用 _this
            // _this.setState({
            //     progress
            // })
        }
    }).promise.then(response => {
        // 下载完成后
        this.hideModal()
        if (response.statusCode === 200) {
            console.log("FILES UPLOADED!") // response.statusCode, response.headers, response.body
            RNUpdateApp.install(toFile)
        } else {
            console.log("SERVER ERROR")
            // 提示安装失败，关闭升级窗口
            // this.errorTips()
        }
    })
        .catch(err => {
            if (err.description === "cancelled") {
                // this.errorTips()
            }
            // this.hideModal()
        })
}