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
            <v-btn color="primary" @click="addCustomer">Cadastrar</v-btn>
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

        <v-stepper v-model="step" non-linear>
          <v-stepper-header>
            <v-stepper-step editable step="1">
              Dados do Cliente
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :editable="!!editedItem.id" step="2">
              Carros
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-form ref="form" lazy-validation v-model="form">
                <v-container fluid>
                  <v-row class="px-1">
                    <v-col cols="12" sm="2" md="2" class="py-0" v-if="editedItem.id">
                      <v-text-field
                        v-model="editedItem.id"
                        label="Código"
                        type="text"
                        dense
                        outlined
                        readonly
                        disabled
                      />
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
                        :rules="[email]"
                      />
                    </v-col>

                    <v-col cols="12" sm="3" md="3" class="py-0">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Telefone"
                        type="text"
                        outlined
                        dense
                        required
                        :rules="[required]"
                        v-mask="['(##) ####-####', '(##) #####-####']"
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
                            v-model="dateFormated"
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
                        :items="['Masculino', 'Feminino']"
                        label="Sexo"
                        outlined
                        dense
                        required
                        :rules="[required]"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="3" md="3" class="py-0">
                      <v-text-field
                        v-model="editedItem.cpf"
                        label="CPF"
                        type="text"
                        outlined
                        dense
                        required
                        :rules="[required]"
                        v-mask="'###.###.###-##'"
                      />
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
                        required
                        :rules="[required]"
                        v-mask="'#####-###'"
                        @blur="onBlur"
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
                      <v-text-field
                        v-model="editedItem.complement"
                        label="Complemento"
                        type="text"
                        outlined
                        dense
                        hint="Exemplo: andar, apto, bloco"
                      />
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
              <v-card-actions class="pa-3 pt-0">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="save" :disabled="!form">
                  Salvar e avançar
                  <v-icon right>fas fa-long-arrow-alt-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-form ref="formCars" lazy-validation v-model="formCars">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" sm="2" md="2" class="py-0">
                      <v-text-field
                        v-model="car.model"
                        label="Modelo"
                        type="text"
                        dense
                        outlined
                        required
                        :rules="[required]"
                      />
                    </v-col>

                    <v-col cols="12" sm="2" md="2" class="py-0">
                      <v-text-field
                        v-model="car.color"
                        label="Cor"
                        type="text"
                        dense
                        outlined
                        required
                        :rules="[required]"
                      />
                    </v-col>

                    <v-col cols="12" sm="2" md="2" class="py-0">
                      <v-text-field
                        v-model="car.year"
                        label="Ano"
                        type="number"
                        min="0"
                        max="9999"
                        dense
                        outlined
                        required
                        :rules="[required]"
                      />
                    </v-col>

                    <v-col cols="12" sm="2" md="2" class="py-0">
                      <v-text-field
                        v-model="car.license_plate"
                        label="Placa"
                        type="text"
                        dense
                        outlined
                        required
                        :rules="[required]"
                      />
                    </v-col>

                    <v-col cols="12" sm="4" md="4" class="py-0">
                      <v-btn color="primary" @click="addCar" :disabled="!formCars">
                        <v-icon left>add</v-icon>
                        {{ carButtonTitle }}
                      </v-btn>
                      <v-btn
                        color="primary"
                        class="ml-2"
                        outlined
                        @click="cancelCar"
                        v-if="editedIndexCar > -1"
                        title="Cancelar Atualização"
                      >
                        Cancelar
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-data-table :headers="carsHeaders" :items="cars" hide-default-footer dense class="elevation-1">
                        <template v-slot:item.actions="{ item }">
                          <v-icon small class="mr-2" @click="editCar(item)" color="green" title="Editar carro">
                            mdi-pencil
                          </v-icon>

                          <v-icon small @click="deleteCar(item)" color="red" title="Excluir carro">
                            mdi-delete
                          </v-icon>
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { required, email } from '@/helpers/validations';
import { showMessage, confirmMessage } from '@/helpers/messages';
import { formatDateForm, formatDateComputed } from '@/helpers/utils';
import * as HANDLERS from '@/helpers/handlers';
import { getZipcode } from '@/services/zipcode';

