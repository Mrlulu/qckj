<template>
    <div :class=$.login_warpper>
      <div :class=$.panel>
        <div :class=$.input>
          <input name="userName" v-model="userName" placeholder="请输入账号" />
      </div>
      <div :class=$.input>
          <input name="userPwd" type="password" v-model="userPwd" placeholder="请输入密码" />
      </div>
    <a @click="login" :class=$.login>登陆</a>
        </div>
    </div>
</template>

<script>
import { userRes } from '@/api'
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      userPwd: ''
    }
  },
  mounted () {
  },
  methods: {
    login () {
      const send = {userName: this.userName, userPwd: this.userPwd}
      userRes.login(send).then((res) => {
        this.$emit('getPermission')
        this.$message.success('登陆成功')
        this.$router.replace({name: 'home'})
      })
    }
  }
}
</script>

<style lang="stylus" module="$">
.login_warpper{
    background: url(../assets/loginbg.jpg) 0 0 no-repeat;
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    height: 100%;
    margin: auto;
    background-size cover
}
.panel {
    width: 400px;
    margin: 0 auto;
    text-align: center;
    background-color: #ffffff7a;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 200px;
    left: 0;
    right: 0;
    padding-top: 45px;

}
.login {
  background-color blue
  display inline-block
  height 30px
  line-height 30px
  color #ffffff
  border-radius 4px
  width 200px
  margin-top: 48px;
}
.input {
  margin-top 10px
  input{
    border: 0;
    font-size: 14px;
    padding: 5px 20px;
    border-radius: 4px;
    width: 200px;
    box-sizing: border-box;
  }
}
</style>
