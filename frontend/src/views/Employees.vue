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
            <v-btn color="primary" @click="dialog = true">Cadastrar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-data-table :search="search" :headers="headers" :items="items" class="elevation-1" dense>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" color="green">
          mdi-pencil
        </v-icon>

        <v-icon small @click="deleteItem(item)" color="red">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="pa-3">
          <span class="headline">{{ formTitle }}</span>
          <v-spacer></v-spacer>
          <v-icon @click="close">close</v-icon>
        </v-card-title>

        <v-divider horizontal></v-divider>

        <v-form ref="form" lazy-validation>
          <v-container fluid>
            <v-row class="px-1">
              <v-col cols="12" sm="6" md="6" class="py-0">
                <v-text-field
                  v-model="editedItem.name"
                  label="Nome"
                  type="text"
                  required
                  :rules="[required]"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.email"
                  label="Email"
                  type="text"
                  required
                  :rules="[required, email]"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.phone"
                  label="Telefone"
                  type="text"
                  required
                  :rules="[required]"
                  outlined
                  dense
                  v-mask="['(##) ####-####', '(##) #####-####']"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  type="date"
                  v-model="editedItem.date_of_birth"
                  label="Data de nascimento"
                  prepend-inner-icon="event"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-select
                  v-model="editedItem.gender"
                  :items="['Feminino', 'Masculino']"
                  label="Sexo"
                  outlined
                  dense
                ></v-select>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-select
                  v-model="editedItem.marital_status"
                  :items="['Casado', 'Divorciado', 'Solteiro', 'Viúvo']"
                  label="Estado Civil"
                  outlined
                  dense
                ></v-select>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.nationality"
                  label="Nacionalidade"
                  type="text"
                  required
                  :rules="[required]"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-autocomplete
                  v-model="editedItem.schooling"
                  label="Escolaridade"
                  type="text"
                  required
                  :rules="[required]"
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
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.documents.cpf"
                  label="CPF"
                  required
                  type="text"
                  :rules="[required]"
                  outlined
                  dense
                  v-mask="'###.###.##-##'"
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.documents.rg"
                  label="RG"
                  required
                  type="text"
                  :rules="[required]"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.documents.cnh"
                  label="CNH"
                  required
                  type="text"
                  :rules="[required]"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" class="pt-0">
                <h3 class="subtitle-1">Endereço</h3>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.address.zipcode"
                  label="CEP"
                  required
                  type="text"
                  :rules="[required]"
                  outlined
                  dense
                  v-mask="'#####-###'"
                  @blur="onBlur"
                />
              </v-col>

              <v-col cols="12" sm="6" md="6" class="py-0">
                <v-text-field
                  v-model="editedItem.address.street"
                  label="Rua"
                  required
                  type="text"
                  :rules="[required]"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.address.number"
                  label="Número"
                  required
                  type="text"
                  :rules="[required]"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field v-model="editedItem.address.complement" label="Complemento" type="text" outlined dense />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.address.neighborhood"
                  label="Bairro"
                  required
                  type="text"
                  :rules="[required]"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.address.city"
                  label="Cidade"
                  required
                  type="text"
                  :rules="[required]"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.address.state"
                  label="Estado"
                  required
                  type="text"
                  :rules="[required]"
                  outlined
                  dense
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-card-actions class="pa-3 pt-0">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="save" small>Salvar</v-btn>
          <v-btn @click="close" small>Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import items from '@/api/employees.json';
import { required, email } from '@/helpers/validations';
import { showMessage, confirmMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';
import { getZipcode } from '@/services/cep';

export default {
  components: {
    appBreadcrumbs: () => import('@/components/breadcrumbs/app-breadcrumbs')
  },

  events: {
    [HANDLERS.DELETE_CUSTOMER]: 'showDelete'
  },

  data: () => ({
    search: '',
    required,
    email,
    dialog: false,
    menu: false,
    date: new Date().toISOString().substr(0, 10),
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Telefone', value: 'phone' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      date_of_birth: '',
      gender: '',
      nationality: '',
      marital_status: '',
      schooling: '',
      email: '',
      phone: '',
      documents: {
        cpf: '',
        rg: '',
        cnh: ''
      },
      address: {
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        city: '',
        state: ''
      }
    },
    defaultItem: {
      name: '',
      date_of_birth: '',
      gender: '',
      nationality: '',
      marital_status: '',
      schooling: '',
      email: '',
      phone: '',
      documents: {
        cpf: '',
        rg: '',
        cnh: ''
      },
      address: {
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        city: '',
        state: ''
      }
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Cadastro' : 'Edição';
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.items = items;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirmMessage(`Deseja realmente excluir`, `${item.name}`, item, HANDLERS.DELETE_CUSTOMER);
    },

    showDelete(item) {
      const index = this.items.indexOf(item);

      this.items.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.reset();
      });
    },

    save() {
      if (!this.$refs.form.validate(true)) return;

      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }

      this.close();
    },

    async onBlur() {
      if (this.editedItem && this.editedItem.address.zipcode) {
        const { data } = await getZipcode(this.editedItem.address.zipcode);

        if (data.erro) {
          showMessage('error', `O CEP ${this.editedItem.address.zipcode} é inválido!`, 3000);
        } else {
          this.editedItem.address.street = data.logradouro;
          this.editedItem.address.neighborhood = data.bairro;
          this.editedItem.address.city = data.localidade;
          this.editedItem.address.state = data.uf;
        }
      }
    }
  }
};
</script>
