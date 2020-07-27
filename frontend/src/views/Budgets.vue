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
            ></v-text-field>
          </v-col>

          <v-col lg="2" md="2" sm="4">
            <v-btn color="primary" @click="addBudget">Cadastrar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-data-table :search="search" :headers="headers" :items="items" class="elevation-1" dense sort-by="date">
      <template v-slot:item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" color="green">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)" color="red">
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

        <v-stepper v-model="step" non-linear>
          <v-stepper-header>
            <v-stepper-step editable step="1">
              Dados do Usuário
              <small>Obrigatório</small>
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :editable="!!editedItem.id" step="2">
              Serviços
              <small>Obrigatório</small>
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
                        label="Nome do Cliente"
                        type="text"
                        dense
                        outlined
                        required
                        :rules="[required]"
                      />
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="py-0">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                        type="text"
                        dense
                        outlined
                        :rules="[email]"
                      />
                    </v-col>
                    <v-col cols="12" sm="4" md="4" class="py-0">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Telefone"
                        type="text"
                        dense
                        outlined
                        required
                        :rules="[required]"
                        v-mask="['(##) ####-####', '(##) #####-####']"
                      />
                    </v-col>
                    <v-col cols="12" sm="4" md="4" class="py-0">
                      <v-text-field
                        v-model="editedItem.cpf"
                        label="CPF"
                        dense
                        outlined
                        type="text"
                        v-mask="'###.###.###-##'"
                      />
                    </v-col>
                    <v-col cols="12" sm="4" md="4" class="py-0">
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.date"
                            label="Data do Orçamento"
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
                        <v-date-picker v-model="editedItem.date" @input="menu = false" locale="pt-br"></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="save" :disabled="!form">
                  Salvar e avançar
                  <v-icon right>fas fa-long-arrow-alt-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-form ref="formServices" lazy-validation v-model="formServices">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" class="py-0">
                      <v-text-field
                        v-model="service.description"
                        label="Descrição"
                        type="text"
                        dense
                        outlined
                        required
                        :rules="[required]"
                      />
                    </v-col>
                    <v-col cols="12" sm="2" md="2" class="py-0">
                      <vuetify-money
                        v-model="service.price"
                        label="Preço"
                        dense
                        outlined
                        required
                        :rules="[required]"
                        :valueWhenIsEmpty="''"
                        :options="options"
                        background-color="transparent"
                      />
                    </v-col>
                    <v-col cols="12" sm="4" md="4" class="py-0">
                      <v-btn color="primary" @click="addService" :disabled="!formServices">
                        <v-icon left>add</v-icon>
                        {{ serviceButtonTitle }}
                      </v-btn>
                      <v-btn
                        color="primary"
                        class="ml-2"
                        outlined
                        @click="cancelService"
                        v-if="editedService > -1"
                        title="Cancelar Atualização"
                      >
                        Cancelar
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-data-table
                        :headers="servicesHeaders"
                        :items="editedItem.services"
                        hide-default-footer
                        dense
                        class="elevation-1"
                      >
                        <template v-slot:item.price="{ item }">
                          {{ formatValue(item.price) }}
                        </template>

                        <template v-slot:item.actions="{ item }">
                          <v-icon small class="mr-2" @click="editService(item)" color="green" title="Editar serviço">
                            mdi-pencil
                          </v-icon>
                          <v-icon small @click="deleteService(item)" color="red" title="Excluir serviço">
                            mdi-delete
                          </v-icon>
                        </template>
                        <template v-slot:body.append>
                          <tr>
                            <td class="text-start"><strong>Total:</strong></td>
                            <td class="text-start">
                              <strong>{{ formatValue(totalServices) }}</strong>
                            </td>
                            <td class="text-right"></td>
                          </tr>
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
import { formatValue, formatDate } from '@/helpers/utils';
import * as HANDLERS from '@/helpers/handlers';

