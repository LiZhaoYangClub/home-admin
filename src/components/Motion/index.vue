<template>
  <div
    v-motion
    class="title"
    :initial="{
      opacity: 0,
      y: 100
    }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        delay
      }
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="Motion">
defineProps({
  delay: {
    type: Number,
    default: 50
  }
})
</script>
