<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">
      roles:
      <!-- <span v-for="role in roles" :key="role">{{ role }}</span> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      var response = await this.$store.dispatch("user/getInfo");
      console.log(response);
    },
  },
};
</script>