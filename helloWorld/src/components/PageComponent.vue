<template>
  <el-pagination
    background
    layout="total, sizes, prev, pager, next, jumper"
    :current-page="currentPage"
    :page-sizes="[5, 10, 20, 100]"
    :page-size="pageSize"
    :total="totalSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script>
  export default {
    name: "PageComponent",
    data() {
      return {
        currentPage: 1,
        pageSize: 5,
        totalSize: 1,
        totalPages: 2,
      }
    },
    created:function() {
      this.handleCurrentChange(1);
    },
    methods:
      {
        handleSizeChange: function (size) {
          this.pageSize = size;
          this.handleCurrentChange(this.currentPage);
        }
        ,
        handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage;
          var json = {"pageNum": this.currentPage, "pageSize": this.pageSize};
          var _this = this;
          this.$axios.post("/getAllRecordByPage", JSON.stringify(json)).then(function (value) {
            console.log(value);
            _this.totalPages = value.data.totalPages;
            _this.totalSize = value.data.totalSize;

            // 调用父组件方法进行赋值
            _this.$emit('Action',value.data.content);
            console.log("com")
          }).catch(function (err) {
          });
        },
        refresh(){
          this.handleCurrentChange(this.currentPage);
        }

      }
  }
</script>

<style scoped>

</style>
