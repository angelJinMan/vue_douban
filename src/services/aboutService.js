import {browserHistory} from 'react-router'
import config from '../js/config.js'

export default {
    // 获取电影列表
    sendFeedBack(message){
        console.log('调用了getMovieListData方法')
        console.log(message)

        return new Promise(function (resolve, reject) {
            const url = `${config.HTTP}${config.SERVER_PATH}:${config.PORT}/sendFeedBack`
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `message=${message}`
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
                    }
                })
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })

    }
}