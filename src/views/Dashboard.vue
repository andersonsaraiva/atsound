<template>
  <v-container>
    <appTitle />

    <v-row justify="center" align="center">
      <v-col
        lg="4"
        md="6"
        cols="12"
        :class="`animate__animated animate__fadeInLeft animate__delay-${index + 1}s`"
        v-for="(menu, index) in menus"
        :key="index"
        @click="redirect(menu.path)"
      >
        <div class="card-services">
          <div class="card-services_icon">
            <v-icon large dark v-text="menu.icon"></v-icon>
          </div>
          <h2 class="card-services_title" v-text="menu.title"></h2>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import menus from '@/api/menu.json';

export default {
  components: {
    appTitle: () => import('@/components/title/app-title')
  },

  data: () => ({
    menus: menus.filter(x => x.path !== 'dashboard')
  }),

  created() {
    this.$store.dispatch('background/set', 'static/bg-dashboard.jpg');
  },

  methods: {
    redirect(path) {
      if (this.$route.path !== `/${path}`) {
        this.$router.push(path);
      }
    }
  }
};
</script>
