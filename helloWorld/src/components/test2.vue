<template>
  <div>
    <div>
      {{msg}}
    </div>
    <p>{{hello}}</p>
    <p>{{hellotests}}</p>
    <button @click="btns">按钮</button>
  </div>


</template>
<script>
  export default{
    data(){
      return{
        // 子组件中声明的变量
        msg:'',
        hello:'',
        hellotests:''
      }
    },
    created(){

    },
    watch:{
      // 监听从父组件传过来的数据是否发生改变，然后赋值给变量
      CCCount() {
        this.msg = this.msgTest
        this.hello = this.helloTest
      }
    },
    methods:{
      // 点击按钮，子组件操做父组件中的函数
      btns(){
        alert("vtjn")
        this.$emit('childsClick', '子组件触发父组件中的函数')
      },
      //　被父组件调用的子组件函数
      msgs1(){
        alert("zi")
        this.hellotests = '哈哈，我是父组件调用子组件的函数'
      },

    },
    // 接收从父组件传过来的数据
    props:['msgTest', 'helloTest', 'CCCount']
  }
</script>
