<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { init } from './index';

const container = useTemplateRef('threeContainer')

onMounted(() => {
  init(container.value as HTMLDivElement)
})

</script>

<template>
  <div id="container">
    <div id="three-container" ref="threeContainer"></div>
  </div>
</template>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  #three-container {
    width: 100%;
    height: 100%;
  }
}
</style>
