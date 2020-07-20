<template>
  <v-app>
    <template v-if="!$route.meta.public">
      <appSidebar />
      <appHeader />

      <v-main :style="background">
        <router-view></router-view>
      </v-main>
      <appSettings />
    </template>

    <template v-else>
      <v-main>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
        </keep-alive>
      </v-main>
    </template>
  </v-app>
</template>

<script>
export default {
  components: {
    appHeader: () => import('@/components/header/app-header'),
    appSidebar: () => import('@/components/sidebar/app-sidebar'),
    appSettings: () => import('@/components/settings/app-settings')
  },

  computed: {
    background() {
      let style = 'background-size: cover; background-position: center center; background-attachment: fixed;';

      const bg = this.$store.getters['background/get'];

      if (bg) {
        return `background-image: url('${bg}'); ${style}`;
      }

      return bg;
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('background/clear');
    }
  }
};
</script>
