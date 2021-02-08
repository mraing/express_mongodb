/*
 * @Author: 李剑颖
 * @Date: 2021-02-05 17:23:39
 * @LastEditTime: 2021-02-05 17:30:58
 * @LastEditors: Please set LastEditors
 * @Description: apps
 * @FilePath: \node\app.js
 */

const express = require('express')

const app = express()

const port = '3000'

// 请求静态文件
const mockData = require('./static/mockData.json')

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api', (req, res) => {
    res.send(mockData)
})

app.listen(port, () => {
    console.log(`启动成功, 监听地址为 http://localhost:${port}`)
})