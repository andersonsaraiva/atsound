<template>
  <v-container>
    <appBreadcrumbs />

    <v-card class="elevation-1 mb-4 mt-4">
      <v-card-text class="py-0">
        <v-row>
          <v-col lg="10" md="10" sm="8">
            <v-text-field
              v-model="search"
              clearable
              append-icon="search"
              label="Digite para pesquisar..."
              hide-details
              outlined
              dense
            />
          </v-col>

          <v-col lg="2" md="2" sm="4">
            <v-btn color="primary" @click="addEmployees">Cadastrar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-data-table :search="search" :headers="headers" :items="items" class="elevation-1" dense>
      <template v-slot:item.date_of_birth="{ item }">
        {{ formatDate(item.date_of_birth) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" color="green" title="Editar item">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)" color="red" title="Excluir item">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon dark @click="close" title="Fechar janela">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-divider horizontal></v-divider>

        <v-form ref="form" lazy-validation v-model="form">
          <v-container fluid>
            <v-row class="px-1">
              <v-col cols="12" sm="2" md="2" class="py-0" v-if="editedItem.id">
                <v-text-field v-model="editedItem.id" label="Código" type="text" dense outlined readonly disabled />
              </v-col>
              <v-col cols="12" :sm="editedItem.id ? 4 : 6" :md="editedItem.id ? 4 : 6" class="py-0">
                <v-text-field
                  v-model="editedItem.name"
                  label="Nome"
                  type="text"
                  outlined
                  dense
                  required
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                  type="text"
                  outlined
                  dense
                  required
                  :rules="[required, email]"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.phone"
                  label="Telefone"
                  type="text"
                  outlined
                  dense
                  v-mask="['(##) ####-####', '(##) #####-####']"
                  required
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.date_of_birth"
                      label="Data de nascimento"
                      append-icon="event"
                      readonly
                      dense
                      outlined
                      required
                      :rules="[required]"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="editedItem.date_of_birth"
                    @input="menu = false"
                    locale="pt-br"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-select
                  v-model="editedItem.gender"
                  :items="['Feminino', 'Masculino']"
                  label="Sexo"
                  outlined
                  dense
                  required
                  :rules="[required]"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-select
                  v-model="editedItem.marital_status"
                  :items="['Casado', 'Divorciado', 'Solteiro', 'Viúvo']"
                  label="Estado Civil"
                  outlined
                  dense
                  required
                  :rules="[required]"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.nationality"
                  label="Nacionalidade"
                  type="text"
                  outlined
                  dense
                  required
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-autocomplete
                  v-model="editedItem.schooling"
                  label="Escolaridade"
                  type="text"
                  :items="[
                    'Ensino Fundamental Incompleto',
                    'Ensino Fundamental Completo',
                    'Ensino Médio Incompleto',
                    'Ensino Médio Completo',
                    'Ensino Técnico',
                    'Ensino Superior Incompleto',
                    'Ensino Superior Completo',
                    'Outros'
                  ]"
                  outlined
                  dense
                  required
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.cpf"
                  label="CPF"
                  type="text"
                  outlined
                  dense
                  v-mask="'###.###.###-##'"
                  required
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.rg"
                  label="RG"
                  type="text"
                  outlined
                  dense
                  required
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field v-model="editedItem.cnh" label="CNH" type="text" outlined dense />
              </v-col>

              <v-col cols="12" class="pt-0">
                <h3 class="subtitle-1">Endereço</h3>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.zipcode"
                  label="CEP"
                  type="text"
                  outlined
                  dense
                  v-mask="'#####-###'"
                  @blur="onBlur"
                  required
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" sm="6" md="6" class="py-0">
                <v-text-field
                  v-model="editedItem.street"
                  label="Rua"
                  type="text"
                  outlined
                  dense
                  required
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.number"
                  label="Número"
                  type="text"
                  outlined
                  dense
                  required
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field v-model="editedItem.complement" label="Complemento" type="text" outlined dense />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.neighborhood"
                  label="Bairro"
                  type="text"
                  outlined
                  dense
                  required
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.city"
                  label="Cidade"
                  type="text"
                  outlined
                  dense
                  required
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.state"
                  label="Estado"
                  type="text"
                  outlined
                  dense
                  required
                  :rules="[required]"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="save" small :disabled="!form">Salvar</v-btn>
          <v-btn @click="close" small>Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { required, email } from '@/helpers/validations';
import { showMessage, confirmMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';
import { getZipcode } from '@/services/zipcode';
import { formatDate } from '@/helpers/utils';

export default {
  components: {
    appBreadcrumbs: () => import('@/components/breadcrumbs/app-breadcrumbs')
  },

  events: {
    [HANDLERS.DELETE_EMPLOYEES]: 'showDelete',
    [HANDLERS.CLOSE_EMPLOYEES]: 'close'
  },

  data: () => ({
    menu: false,
    form: true,
    search: '',
    required,
    email,
    dialog: false,
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Telefone', value: 'phone' },
      { text: 'Data de Nascimento', value: 'date_of_birth' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    editedIndex: -1,
    editedItem: {
      id: null,
      name: null,
      date_of_birth: null,
      gender: null,
      nationality: null,
      marital_status: null,
      schooling: null,
      email: null,
      phone: null,
      cpf: null,
      rg: null,
      cnh: null,
      zipcode: null,
      street: null,
      number: null,
      neighborhood: null,
      complement: null,
      city: null,
      state: null
    },
    defaultItem: {
      id: null,
      name: null,
      date_of_birth: null,
      gender: null,
      nationality: null,
      marital_status: null,
      schooling: null,
      email: null,
      phone: null,
      cpf: null,
      rg: null,
      cnh: null,
      zipcode: null,
      street: null,
      number: null,
      neighborhood: null,
      complement: null,
      city: null,
      state: null
    }
  }),

  created() {
    this.$store.dispatch('employees/get');
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Cadastro' : 'Edição';
    },

    items() {
      return this.$store.getters['employees/get'];
    }
  },

  methods: {
    formatDate,

    addEmployees() {
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirmMessage(`Deseja realmente excluir`, `${item.name}`, item, HANDLERS.DELETE_EMPLOYEES);
    },

    showDelete(item) {
      this.$store.dispatch('employees/delete', item);
    },

    close() {
      this.dialog = false;

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.reset();
      });

      this.$store.dispatch('employees/get');
    },

    save() {
      if (!this.$refs.form.validate(true)) return;

      if (this.editedIndex > -1) {
        this.$store.dispatch('employees/update', this.editedItem);
      } else {
        this.$store.dispatch('employees/create', this.editedItem);
      }
    },

    async onBlur() {
      if (this.editedItem && this.editedItem.zipcode) {
        const { data } = await getZipcode(this.editedItem.zipcode);

        if (data.erro) {
          showMessage('error', `O CEP ${this.editedItem.zipcode} é inválido!`, 3000);
        } else {
          this.editedItem.street = data.logradouro;
          this.editedItem.neighborhood = data.bairro;
          this.editedItem.city = data.localidade;
          this.editedItem.state = data.uf;
        }
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>
