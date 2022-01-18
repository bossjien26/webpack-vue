<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">
      role:
      <span>{{ role }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "role"]),
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      try {
        await this.$store.dispatch("user/getInfo");
      } catch (error) {
        this.$router.push({ path: this.redirect || "/login" });
      }
    },
  },
};
</script>