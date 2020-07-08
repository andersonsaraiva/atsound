<template>
  <v-container>
    <appBreadcrumbs />
  </v-container>
</template>

<script>
export default {
  components: {
    appBreadcrumbs: () => import('@/components/breadcrumbs/app-breadcrumbs')
  }
};
</script>
