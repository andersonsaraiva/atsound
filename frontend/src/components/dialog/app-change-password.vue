<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card class="card card-new-password" max-width="400">
      <v-form @submit.prevent="handleChangeNewPassword" ref="form" lazy-validation v-model="valid">
        <v-img
          :height="200"
          :src="require('@/assets/bg-login.jpg')"
          gradient="to top right, rgba(100, 115, 201, .5), rgba(25, 32, 72, .7)"
        >
          <v-row align="center" justify="center" class="white--text fill-height">
            <v-col>
              <div class="text-h5 text-center">Alteração de Senha</div>
            </v-col>
          </v-row>
        </v-img>

        <v-card-text>
          <v-text-field
            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
            @click:append="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            name="Senha"
            label="Senha"
            v-model="password"
            required
            :rules="[required]"
          />

          <v-text-field
            :append-icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
            @click:append="showConfirmPassword = !showConfirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            name="Senha"
            label="Confirmação de Senha"
            v-model="confirmPassword"
            required
            :rules="[required, verifyConfirmPassword]"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit" small :disabled="!valid">Salvar</v-btn>
          <v-btn @click="close" small>Cancelar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { required } from '@/helpers/validations';
import * as HANDLERS from '@/helpers/handlers';
import eventBus from 'vue-option-events';

export default {
  data: () => ({
    valid: true,
    showPassword: false,
    showConfirmPassword: false,
    password: null,
    confirmPassword: null,
    required
  }),

  props: {
    dialog: {
      type: Boolean,
      default: false,
      required: true
    }
  },

  methods: {
    handleChangeNewPassword() {
      if (!this.$refs.form.validate(true)) return;

      const { password, confirmPassword } = this;

      this.$store.dispatch('authentication/editPassword', { password, confirmPassword });
    },

    verifyConfirmPassword(v) {
      return v !== this.password ? 'Senhas precisam ser idênticas' : true;
    },

    close() {
      this.$refs.form.reset();
      eventBus.$emit(HANDLERS.CLOSE_DIALOG_NEW_PASSWORD);
    }
  }
};
</script>
