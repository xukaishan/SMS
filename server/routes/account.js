/**
 * 这是账号管理路由模块
 */
const express = require('express');
const router = express.Router();

// 引入连接数据库模块
const connection = require('./connect')

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  res.header('Access-Control-Allow-Origin', '*');
  next();
})





/* 
  添加账号的路由
*/
router.post('/addaccount', (req, res) => {
  // 接收前端发送的添加账号的数据
  let { username, password, usergroup } = req.body;
  // console.log('接收到前端发送过来的数据：', username, password, usergroup)
  // 把数据存入数据库
  // 构造增加账号的sql语句
  const sqlStr = `insert into accountdata(username, password, usergroup) values('${username}', '${password}', '${usergroup}')`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 判断受影响的行数
    if (data.affectedRows > 0) {
      // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
      res.send({ "error_code": 0, "reason": "插入数据成功" });
    } else {
      // 失败：返回给前端失败的数据对象
      res.send({ "error_code": 1, "reason": "插入数据失败" });
    }
  })
})



/*
密码修改
*/
router.post('/pwdmodify', (req, res) => {
  let { username, oldpass, pass } = req.body;
  if (!pass && username && oldpass) {//失焦验证旧密码
    //构造sql语句
    const sqlStr = `select * from accountdata where username='${username}' and password='${oldpass}'`;
    console.log(sqlStr)
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      console.log('我是失焦',data.affectedRows);
      if (data.length) {
        res.send({ "error_code": 0})
      } else {
        res.send({ "error_code": 1})
      }
    })
  } else if (pass && username && oldpass) {//提交修改密码
    //构造sql语句
    const sqlStr = `update accountdata set password='${pass}' where username='${username}' and password='${oldpass}'`;
    console.log(sqlStr)
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      // console.log('我是提交验证',data);

      if (data&&data.affectedRows >= 0) {
        res.send({ "error_code": 0, "reason": "修改密码成功" })
      } else {
        res.send({ "error_code": 1, "reason": "修改密码失败" })
      }
    })
  }

})





/*
保存账号编辑
*/
router.post('/saveedit', (req, res) => {
  let { id, username, usergroup } = req.body;
  if (!id || !username || !usergroup) {
    res.send({ "error_code": 1, "reason": "修改数据失败" });
    return
  }
  //构造sql语句
  const sqlStr = `update accountdata set username='${username}',usergroup='${usergroup}' where id=${id}`
  console.log(sqlStr)
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "修改数据成功" })
    } else {
      res.send({ "error_code": 1, "reason": "修改数据失败" })
    }
  })
})




/*
删除账号
*/
router.get('/delaccount', (req, res) => {
  let { id } = req.query;
  if (!id) return;
  const sqlStr = `delete from accountdata where id=${id}`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "删除数据成功" })
    } else {
      res.send({ "error_code": 1, "reason": "删除数据失败" })
    }
  })
})




/*
批量删除账号
*/
router.post('/batchdelaccount', (req, res) => {
  //将前端获取到的字符串数组转为真数组
  let delIdArr = req.body.delIdStr.slice(1, -1).split(',');
  if (!delIdArr.length) return;
  const sqlStr = `delete from accountdata where id in (${delIdArr})`;
  // console.log(sqlStr);
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows === delIdArr.length) {
      res.send({ "error_code": 0, "reason": "批量删除数据成功" })
    } else {
      res.send({ "error_code": 1, "reason": "批量删除数据失败" })
    }
  })
})





/*
分页功能
*/
router.get('/AccountListByPage', (req, res) => {
  let { pageSize, currentPage, search } = req.query;
  let sqlStr = '';
  //判断是否有搜索，有就根据搜索返回数据
  if (search) {
    console.log('有搜索', search);
    sqlStr = `select id,username,usergroup,ctime from accountdata where concat(username,usergroup,ctime) like '%${search}%' order by ctime desc`;
    console.log('搜索wei', sqlStr);
  } else {//没有搜索就正常分页返回数据
    sqlStr = 'select id,username,usergroup,ctime from accountdata order by ctime desc';
  };
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    let total = data.length;
    let n = (currentPage - 1) * pageSize;
    sqlStr += ` limit ${n},${pageSize}`;
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      const AccountListByPage = { total, data };
      // 把查询到的数据响应给前端
      res.send(AccountListByPage);
    })
  })
})












module.exports = router;
