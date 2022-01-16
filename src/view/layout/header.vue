<template>
  <div class="mb-4">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
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
      <!-- <el-menu-item target="_blank" index="3">Info</el-menu-item> -->
      <el-menu-item index="3" onclick="location.href='/login'"
        >login</el-menu-item
      >
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
    };
  },
  created: function () {
    this.getCategory();
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
  },
};
</script>