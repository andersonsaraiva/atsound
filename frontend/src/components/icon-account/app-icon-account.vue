<template>
  <v-layout class="user-info">
    <v-menu offset-y transition="scroll-y-transition" :max-width="280" v-if="profile">
      <template v-slot:activator="{ attrs, on }">
        <div v-on="on" v-bind="attrs" class="user-info__photo">
          <v-card class="user-info__icon" img="static/icon-user.jpg"></v-card>

          <v-icon class="arrow">keyboard_arrow_down</v-icon>

          <span v-text="profile.name"></span>
        </div>
      </template>

      <v-list class="pa-0 menu_account" dense v-if="profile">
        <v-list-item>
          <v-list-item-content class="text-center">
            <v-list-item-subtitle class="text--primary" v-text="profile.name"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="profile.email"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item dense ripple @click="admin" id="administration" link>
          <v-icon color="primary" :size="19" class="mr-2">fas fa-user-circle</v-icon>
          <v-list-item-content>
            <v-list-item-title>Administração</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item dense ripple @click="changePassword" id="changePassword" link>
          <v-icon color="primary" :size="19" class="mr-2">fas fa-key</v-icon>
          <v-list-item-content>
            <v-list-item-title>Alterar Senha</v-list-item-title>
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

    <appChangePassword :dialog="dialog" />
  </v-layout>
</template>

<script>
import * as HANDLERS from '@/helpers/handlers';
import eventBus from 'vue-option-events';

export default {
  events: {
    [HANDLERS.CLOSE_DIALOG_NEW_PASSWORD]: 'closeDialogChangePassword'
  },

  components: {
    appChangePassword: () => import('@/components/dialog/app-change-password')
  },

  data: () => ({
    dialog: false
  }),

  computed: {
    profile() {
      return this.$store.getters['authentication/getProfile'];
    }
  },

  methods: {
    logoff() {
      this.$store.dispatch('authentication/logoff');
    },

    admin() {
      this.$router.push('users');
    },

    changePassword() {
      this.dialog = true;
    },

    closeDialogChangePassword() {
      this.dialog = false;
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
      background: transparent;
    }
  }
}

.theme--dark {
  .menu_account {
    .v-list-item {
      &:hover {
        background: #1e1e1e;
      }
    }
  }
}

.theme--light {
  .menu_account {
    .v-list-item {
      &:hover {
        background: #e5e5e5;
      }
    }
  }
}
</style>
