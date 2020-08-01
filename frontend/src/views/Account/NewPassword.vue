<template>
  <div class="login">
    <div class="login-container">
      <div class="login-container_wrap">
        <div class="form-login">
          <div class="form-login--content">
            <div class="form-login--content_title">
              <h1 v-if="settings" v-text="settings.APP_NAME"></h1>
            </div>

            <v-form @submit.prevent="handleRecoverPassword" ref="form" lazy-validation v-model="valid">
              <h4 class="form-login--content_subtitle">Redefinição de Senha</h4>

              <div class="form-login--content_fields">
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
              </div>

              <v-btn type="submit" large block color="primary" :disabled="!valid">
                Redefinir a Senha
              </v-btn>
            </v-form>
          </div>
          <footer class="form-login--footer">© {{ currentYear }} todos direitos reservados</footer>
        </div>
        <div class="bg-login"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from '@/helpers/validations';

export default {
  data: () => ({
    currentYear: new Date().getFullYear(),
    valid: true,
    showPassword: false,
    showConfirmPassword: false,
    password: null,
    confirmPassword: null,
    required
  }),

  methods: {
    handleRecoverPassword() {
      if (!this.$refs.form.validate(true)) return;

      const { password, confirmPassword } = this;
      const { token, dateToken } = this.$route.params;

      const emailDate = new Date(
        `${dateToken
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('-')} ${dateToken.split(' ')[1]}`
      );

      if (emailDate <= new Date()) {
        showMessage('error', 'Token Expirado!');
        return;
      }

      this.$store.dispatch('authentication/changePassword', { password, confirmPassword });
    },

    verifyConfirmPassword(v) {
      return v !== this.password ? 'Senhas precisam ser idênticas' : true;
    }
  },

  computed: {
    settings() {
      return this.$store.getters['authentication/getSettings'];
    }
  }
};
</script>
