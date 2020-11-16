<template>
    <div>
      asd
      <el-button  type="danger" @click="show"> 看我</el-button>

        <BillForm
          ref="billForm"
          v-if="dialogTableVisible"
          :visible.sync = "dialogTableVisible"
          :IN_formLabelWidth = formLabelWidth
        >
        </BillForm>


    </div>
</template>

<script>
  import BillForm from './BillForm.vue'
    export default {
        name: "EditBill",
        components:{
          BillForm
        },
        data(){
          return{
            CCCount:0,
            mytitle:"asd",
            dialogTableVisible:false,
            formLabelWidth:"400px",
            isme:"",
          }
        },
        created:function(){
          this.setValue();

        },
        methods:{
          show:function () {
        //    this.$refs.billForm.change();
            this.dialogTableVisible =true;
          },
          setValue(){
            this.formLabelWidth1 = "200px";
            this.isme = "陈泽楷";
          }
        }
    }
</script>

<style scoped>

</style>
