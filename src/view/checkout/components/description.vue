<template>
  <div>
    <el-descriptions
      title="垂直带边框列表"
      direction="vertical"
      :column="4"
      border
    >
      <el-descriptions-item label="收件人姓名">{{
        information.recipient
      }}</el-descriptions-item>
      <el-descriptions-item label="收件人手機">{{
        information.recipientPhone
      }}</el-descriptions-item>
      <el-descriptions-item label="居住地" :span="2">{{
        information.country + " " + information.city
      }}</el-descriptions-item>
      <el-descriptions-item label="備註">
        <el-tag size="small">xxx</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="聯絡地址">{{
        information.street
      }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    description: { type: Object },
  },
  data() {
    return {
      information: null,
    };
  },
  created() {
    this.information = this.description;
  },
  //   created() {
  //     console.log(this.description);
  //   },
};
</script>