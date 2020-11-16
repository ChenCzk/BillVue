
<template id="IndexTemplate" >
  <div class="Mycontainer" style="overflow: hidden">
    <el-container class="heightAll" >
      <el-aside>
        <div>
          <div>
            <el-row class="tac">
              <el-col style="height: 100%;">
                <el-menu
                  router
                  default-active="$route.path"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                  <el-submenu index="/index">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>我要记账</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="/index/MakeBill/陈泽楷">陈泽楷</el-menu-item>
                      <el-menu-item index="/index/MakeBill/卢敏炫">卢敏炫</el-menu-item>
                      <el-menu-item index="/index/MakeBill/共同">共同的</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                  <el-menu-item index="/index/BillRecord">
                    <i class="el-icon-menu"></i>
                    <span slot="title">账单明细</span>
                  </el-menu-item>
                  <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                  </el-menu-item>
                  <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                  </el-menu-item>
                </el-menu>
              </el-col>
            </el-row>
          </div>
        </div>

      </el-aside>
      <el-container>
        <el-main>
          <div>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  export default {
    name: 'Index',
    template:"#IndexTemplate",
    data () {
      return {
        path: '1',
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      showWarnToast:function(msg){
        this.$notify({
          title: '警告',
          message: msg,
          type: 'warning'
        });
      },
      showSuccessToast:function(msg){
        this.$notify({
          title: '成功',
          message: msg,
          type: 'success'
        });
      },
      showErrorToast:function(msg){
        this.$notify.error({
          title: '错误',
          message: msg
        });
      },
    },
  }
</script>

<style scoped>

  .el-border{
    border-radius: 0px;
  }
  .el-input-style{
    width: 210px;
    float:left;
  }

  .el-aside {
    background-color: #545c64;
    color: #167329;
    text-align: center;
  }

  .el-main {
    background-color: rgba(252, 90, 97, 0);
    color: #333;
    line-height: 160px;
    overflow-x: hidden;
  }

  .heightAll{
    height: 100%;
  }

  #app,html,body,.el-container{
    padding: 0px;
    margin: 0px;
    height: 100%;

  }
  .Mycontainer {
    position: absolute;
    height: 100%;
    width: 100%;
  }

</style>

