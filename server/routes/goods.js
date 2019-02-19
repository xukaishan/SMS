/**
 * 这是商品管理路由模块
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

router.post('/addgoods',(req,res)=>{
  console.log(req.body);
  res.send('123')
})



module.exports = router;












