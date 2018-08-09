<template>
  <div>
     <el-row>
      <el-button v-auth="'add'">新增</el-button>
      <el-button  v-auth="'edit'">修改</el-button>
      <el-button  v-auth="'delete'">删除</el-button>
    </el-row>
   角色管理
  </div>

</template>
<script>
// import {userRes} from '@/client/api'
export default {
  data: function () {
    return {

    }
  },
  methods: {
  }
}
</script>
