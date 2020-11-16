<template>

    <div>
      <el-dialog  :visible.sync="visible"  :before-close="modalClose" :show-close="ShowClose">
        <el-form :model="form" ref="formInline" :label-width="formLabelWidth">
          <el-form-item label="类型">
            <el-select class="el-input-style" style="float:left;" v-model="form.type" placeholder="请选择活动区域"
                       @change="selectType(form.type)">
              <el-option label="支出" value="支出"></el-option>
              <el-option label="收入" value="收入"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="region3">
            <el-input class="el-input-style" v-model="form.person" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="项目" prop="region1">
            <el-select class="el-input-style" style="float:left" v-model="form.project" placeholder="请选择活动区域">
              <el-option v-for="item in projectSelect" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间" prop="region2">
            <el-col class="el-input-style">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date" alue-format="yyyy-MM-dd"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="金额" prop="region3">
            <el-input class="el-input-style" v-model="form.money" autocomplete="off" type="number"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="region4">
            <el-input class="el-input-style" v-model="form.note" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button @click="reset">关 闭</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </el-form-item>

        </el-form>

      </el-dialog>


    </div>
</template>

<script>
  import Base from './Base'

  export default {

        name: "BillForm",
        mixins: [Base],
        data() {
          return{
              form: {
                    id: "",
                    person: "",
                    type: "",
                    project: "",
                    date: "",
                    money: "",
                    note: ""
              },
              isNew:false,
              ShowClose:false,
              formLabelWidth:"400px",
              projectSelect: "",
              projectSelect1: [
                {label: '早餐', value: '早餐'},
                {label: "午餐", value: "午餐"},
                {label: "晚餐", value: "晚餐"},
                {label: "交通", value: "交通"},
                {label: "家用", value: "家用"},
                {label: "零食/饮料", value: "零食/饮料"},
                {label: "水果", value: "水果"},
                {label: "水电费", value: "水电费"}
              ],
              projectSelect2: [
                {label: '撸羊毛', value: '撸羊毛'},
                {label: '红包', value: ' 红包'},
                {label: '工资', value: '工资'},
              ],
          }
        },
        methods:{

          // 检测表单数据
          checkFormDateIsIllegal: function () {
            if (this.form.type == "" || this.form.type == null) {
              this.showWarnToast('请输入类型');
              return false
            }
            if (this.form.person == "" || this.form.person == null) {
              this.showWarnToast('请输入姓名');
              return false
            }
            if (this.form.project == "" || this.form.project == null) {
              this.showWarnToast('请输入项目名称');
              return false
            }
            if (this.form.date == "" || this.form.date == null) {
              this.showWarnToast('请输入日期');
              return false
            }
            if (this.form.money == "" || this.form.money == null) {
              this.showWarnToast('请输入金额');
              return false
            }
            // 处理时间
            var time = this.form.date;//获取当前日期空间时间
            if (time) {
              var date = new Date(Date.parse(time));
              var newDate = date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
              this.form.date = newDate;
            }

            return true;
          },
          reset:function () {
            this.$emit('update:visible', false); // 直接修改父组件的属性
          },
          submit:function () {
            var _this = this;

            if (_this.checkFormDateIsIllegal()) {
              console.log(this.form);
              // 检查this.$axios.get
              _this.$axios.defaults.headers.post['Content-Type'] = 'application/json';
              if (_this.isNEW == true) {
                _this.$axios.post("/addRecord", JSON.stringify(_this.form)
                ).then(function (value) {
                  if (value.data.success != null && value.data.success == true) {
                    _this.showSuccessToast("上传成功");

                  } else {
                    _this.showErrorToast("上传失败");
                  }
                }).catch(function (err) {
                  _this.showErrorToast("上传失败：" + err.message);

                });
              } else {
                  _this.$axios.post("/updateBillRecordById", JSON.stringify(_this.form)
                  ).then(function (value) {
                    if (value.data.success != null && value.data.success == true) {
                      _this.showSuccessToast("更新成功");
                    } else {
                      _this.showErrorToast("更新失败");
                    }
                    // 刷新父组件的记账面板
                    _this.$emit('refreshRecords')
                    //_this.refreshRecords();
                  }).catch(function (err) {
                    _this.showErrorToast("更新失败：" + err.message);
                  });
              }
              _this.modalClose();
            }
          },
          change() {
            this.formLabelWidth="200px";
          },
          modalClose(){
            this.$emit('update:visible', false); // 直接修改父组件的属性
          },

          // 记账对话框--类型选择
          selectType(type) {
            if (type == '支出') {
              this.form.project = "";
              this.projectSelect = this.projectSelect1;
            } else if (type == '收入') {
              this.form.project = "";
              this.projectSelect = this.projectSelect2;
            }
          },
          test(){
            console.log("test")
          },
          initvalues(form,isnew){
            this.selectType(form.type);
            this.form = form;
            this.isNew = isnew;
          },
        },//
        props:[
          'visible'
        ],


    }
</script>

<style scoped>

  .el-input-style {
    width: 210px;
    float: left;
  }
</style>
