<template>
  <el-form
    :model="userInfo"
    :rules="userInfoRules"
    ref="userInfo"
    label-width="100px"
    class="demo-userInfo"
  >
    <el-form-item label="Mail" prop="mail">
      <!-- <el-input v-model="userInfo.mail"></el-input> -->
      <span>{{ userInfo.mail }}</span>
    </el-form-item>

    <el-form-item label="Name" prop="name">
      <el-input v-model="userInfo.name"></el-input>
    </el-form-item>
    <el-form-item label="Role">
      <span>{{ userInfo.roleName }}</span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native="save">save</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getInfo, updated } from "../../../api/user";
export default {
  name: "Dashboard",
  data() {
    return {
      userInfo: {
        name: "",
        role: "",
        mail: "",
      },
      userDetail: {},
      userInfoRules: {
        name: [{ required: true, message: "", trigger: "blur" }],
        mail: [{ required: true, message: "", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getInfo();
        this.userInfo = data;
      } catch (error) {
        console.log(error);
      }
    },
    async save() {
      try {
        const { data } = await updated(this.userInfo);
        this.userInfo = data;
        this.$notify({
          title: "Success",
          message: "success save",
          type: "success",
        });
      } catch (error) {
        this.$message.error("ERROR");
      }
    },
  },
};
</script>