export default {
  components: {
    appBreadcrumbs: () => import('@/components/breadcrumbs/app-breadcrumbs')
  },

  events: {
    [HANDLERS.DELETE_CUSTOMER]: 'showDelete',
    [HANDLERS.NEXT_STEP_CUSTOMERS]: 'next_step',
    [HANDLERS.DELETE_CAR]: 'showDeleteCar'
  },

  data: () => ({
    required,
    email,
    form: true,
    formCars: true,
    search: '',
    step: 1,
    menu: false,
    dialog: false,
    editedIndex: -1,
    editedIndexCar: -1,
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Telefone', value: 'phone' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    carsHeaders: [
      { text: 'Modelo', value: 'model' },
      { text: 'Cor', value: 'color' },
      { text: 'Ano', value: 'year' },
      { text: 'Placa', value: 'license_plate' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    car: {
      id: null,
      model: null,
      color: null,
      year: null,
      license_plate: null
    },
    defaultCar: {
      id: null,
      model: null,
      color: null,
      year: null,
      license_plate: null
    },
    editedItem: {
      name: null,
      email: null,
      phone: null,
      cpf: null,
      gender: null,
      date_of_birth: null,
      zipcode: null,
      street: null,
      number: null,
      neighborhood: null,
      complement: null,
      city: null,
      state: null
    },
    defaultItem: {
      name: null,
      email: null,
      phone: null,
      cpf: null,
      gender: null,
      date_of_birth: null,
      zipcode: null,
      street: null,
      number: null,
      neighborhood: null,
      complement: null,
      city: null,
      state: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Cadastro de Cliente' : 'Edição de Cliente';
    },

    items() {
      return this.$store.getters['customers/get'];
    },

    carButtonTitle() {
      return this.editedIndexCar === -1 ? 'Adicionar' : 'Atualizar';
    },

    cars() {
      return this.$store.getters['customers/getCars'];
    },

    dateFormated: {
      get: function() {
        return this.formatDate();
      },
      set: function() {
        return this.formatDate();
      }
    }
  },

  created() {
    this.$store.dispatch('customers/get');
  },

  methods: {
    formatDate() {
      if (this.editedItem.date_of_birth) {
        return formatDateComputed(this.editedItem.date_of_birth);
      } else {
        return null;
      }
    },

    addCustomer() {
      this.dialog = true;
      this.step = 1;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);

      item.date_of_birth = formatDateForm(item.date_of_birth);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;

      this.$store.dispatch('customers/getCars', item.id);
    },

    deleteItem(item) {
      confirmMessage(`Deseja realmente excluir`, `${item.name}`, item, HANDLERS.DELETE_CUSTOMER);
    },

    showDelete(item) {
      this.$store.dispatch('customers/delete', item);
    },

    close() {
      this.dialog = false;
      this.step = 1;

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.reset();

        this.car = Object.assign({}, this.defaultCar);
        this.editedIndexCar = -1;
        this.$refs.formCars.reset();
      });

      this.$store.dispatch('customers/get');
    },

    save() {
      if (!this.$refs.form.validate(true)) return;

      if (this.editedIndex > -1) {
        this.$store.dispatch('customers/update', this.editedItem);
      } else {
        this.$store.dispatch('customers/create', this.editedItem);
      }
    },

    next_step(item) {
      this.editedItem.id = item.id;
      this.step = 2;

      this.$store.dispatch('customers/getCars', item.id);
    },

    editCar(item) {
      this.editedIndexCar = this.cars.indexOf(item);
      this.car = Object.assign({}, item);
    },

    cancelCar() {
      this.editedIndexCar = -1;
      this.car = Object.assign({}, this.defaultCar);
      this.$refs.formCars.reset();
    },

    deleteCar(item) {
      confirmMessage(`Deseja realmente excluir`, `${item.model}`, item, HANDLERS.DELETE_CAR);
    },

    showDeleteCar(item) {
      this.$store.dispatch('customers/deleteCar', item);
    },

    addCar() {
      if (!this.$refs.formCars.validate(true)) return;

      let params = { customer: { customer_id: this.editedItem.id }, car: this.car };

      if (this.editedIndexCar > -1) {
        this.$store.dispatch('customers/updateCar', params);
      } else {
        this.$store.dispatch('customers/createCar', params);
      }

      this.$refs.formCars.reset();
      this.editedIndexCar = -1;
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
