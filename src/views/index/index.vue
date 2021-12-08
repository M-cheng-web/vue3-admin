<template>
  <div class="index-start">
    index
    <el-row :gutter="10">
      <el-col class="box-col" :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <div class="box" v-for="(item, index) in boxList" :key="index">{{ item }}</div>
      </el-col>
      <el-col class="text-col" :xs="24" :sm="24" :md="24" :lg="8" :xl="8"></el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const boxList = reactive([
  1, 2, 3, 4, 5
])

</script>

<script>
export default {
  name: 'IndexStart'
}
</script>

<style lang='scss' scoped>
.index-start {
  .box-col {
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    .box {
      width: 33%;
      text-align: center;
      border: 1px solid red;
    }
  }
  .text-col {
    border: 1px solid red;
    height: 100px;
  }
}
</style>
