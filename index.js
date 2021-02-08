/*
 * @Author: 李剑颖
 * @Date: 2021-02-07 10:04:03
 * @LastEditTime: 2021-02-08 14:36:06
 * @LastEditors: Please set LastEditors
 * @Description: 连接 mongodb 数据库
 * @FilePath: \node\index.js
 */

// 引入mongodb模块，获得客户端对象
var MongoClient  = require('mongodb').MongoClient

// 数据库地址
var url = 'mongodb://localhost:27017'

// 操作的数据库
var DBName = 'student'

// 引入 express 模块
const express = require('express')
const bodyParser = require('body-parser')

// 实例化 express
const app = express()
// 解析 body数据
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 定义端口号
const port = '3020'

// =============================== 数据库操作-开始 ===============================
// 新增班级信息
var insertData = function (data, callback) {
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if (err) {
            console.log('Error:' + err)
            return
        }
        console.log('连接数据库成功')
        // 连接数据库
        let db = client.db(DBName)
        // 往数据库中存入数据(), 存入多条数据 insertOne
        db.collection('clbum').insertOne(data, function(err, result) {
            if(err) {
                console.log('Error:' + err)
                return
            } 
            // 关闭数据连接
            client.close()
            // 返回值
            callback(result)
        })
    })
}

// 查询班级信息列表
var findData = function (data, callback) {
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if (err) {
            console.log('Error:' + err)
            return
        }
        console.log('连接数据库成功')
        // 连接数据库
        // 查询条件
        // var whereStr = {'className': 'G-305'};
        let db = client.db(DBName)
        db.collection('clbum').find(data).toArray(function (err, result) {
            if (err) throw err
            // 关闭数据连接
            client.close()
            // 返回值
            callback(result)
        })
    })
}

// 更新班级信息
var updateData = function (data, callback) {
    console.log(data)
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if (err) {
            console.log('Error:' + err)
            return
        }
        console.log('连接数据库成功')
        // 连接数据库
        // 查询条件
        var whereStr = data.whereStr
        // 被修改的信息
        var updateStr = {$set: data.updateStr}
        let db = client.db(DBName)
        // 更新多条数据 updateMany
        db.collection('clbum').updateOne(whereStr, updateStr, function (err, result) {
            if (err) throw err
            // 关闭数据连接
            client.close()
            // 返回值
            callback(result)
        })
    })
}

var deleteData = function (data, callback) {
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if (err) {
            console.log('Error:' + err)
            return
        }
        console.log('连接数据库成功')
        // 连接数据库
        // 查询条件
        // var whereStr = {'className': 'G-305'}
        let db = client.db(DBName)
        // 删除多条数据 deleteMany
        db.collection('clbum').deleteOne(data, function (err, result) {
            if (err) throw err
            // 关闭数据连接
            client.close()
            // 返回值
            callback(result)
        })
    })
}
// =============================== 数据库操作-结束 ===============================

// =============================== 接口服务-开始 ===============================
// 提示服务
app.post('/', (req, res) => {
    res.send(req.body)
})

// 新增班级信息
app.post('/addClbum', (req, res) => {
    insertData(req.body, function(result) {
        res.send(result)
    })
})

// 查询班级信息
app.post('/queryClbum', (req, res) => {
    findData(req.body, function(result) {
        res.send(result)
    })
})

// 修改班级信息
app.post('/updataClbum', (req, res) => {
    updateData(req.body, function (result) {
        res.send(result)
    })
})

// 删除班级信息
app.post('/deleteClbum', (req, res) => {
    deleteData(req.body, function (result) {
        res.send(result)
    })
})
// =============================== 数据库操作-结束 ===============================


app.listen(port, () => {
    console.log(`启动成功, 监听地址为 http://localhost:${port}`)
})