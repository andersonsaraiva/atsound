<template>
  <v-app>
    <template v-if="!$route.meta.public">
      <appSidebar />
      <appHeader />

      <v-main>
        <router-view></router-view>
      </v-main>
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
    appSidebar: () => import('@/components/sidebar/app-sidebar')
  }
};
</script>
