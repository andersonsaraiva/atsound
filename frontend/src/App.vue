<template>
  <v-app>
    <template v-if="!$route.meta.public && token">
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

    <appLoader />
  </v-app>
</template>

<script>
export default {
  components: {
    appHeader: () => import('@/components/header/app-header'),
    appLoader: () => import('@/components/loader/app-loader'),
    appSidebar: () => import('@/components/sidebar/app-sidebar'),
    appSettings: () => import('@/components/settings/app-settings')
  },

  async beforeCreate() {
    await this.$store.dispatch('authentication/getSettings');
    const theme = this.$store.getters['authentication/getSettings'];

    if (theme && this.$vuetify) {
      this.$vuetify.theme.themes.light.primary = theme.APP_THEME_COLOR;
      this.$vuetify.theme.themes.dark.primary = theme.APP_THEME_COLOR;
      this.$vuetify.theme.dark = theme.APP_THEME_DARK;
    }
  },

  computed: {
    token() {
      return this.$store.getters['authentication/getToken'];
    },

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
