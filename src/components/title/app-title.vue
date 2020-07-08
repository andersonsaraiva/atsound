<template>
  <div class="title-page">
    <h1 class="title-page-text animate__animated animate__backInDown" v-text="value"></h1>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
};
</script>
