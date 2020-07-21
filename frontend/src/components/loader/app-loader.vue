<template>
  <loading
    :active.sync="isLoading"
    :is-full-page="true"
    :color="color"
    :height="128"
    :width="128"
    loader="bars"
    backgroundColor="#ffffff"
    :opacity="0.5"
  ></loading>
</template>

<script>
import Loading from 'vue-loading-overlay';

export default {
  components: {
    Loading
  },

  computed: {
    isLoading() {
      return this.$store.getters['loading/isLoading'];
    },

    color() {
      const theme = this.$store.getters['authentication/getSettings'];

      return theme ? theme.APP_THEME_COLOR : '#4b6cb7';
    }
  }
};
</script>
