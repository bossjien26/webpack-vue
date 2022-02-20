<template>
  <el-form
    :model="userDetail"
    :rules="cityRules"
    ref="userDetail"
    label-width="100px"
    class="demo-userDetail"
  >
    <el-form-item label="City" prop="city">
      <el-input v-model="userDetail.city"></el-input>
    </el-form-item>
    <el-form-item label="Country" prop="country">
      <el-input v-model="userDetail.country"></el-input>
    </el-form-item>
    <el-form-item label="Street" prop="street">
      <el-input v-model="userDetail.street"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native="save">save</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getInfo, created, updated } from "../../../api/userDetail";

export default {
  data() {
    return {
      userDetail: { id: 0 },
      cityRules: {
        city: [{ required: true, message: "", trigger: "blur" }],
        country: [{ required: true, message: "", trigger: "blur" }],
        street: [{ required: true, message: "", trigger: "blur" }],
      },
    };
  },
  async created() {
    await this.getInfo();
  },
  methods: {
    async getInfo() {
      try {
        const { data } = await getInfo();
        this.userDetail = data;
      } catch (error) {
        this.$message.error("ERROR");
      }
    },
    async created() {
      try {
        await created(this.userDetail);
      } catch (error) {
        this.$message.error("ERROR");
      }
    },
    async updated() {
      try {
        await updated(this.userDetail);
      } catch (error) {
        this.$message.error("ERROR");
      }
    },
    async save() {
      this.userDetail =
        this.userDetail.id === 0 ? await this.created() : await this.updated();
    },
  },
};
</script>