<template>
  <div class="login">
    <div class="login-container">
      <div class="login-container_wrap">
        <div class="form-login">
          <div class="form-login--content">
            <div class="form-login--content_title">
              <h1 v-if="settings" v-text="settings.APP_NAME"></h1>
            </div>

            <v-form @submit.prevent="handleLogin" ref="form" lazy-validation v-model="valid" v-if="!isForgotPassword">
              <div class="form-login--content_fields">
                <v-text-field
                  append-icon="person"
                  name="Login"
                  label="Login"
                  type="text"
                  v-model="login"
                  required
                  :rules="[required]"
                />
                <v-text-field
                  :append-icon="show ? 'visibility_off' : 'visibility'"
                  @click:append="show = !show"
                  :type="show ? 'text' : 'password'"
                  :rules="[required]"
                  name="Senha"
                  label="Senha"
                  v-model="password"
                  required
                />
              </div>

              <v-btn type="submit" large block color="primary" :disabled="!valid" :loading="loading">
                Entrar
              </v-btn>
              <div class="form-login--content_forgot">
                <v-btn text small color="primary" @click="isForgotPassword = true">Esqueci minha senha</v-btn>
              </div>
            </v-form>

            <v-form
              @submit.prevent="handleForgotPassword"
              ref="formForgout"
              lazy-validation
              v-model="validForgotPassword"
              v-if="isForgotPassword"
            >
              <div class="form-login--content_fields">
                <h4 class="form-login--content_subtitle">Digite seu email para recuperar a senha</h4>

                <v-text-field
                  append-icon="person"
                  name="Email"
                  label="Email"
                  type="text"
                  v-model="typedEmail"
                  required
                  :rules="[required, email]"
                />
              </div>

              <v-btn type="submit" large block color="primary" :disabled="!validForgotPassword" :loading="loading">
                Enviar email
              </v-btn>
              <div class="form-login--content_forgot">
                <v-btn text small color="primary" @click="isForgotPassword = false">Voltar para o login</v-btn>
              </div>
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
import { showMessage } from '@/helpers/messages';
import { required, email } from '@/helpers/validations';

export default {
  data: () => ({
    currentYear: new Date().getFullYear(),
    valid: true,
    validForgotPassword: true,
    show: false,
    loading: false,
    login: '',
    password: '',
    typedEmail: '',
    isForgotPassword: false,
    required,
    email
  }),

  methods: {
    handleLogin() {
      if (!this.$refs.form.validate(true)) return;

      this.$router.push('dashboard');
    }
  },

  computed: {
    settings() {
      return this.$store.getters['authentication/getSettings'];
    }
  }
};
</script>
