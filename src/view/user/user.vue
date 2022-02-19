<template>
  <div class="dashboard-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Info" name="first"><Info /></el-tab-pane>
      <el-tab-pane label="Detail" name="second"><Detail /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Info from "./components/info.vue";
import Detail from "./components/detail.vue";

export default {
  data() {
    return {
      activeName: "first",
    };
  },
  components: {
    Info,
    Detail,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>