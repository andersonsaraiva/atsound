<template>
  <v-app-bar app clipped-left color="primary" dark>
    <v-app-bar-nav-icon @click="openSidebar"></v-app-bar-nav-icon>
    <v-toolbar-title @click="linkDash" class="cursor-pointer">
      <span class="title" v-if="settings" v-text="settings.APP_NAME"></span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <appIconAccount />
  </v-app-bar>
</template>

<script>
export default {
  components: {
    appIconAccount: () => import('@/components/icon-account/app-icon-account')
  },

  methods: {
    linkDash() {
      if (this.$route.path !== `/dashboard`) {
        this.$router.push('dashboard');
      }
    },

    openSidebar() {
      this.$store.dispatch('sidebar/openOrClosed');
    }
  },

  computed: {
    settings() {
      return this.$store.getters['authentication/getSettings'];
    }
  }
};
</script>
