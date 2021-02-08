### 配置环境变量

```shell
将mongodb 的 安装目录的 C:\**\**\**\bin 写入环境变量
```

### 启动服务

控制台 输入 mongodb --dbpath E:\MongoDB\data   这后面的路径便是数据集合的路径 
服务启动成功提示

```shell
mongodb --dbpath E:\MongoDB\data

mongod
```



### 引入数据库

```javascript
// 引入mongodb模块，获得客户端对象
var MongoClient  = require('mongodb').MongoClient

// 数据库地址
var url = 'mongodb://localhost:27017'

// 操作的数据库
var DBName = 'student'

MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
    console.log('连接数据库成功')
    // 连接数据库
    let db = client.db(DBName)
    // 往数据库中存入数据()
    db.collection('clbum').insertOne({
        // 班级名称
        className: 'G-304',
        // 班级人数
        population: 54,
        // 班主任
        coordinator: '易兴',
        // 班级类型
        classType: 'G3'
    })
})
```


### 完整版

```javascript
// 引入 express 模块
const express = require('express')

// 实例化 express
const app = express()

// 解析 body数据
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 定义端口号
const port = '3020'

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
        // 往数据库中存入数据()
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
        let db = client.db(DBName)
        db.collection('clbum').find({}).toArray(function (err, result) {
            if (err) throw err
            // 关闭数据连接
            client.close()
            // 返回值
            callback(result)
        })
    })
} 

// 提示服务
app.get('/', (req, res) => {
    res.send('服务启动成功')
})

// 新增班级信息
app.post('/addClbum', (req, res) => {
    insertData(req.body, function(result) {
        res.send(result)
    })
})

// 查询班级信息
app.get('/queryClbum', (req, res) => {
    findData({}, function(result) {
        res.send(result)
    })
})

app.listen(port, () => {
    console.log(`启动成功, 监听地址为 http://localhost:${port}`)
})
```



```JavaScript
// 设置请求头
app.all('*', function (req, res, next) {    
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', '3.2.1')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

app.use(function(req, res, next){
    if (req.is('text/*')) {
        req.text = ''
        req.setEncoding('utf8')
        req.on('data', function(chunk){ req.text += chunk })
        req.on('end', next)
    } else {
        next()
    }
})
```