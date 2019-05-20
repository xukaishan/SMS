
//=======================封装一个axios对象=====================================
//引入axios 和qs
import axios from 'axios';
import qs from 'qs';
// 设置默认请求服务器根目录
axios.defaults.baseURL = 'http://127.0.0.1:666';

// 写一个axios的请求拦截器 （在axios请求发送之前 搞点事情）
axios.interceptors.request.use(config=>{
    const token= window.localStorage.getItem('accountinfotoken');
    // 在请求头中携带token
    config.headers.authorization = `Bearer ${token}`;
    return config;
})
//暴露封装的axios方法
export default {
    get(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.get(url,{params})
            .then(res=>{
                if(res.data){
                    resolve(res.data)
                }
            })
            .catch(err=>{
                reject(err)
            })
        })
    },
    post(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.post(url,qs.stringify(params))
            .then(res=>{
                if(res.data){
                    resolve(res.data)
                }
            })
            .catch(err=>{
                reject(err)
            })
        })
    },
}

//0000
//45646464646



