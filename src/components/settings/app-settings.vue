<template>
  <div id="settings-wrapper">
    <v-card id="settings" dark flat link title="Configurações de Tema">
      <v-icon size="30">mdi-settings</v-icon>
    </v-card>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="#settings"
      bottom
      content-class="v-settings"
      left
      nudge-left="8"
      offset-x
      origin="top right"
      transition="scale-transition"
    >
      <v-card class="text-center mb-0" width="300">
        <v-card-text>
          <strong class="mb-3 d-inline-block">Configurações de Tema</strong>

          <v-item-group v-model="color">
            <v-item v-for="color in colors" :key="color" :value="color">
              <template v-slot="{ active, toggle }">
                <v-avatar :class="active && 'v-settings__item--active'" :color="color" class="v-settings__item" size="25" @click="toggle" />
              </template>
            </v-item>
          </v-item-group>

          <v-divider class="my-4" />

          <v-row align="center" no-gutters>
            <v-col cols="auto">Tema Escuro</v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-switch v-model="$vuetify.theme.dark" class="ma-0 pa-0" color="primary" hide-details />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import vuetifyColors from 'vuetify/lib/util/colors';
export default {
  data: () => ({
    colors: [],
    color: null,
    menu: false
  }),

  created() {
    this.setColors();
  },

  methods: {
    setColors() {
      this.color = this.$vuetify.theme.themes.light.primary;

      for (let color in vuetifyColors) {
        if (color === 'shades') continue;

        this.colors.push(vuetifyColors[color].base);
      }
    }
  },

  watch: {
    color(val) {
      this.$vuetify.theme.themes.light.primary = val;
      this.$vuetify.theme.themes.dark.primary = val;
    }
  }
};
</script>

<style lang="scss" scoped>
#settings {
  position: fixed;
  top: 115px;
  right: -25px;
  border-radius: 8px;
  min-width: 70px;
  padding: 8px 9px;
}

.v-settings {
  .v-item-group > * {
    cursor: pointer;
    margin: 5px;
  }

  &__item {
    border-width: 3px;
    border-style: solid;

    &--active {
      border-color: #dadada !important;
      box-shadow: 0px 0px 4px #616161;
    }
  }
}

.theme--light {
  #settings {
    background-color: rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 0, 0, 0.3);
  }
}

.theme--dark {
  #settings {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
