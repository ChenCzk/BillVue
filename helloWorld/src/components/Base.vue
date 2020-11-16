<template>
    
</template>

<script>
    export default {
        name: "Base",
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

</style>
