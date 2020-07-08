<template>
  <v-navigation-drawer app clipped v-model="drawer">
    <v-list class="sidebar-items">
      <v-list-item v-for="(menu, index) in menus" :key="index" link two-line @click="redirect(menu.path)">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon v-text="menu.icon" color="primary"></v-icon>
          </v-list-item-title>
          <v-list-item-subtitle v-text="menu.title"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn color="primary" block @click="logoff">
          <v-icon small class="mr-2">fas fa-power-off</v-icon>
          Sair do Sistema
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import menus from '@/api/menu.json';

export default {
  data: () => ({
    menus
  }),

  computed: {
    drawer: {
      get() {
        return this.$store.getters['sidebar/openOrClosed'];
      },
      set(val) {
        return val;
      }
    }
  },

  methods: {
    redirect(path) {
      if (this.$route.path !== `/${path}`) {
        this.$router.push(path);
        this.$store.dispatch('sidebar/openOrClosed');
      }
    },

    logoff() {
      //store.dispatch('authentication/logoff');
      this.$router.push('login');
    }
  }
};
</script>
