<template>
    <el-container>
      <el-aside>
        <div>
          <div style="height: 100%;">
            <el-row class="tac" style="height: 100%;">
              <el-col style="height: 100%;">
                <el-menu
                  router
                  default-active="$route.path"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  style="height: 100%;">
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
        <el-header>Header</el-header>
        <el-main>
          <div>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "t1"
    }
</script>

<style scoped>
    body,html,#app,.el-container{
      margin: 0;
      background: #f2f5fe;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .el-header, .el-footer {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }

    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }

    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }


    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
</style>
