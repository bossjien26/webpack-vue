<template>
  <div class="mt-5">
    <el-card>
      <div slot="header">填寫送貨資訊</div>
      <b-row>
        <b-col cols="6">
          <span>居住國家：</span>
          <el-input v-model="information.country" placeholder="國家"></el-input>
        </b-col>
        <b-col cols="6">
          <span>居住城市：</span>
          <el-input v-model="information.city" placeholder="城市"></el-input>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col cols="6">
          <span>聯絡地址：</span>
          <el-input v-model="information.street" placeholder="地址"></el-input>
        </b-col>
      </b-row>

      <el-divider></el-divider>

      <b-row class="mt-2">
        <b-col cols="6">
          <span>寄件人姓名：</span>
          <el-input
            v-model="information.sender"
            placeholder="寄件人姓名"
          ></el-input>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col cols="6">
          <span>收件人姓名：</span>
          <el-input
            v-model="information.recipient"
            placeholder="收件人姓名"
          ></el-input>
        </b-col>
        <b-col cols="6">
          <span>收件人Mail：</span>
          <el-input
            v-model="information.recipientMail"
            placeholder="收件人Mail"
          ></el-input>
        </b-col>
      </b-row>

      <el-divider></el-divider>

      <b-row class="mt-2">
        <b-col cols="6">
          <span>收件人手機：</span>
          <el-input
            v-model="information.recipientPhone"
            placeholder="收件人手機"
          ></el-input>
        </b-col>
      </b-row>

      <div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <!-- <el-radio-group v-model="radio">
            <el-radio :label="3">备选项</el-radio>
          </el-radio-group> -->
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
            </div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>
              清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
            </div>
            <div>
              帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
            </div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>
              用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
            </div>
            <div>
              结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDeliveryInfo } from "../../../api/delivery";

export default {
  data() {
    return {
      information: {
        country: "",
        city: "",
        street: "",
        recipient: "",
        recipientMail: "",
        recipientPhone: "",
        sender: "",
      },
      deliveryInfo: [],
      activeNames: ["1"],
    };
  },
  watch: {
    information: {
      handler: function () {
        this.$emit("checkoutInformation", this.information);
      },
      deep: true,
    },
  },
  mounted() {
    this.getDeliveryInfo();
  },
  methods: {
    async getDeliveryInfo() {
      try {
        this.deliveryInfo = await getDeliveryInfo();
      } catch (error) {}
    },
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>