<template>
  <div class="content-breadcrumbs">
    <h1 class="content-breadcrumbs_title" v-text="verifyName()"></h1>

    <v-spacer></v-spacer>

    <appChangeFontSize />

    <div class="align-center content-breadcrumbs_item">
      <ul>
        <li id="to-dashboard" @click="dashboard" title="Ir para o início">Início</li>
        <li v-text="verifyName()"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    appChangeFontSize: () => import('@/components/accessibility/app-accessibility-font')
  },

  methods: {
    dashboard() {
      if (this.$route.path !== `/dashboard`) {
        this.$router.push('dashboard');
      }
    },

    verifyName() {
      if (this.$route.meta.title) {
        return this.$route.meta.title;
      }

      return '';
    }
  }
};
</script>
