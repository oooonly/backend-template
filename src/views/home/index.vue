<template>
  <div>{{ msg }}</div>
  <el-button type="primary">Button</el-button>
  <i-box name="box"></i-box>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const msg = ref('111')
</script>
