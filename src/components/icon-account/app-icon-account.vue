<template>
  <v-layout class="user-info">
    <v-menu offset-y transition="scroll-y-transition" :max-width="280">
      <template v-slot:activator="{ attrs, on }">
        <div v-on="on" v-bind="attrs" class="user-info__photo">
          <v-card class="user-info__icon" img="static/icon-user.jpg"></v-card>

          <v-icon class="arrow">keyboard_arrow_down</v-icon>

          <span>Anderson Saraiva</span>
        </div>
      </template>

      <v-list class="pa-0 menu_account" dense>
        <v-list-item>
          <v-list-item-content class="text-center">
            <v-list-item-subtitle class="text--primary">Anderson Saraiva</v-list-item-subtitle>
            <v-list-item-subtitle>a.saraiva90@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item dense ripple @click="logoff" id="logoff" link>
          <v-icon color="primary" :size="19" class="mr-2">fas fa-power-off</v-icon>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script>
export default {
  methods: {
    logoff() {
      //this.$store.dispatch('authentication/logoff');
      this.$router.push('login');
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  width: auto;
  height: auto;
  display: contents;
  align-items: center;
  color: #fff;
  cursor: pointer;

  .v-icon.arrow {
    color: #fff;
    font-size: 12px;
    margin-right: 4px;
  }

  &__icon {
    width: 32px;
    height: 32px;
    position: relative;
    border-radius: 50%;
    margin-right: 4px;
  }

  &__photo {
    display: flex;
    align-items: center;
    height: 100%;

    span {
      font-size: 14px;
    }
  }
}

.menu_account {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12) !important;
  border-bottom: 2px solid var(--v-primary-base);

  .v-list-item {
    &:first-child {
      &:hover {
        background: transparent;
      }
    }
    &:hover {
      background: #e5e5e5;
    }
  }
}
</style>
