<template>

  <div class="Mycontainer">


    <el-container class="heightAll">
      <el-main class="main_class">
        <div >
          <el-table
            v-if="showBillRecordTable"
            ref="filterTable"
            :data="billTableData"
            class="elTable_class"
            style="width:1000px"
          >
            <el-table-column
              type="selection"
              width="55"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              sortable
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="person"
              label="姓名"
              width="120"
              column-key="person"
              :filters="[{text: '陈泽楷', value: '陈泽楷'}, {text: '卢敏炫', value: '卢敏炫'}, {text: '共同', value: '共同'}]"
              :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column
              prop="project"
              label="项目"
              width="120">
            </el-table-column>
            <el-table-column
              prop="money"
              label="金额"
              sortable
              width="120">
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注"
              width="120">
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型"
              width="120"
              :filters="[{ text: '支出', value: '支出' }, { text: '收入', value: '收入' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.type === '支出' ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.type}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column  width="200" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-popconfirm
                  title="这是一段内容确定删除吗？"
                  @onConfirm='handleDelete(scope.$index, scope.row)'
                >
                  <el-button
                    slot="reference"
                    size="mini"
                    type="danger"

                  >删除
                  </el-button>
                </el-popconfirm>


              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-footer>
        <!--分页栏-->
        <PageComponent @Action="getRecordByPage" ref="page"></PageComponent>
      </el-footer>
    </el-container>

    <!--对话框-->
    <BillForm
      ref="bill"
      v-show="dialogTableVisible"
      :visible.sync = "dialogTableVisible"
      v-on:refreshRecords = "refreshRecords">
    </BillForm>
  </div>
</template>

<script>
  import BillForm from './BillForm.vue'
  import PageComponent from './PageComponent.vue'
  export default {
    components:{
      BillForm,PageComponent
    },
    name: "BillRecord",
    data() {
      return {
        dialogTableVisible:false,
        showBillRecordTable: true,
        formLabelWidth:"300px",
        billTableData: [],
      }
    },
    created:function () {
      var _this = this;
     /* this.$axios.get("/getAllRecord").then(function (value) {
        if (value.data.success != null && value.data.success == true) {
          _this.billTableData = value.data.data;
          console.log(_this.billTableData);
        } else {

        }
      }).catch(function (err) {
      });*/
    },
    activated: function () {
      this.refreshRecords();
    },
    methods: {
      getRecordByPage: function (data) {
        console.log("asd");
        this.billTableData = data;
      },
      // 记账面板--批量删除
      deleteRecordsByIDs: function () {
        var _this = this;
        var ids = this.$refs.filterTable.selection.map(x => {
          return x.id
        });
        this.$axios.get("delRecordByIDs?ids=" + ids).then(function (value) {
          if (value.data.success != null && value.data.success == true) {
            _this.refreshRecords();
          } else {

          }
        }).catch(function (err) {
        });
      },
      // 记账面板--删除按钮
      handleDelete(value, row) {
        var _this = this;
        var ids = [];
        ids.push(row.id);
        _this.$axios.get("delRecordByIDs?ids=" + ids).then(function (value) {
          if (value.data.success != null && value.data.success == true) {
            _this.refreshRecords();
            vue_base.showSuccessToast("删除成功")
          } else {
            vue_base.showErrorToast("删除失败")

          }
        }).catch(function (err) {
        });
      },
      // 记账面板--编辑按钮
      handleEdit(value, row) {
        this.dialogTableVisible =true;
        var form ={};
          form.id = row.id;
          form.person = row.person;
          form.type = row.type;
          form.project = row.project;
          form.date = row.date;
          form.money = row.money;
          form.note = row.note;
        // 触发子组件中的函数
        this.$refs.bill.initvalues(form,false);
      },
      // 记账面板筛选器
      filterTag: function (value, row) {
        return row.type === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      // 刷新记账面板
      refreshRecords() {
        /*var _this = this;
        _this.showBillRecordTable = false;
        _this.$axios.get("/getAllRecord").then(function (value) {
          if (value.data.success != null && value.data.success == true) {
            _this.billTableData = value.data.data;
          } else {

          }
        }).catch(function (err) {
        });
        _this.$nextTick(() => {
          _this.showBillRecordTable = true
        })*/
        this.$refs.page.refresh();
      },
    }

  }
</script>

<style scoped>
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow: scroll !important;
    height: 29rem !important;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-row  :last-child {
    margin-bottom: 0;
  }

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-border{
      border-radius: 30px;
    }
  .el-input-style{
    width: 210px;
    float:left;
  }
  .el-header, .el-footer {
    background-color: rgba(252, 90, 97, 0);
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #409EFF;
    color: #167329;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: rgba(252, 90, 97, 0);
    color: #333;
    line-height: 160px;
    overflow: hidden;
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
    height: 100%;
    width: 100%;
  }


  .elTable_class{
    overflow-x: hidden;
  }

  .table-wrapper /deep/  .el-table, .el-table__expanded-cell {
    background-color: transparent;
  }

  .table-wrapper /deep/ .el-table tr {
    background-color: transparent!important;
  }
  .table-wrapper /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
    background-color: transparent;
  }

</style>