export default {
  components: {
    appBreadcrumbs: () => import('@/components/breadcrumbs/app-breadcrumbs')
  },

  events: {
    [HANDLERS.DELETE_BUDGETS]: 'showDelete',
    [HANDLERS.NEXT_STEP_BUDGETS]: 'next_step',
    [HANDLERS.DELETE_SERVICE]: 'showDeleteService'
  },

  data: () => ({
    step: 1,
    menu: false,
    totalServices: 0,
    form: true,
    formServices: true,
    search: '',
    required,
    email,
    dialog: false,
    showCollapse: 0,
    service: {
      id: null,
      description: null,
      price: null
    },
    defaultService: {
      id: null,
      description: null,
      price: null
    },
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Telefone', value: 'phone' },
      { text: 'CPF', value: 'cpf' },
      { text: 'Data do Orçamento', value: 'date' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    servicesHeaders: [
      { text: 'Descrição', value: 'description' },
      { text: 'Preço', value: 'price' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    editedIndex: -1,
    editedService: -1,
    editedItem: {
      id: null,
      name: null,
      date: null,
      email: null,
      phone: null,
      services: []
    },
    defaultItem: {
      id: null,
      name: null,
      date: null,
      email: null,
      phone: null,
      services: []
    },
    options: {
      locale: 'pt-BR',
      suffix: '',
      length: 11,
      precision: 2
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Criação de Orçamento' : 'Edição de Orçamento';
    },

    items() {
      return this.$store.getters['budgets/get'];
    },

    serviceButtonTitle() {
      return this.editedService === -1 ? 'Adicionar' : 'Atualizar';
    }
  },

  created() {
    this.$store.dispatch('budgets/get');
  },

  methods: {
    formatValue,
    formatDate,

    addBudget() {
      this.dialog = true;
      this.totalServices = 0;
      this.step = 1;
    },

    editItem(item) {
      this.totalServices = 0;
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirmMessage(`Deseja realmente excluir`, `${item.name}`, item, HANDLERS.DELETE_BUDGETS);
    },

    showDelete(item) {
      this.$store.dispatch('budgets/delete', item);
    },

    close() {
      this.dialog = false;
      this.step = 1;

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.reset();

        this.service = Object.assign({}, this.defaultService);
        this.editedService = -1;
        this.$refs.formServices.reset();
      });

      this.$store.dispatch('budgets/get');
    },

    save() {
      if (!this.$refs.form.validate(true)) return;

      if (this.editedIndex > -1) {
        this.$store.dispatch('budgets/update', this.editedItem);
      } else {
        this.$store.dispatch('budgets/create', this.editedItem);
      }
    },

    next_step(item) {
      this.editedItem.id = item.id;
      this.step = 2;
    },

    editService(item) {
      this.editedService = this.editedItem.services.indexOf(item);
      this.service = Object.assign({}, item);
    },

    cancelService() {
      this.editedService = -1;
      this.service = Object.assign({}, this.defaultService);
      this.$refs.formServices.reset();
    },

    deleteService(item) {
      confirmMessage(`Deseja realmente excluir`, `${item.description}`, item, HANDLERS.DELETE_SERVICE);
    },

    showDeleteService(item) {
      this.$store.dispatch('budgets/deleteService', item);
    },

    addService() {
      if (!this.$refs.formServices.validate(true)) return;

      let params = { budget: { budget_id: this.editedItem.id }, service: this.service };

      if (this.editedService > -1) {
        this.$store.dispatch('budgets/updateService', params);
      } else {
        this.$store.dispatch('budgets/createService', params);
      }

      this.$refs.formServices.reset();
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },

    editedItem: {
      deep: true,
      handler(newValue) {
        if (newValue.services.length) {
          let prices = newValue.services.map(item => parseFloat(item.price));
          this.totalServices = prices.reduce(function(a, b) {
            return a + b;
          }, 0);
        }
      }
    }
  }
};
</script>
