import axios from 'axios';
import { getToken } from '@/utils/token';

const api = axios.create({
  baseURL: 'http://124.223.6.87:10004',
  timeout: 10000
})  


//请求拦截器
api.interceptors.request.use(
  config => {
    //如果发的请求不是登录请求，就在请求头上加上token
    if (config.url !== '/api/llogin' && config.url !== '/api/lreguser') {
      
      config.headers.Authorization = getToken();
      console.log(config.headers.Authorization);
    }
    //输出请求的query参数
    console.log("请求的query参数",config.params);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//返回状态判断(添加响应拦截器)
api.interceptors.response.use(
  res => {
    //对响应数据做些事
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;