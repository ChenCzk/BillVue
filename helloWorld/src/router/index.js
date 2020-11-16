import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import MakeBill from '@/components/MakeBill'
import test1 from '@/components/test1'
import test2 from '@/components/test2'
import BillRecord from '@/components/BillRecord'
import EditBill from '@/components/EditBill'
import Login from '@/components/Login'
import t1 from '@/components/test/t1.vue'
import store from '../store/index.js'

Vue.use(Router);
const router = new  Router({
  routes: [
      {
          path: '/index',
          component: Index,
          children:[
            {path:'MakeBill/:who',component:MakeBill,props:true},
            {path:'BillRecord',component:BillRecord,props:true},
            {path:'EditBill',component:EditBill},
          ]
      },
      {
          path:'/test1',
          component: test1,
          children:[
            {path:'test2',component:test2}
          ]
      },
      {
        path:'/editBill',
        component: EditBill,
      },
      {
        path:'/t1',
        component: t1,
      },
      {
        path:'/',
        component: Login,
      },
      {
        path:'/login',
        component: Login,
      }

    ]
});


// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    console.log(to.path);
    console.log("2");
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    console.log("1");
    console.log(token);
    console.log(store.state.Authorization);

    if (token === null || token === '') {
      next('/login');
    }
    if (token === store.state.Authorization){ // 判断当前Authorization 与 store中是否一致
      next();
    }else {
      next('/login');
    }

  }
});
export default router;
