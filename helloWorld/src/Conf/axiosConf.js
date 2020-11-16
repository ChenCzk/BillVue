import axios from 'axios';


// 创建axios实例
var instance = axios.create({timeout: 1000 * 12});
instance.interceptors.request.use(
  config => {
    console.log('发送请求')
    // 在发送请求之前做些什么
    let pathname = location.hash;
    if(localStorage.getItem('Authorization')){
      if(pathname != '/' &&  pathname != '/login'){
        config.headers.common['token'] = localStorage.getItem('Authorization');
      }
    }

    return config

  },

  error => {
    console.log('请求失败！！')
    console.log(error)
    return Promise.reject(error)

  })

//异步请求后，判断token是否过期
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          this.$router.push('/');
      }
    }
  }
)
export default instance;
