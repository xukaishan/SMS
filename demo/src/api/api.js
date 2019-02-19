//引入axios 和qs
import axios from 'axios';
import qs from 'qs';
axios.defaults.baseURL('');
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






