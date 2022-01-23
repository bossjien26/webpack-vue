<template>
  <div class="mt-3">
    <el-card>
      <div slot="header">訂購資訊</div>
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="寄件人">
          <el-tag size="small">{{ descriptionInformation.sender }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="收件人姓名"
          ><el-tag type="success">
            {{ descriptionInformation.recipient }}
          </el-tag></el-descriptions-item
        >
        <el-descriptions-item label="收件人手機">{{
          descriptionInformation.recipientPhone
        }}</el-descriptions-item>
        <el-descriptions-item label="收件人信箱" :span="2">{{
          descriptionInformation.country + " " + descriptionInformation.city
        }}</el-descriptions-item>
        <el-descriptions-item label="國家">{{
          descriptionInformation.country
        }}</el-descriptions-item>
        <el-descriptions-item label="城市">{{
          descriptionInformation.city
        }}</el-descriptions-item>
        <el-descriptions-item label="地址">{{
          descriptionInformation.street
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="mt-4">
      <div slot="header">物流資訊</div>
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="方式">{{
          descriptionInformation.selectedDelivery.title
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card class="mt-4">
      <div slot="header">付款資訊</div>
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="方式">{{
          descriptionPayment.selectedPayment.title
        }}</el-descriptions-item>
        <el-descriptions-item
          v-if="descriptionPayment.selectedPayment.type == 2"
          label="信用卡後三碼"
          >{{ descriptionPayment.secret }}</el-descriptions-item
        >
        <el-descriptions-item
          v-if="descriptionPayment.selectedPayment.type == 2"
          label="到期卡片年份"
        >
          {{ descriptionPayment.selectedYear }}
        </el-descriptions-item>
        <el-descriptions-item
          v-if="descriptionPayment.selectedPayment.type == 2"
          label="到期卡片月份"
          >{{ descriptionPayment.selectedMonth }}</el-descriptions-item
        >
        <el-descriptions-item
          v-if="descriptionPayment.selectedPayment.type == 2"
          label="信用卡卡號"
          >{{
            descriptionPayment.card1 +
            "-" +
            descriptionPayment.card2 +
            "-" +
            descriptionPayment.card3
          }}</el-descriptions-item
        >
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    descriptionInformation: { type: Object },
    descriptionPayment: { type: Object },
  },
};
</script>