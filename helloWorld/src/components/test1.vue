<template>
  <div>
    <div>
      test
    </div>
    <p>hello world</p>
    <span>{{btnVal}}</span>
    <button @click="btnp">parent</button>
    <button @click="test">parent2</button>
    <msgChild
      ref="msgRef"
      @childsClick="btnClick"
      :msgTest='msgTest2'
      :helloTest='helloTest2'
      :CCCount='CCCount'
    >
    </msgChild>
  </div>

</template>
<script>
  // 引入子组件　
  import msgChild from './test2.vue'
  export default{
    data(){
      return{
        msgTest2:'',
        helloTest2:'',
        CCCount:0,
        btnVal:''
      }
    },
    components:{
      // 声明子组件名字
      msgChild
    },
    created(){
      this.CCCount++;
      this.msgs()
    },
    methods:{
      msgs(){
        // 给子组件变量赋值
        this.msgTest2 = '测试1'
        this.helloTest2 = '测试2'
      },
      btnClick(val) {
        alert('fu')
        this.CCCount++
        this.btnVal = val
        // 触发子组件中的函数
        this.$refs.msgRef.msgs1()
      },
      btnp(){
        this.CCCount++
      },
      test(){
        console.log(this.$refs);
        this.$refs.msgRef.msgs1()
      }
    }
  }
</script>
