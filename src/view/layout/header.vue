<template>
  <div class="mb-4">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo w-100"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" onclick="location.href='/'">Store</el-menu-item>
      <el-submenu index="2">
        <template slot="title">分類</template>

        <el-submenu
          v-for="(category, key) in categories"
          :key="key"
          :index="2 + '-' + key"
        >
          <template slot="title">{{ category.name }}</template>
          <el-menu-item :index="category.id + '-all'" @select="handleSelect"
            >全部</el-menu-item
          >
          <el-menu-item
            v-for="(childrenCategory, childrenCategoryKey) in category
              .childrenCategories.$values"
            :key="childrenCategoryKey"
            :index="category.id + '-' + childrenCategory.id"
            @select="handleSelect"
            >{{ childrenCategory.name }}</el-menu-item
          >
        </el-submenu>
      </el-submenu>
      <el-menu-item index="6" onclick="location.href='/order'"
        >Order</el-menu-item
      >

      <el-menu-item
        style="float: right"
        index="3"
        onclick="location.href='/login'"
        v-if="!IsLogin"
        >login</el-menu-item
      >
      <el-submenu index="4" style="float: right">
        <template slot="title">
          <!-- <i class="el-icon-menu"></i> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
            />
          </svg>
        </template>
        <el-menu-item index="4-1" onclick="location.href='/user'"
          ><i class="el-icon-setting"></i> Settings</el-menu-item
        >
        <el-menu-item index="4-3" @click="logout"
          ><i class="el-icon-circle-close"></i> logout</el-menu-item
        >
      </el-submenu>

      <el-menu-item
        style="float: right"
        index="5"
        onclick="location.href='/cart'"
        v-if="IsLogin"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-cart2"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
          /></svg
      ></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { getCategoryList } from "../../api/category";

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      categories: null,
      IsLogin: false,
    };
  },
  async created() {
    this.IsLogin = this.$store.state.user.token != undefined ? true : false;
    await this.getCategory();
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key.split("-")[1] == "all") {
        location.href = "/product?categoryId=" + key.split("-")[0];
      }
    },
    async getCategory() {
      const response = await getCategoryList(1);
      try {
        this.categories = response.data.$values.splice(0, 4);
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("user/logout");
        this.$router.go(0);
        this.$router.push({ path: this.redirect || "/" });
      } catch (error) {}
    },
    async getToken() {},
  },
};
</script>
