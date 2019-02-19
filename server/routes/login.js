const express = require('express');
const router = express.Router();
const connection = require('./connect')
// //引入token
const jwt = require('jsonwebtoken')
// //生成token对象
const pwd = 'accountinfopwd'//这是秘钥

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
    // 设置响应头 解决跨域(目前最主流的方式)
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

/* GET users listing. */
// router.get('/', function (req, res, next) {
//     res.send('respond with a resource');
// });

/*
验证登录
*/

router.post('/accountlogin', (req, res) => {
    let { username, password } = req.body;
    const sqlStr = `select * from accountdata where username='${username}' and password='${password}'`;
    console.log(sqlStr)
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 判断数据库是否存在
        if (data.length) {
            //将data转为纯净的对象
            let accountlogininfostr= JSON.stringify(data[0]);
            let accountlogininfo= JSON.parse(accountlogininfostr);
            // 若账号信息匹配成功 那么就给前端返回成功的数据对象，此时登录成功发token
            const token= jwt.sign(accountlogininfo,pwd,{expiresIn: 60*60})//expiresIn: 60*60一个小时过期
            res.send({ "error_code": 0, "reason": "登录成功" ,token,'username':accountlogininfo.username});
        } else {
            // 失败：返回给前端失败的数据对象
            res.send({ "error_code": 1, "reason": "登录失败，请检查用户名或密码" });
        }
    })

})











module.exports = router;
