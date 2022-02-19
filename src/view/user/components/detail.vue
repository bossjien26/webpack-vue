<template>
  <div></div>
</template>

<script>
import { getInfo } from "../../../api/userDetail";

export default {
  data() {
    return {
      userDetail: {},
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
        console.log(error);
      }
    },
  },
};
</script>