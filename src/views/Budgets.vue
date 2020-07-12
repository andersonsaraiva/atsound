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

    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title class="pa-3">
          <span class="headline">{{ formTitle }}</span>
          <v-spacer></v-spacer>
          <v-icon @click="close">close</v-icon>
        </v-card-title>

        <v-divider horizontal></v-divider>

        <v-form ref="form" lazy-validation v-model="form">
          <v-container fluid>
            <v-row class="px-1">
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
              <v-col cols="12" sm="5" md="5" class="py-0">
                <v-text-field v-model="editedItem.email" label="Email" type="text" dense outlined :rules="[email]" />
              </v-col>
              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field v-model="editedItem.cpf" label="CPF" dense outlined type="text" v-mask="'###.###.##-##'" />
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-form ref="formServices" lazy-validation v-model="formServices">
          <v-container fluid>
            <v-row>
              <v-col>
                <v-expansion-panels focusable v-model="showCollapse" class="column-group">
                  <v-expansion-panel>
                    <v-expansion-panel-header>Serviços</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="12" sm="8" md="8" class="py-0">
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
                        <v-col cols="12" sm="2" md="2" class="py-0">
                          <v-btn color="primary" @click="addService" :disabled="!formServices">
                            <v-icon left>add</v-icon>
                            Adicionar
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
                              <v-icon small class="mr-2" @click="editService(item)" color="green">
                                mdi-pencil
                              </v-icon>
                              <v-icon small @click="deleteService(item)" color="red">
                                mdi-delete
                              </v-icon>
                            </template>
                            <template v-slot:body.append>
                              <tr class="">
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
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
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
import items from '@/api/budgets.json';
import { required, email } from '@/helpers/validations';
import { showMessage, confirmMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';

export default {
  components: {
    appBreadcrumbs: () => import('@/components/breadcrumbs/app-breadcrumbs')
  },

  events: {
    [HANDLERS.DELETE_PROVIDER]: 'showDelete'
  },

  data: () => ({
    totalServices: 0,
    form: true,
    formServices: true,
    search: '',
    required,
    email,
    dialog: false,
    showCollapse: 0,
    service: {
      description: null,
      price: null
    },
    headers: [
      { text: 'Email', value: 'email' },
      { text: 'Telefone', value: 'phone' },
      { text: 'CPF', value: 'cpf' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    servicesHeaders: [
      { text: 'Descrição', value: 'description' },
      { text: 'Preço', value: 'price' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    items: [],
    editedIndex: -1,
    editedService: -1,
    editedItem: {
      id: null,
      email: null,
      phone: null,
      services: []
    },
    defaultItem: {
      id: null,
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
    formatValue(value) {
      let number = parseFloat(value)
        .toFixed(2)
        .split('.');
      number[0] = number[0].split(/(?=(?:...)*$)/).join('.');

      return `R$ ${number.join(',')}`;
    },

    initialize() {
      this.items = items;
    },

    addBudget() {
      this.dialog = true;
      this.totalServices = 0;
    },

    editItem(item) {
      this.totalServices = 0;
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirmMessage(`Deseja realmente excluir`, `${item.name}`, item, HANDLERS.DELETE_PROVIDER);
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
        this.$refs.formServices.reset();
      });
    },

    save() {
      if (!this.$refs.form.validate(true)) return;

      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }

      showMessage('success', 'Operação realizada com sucesso!');

      this.close();
    },

    editService(item) {
      this.editedService = this.editedItem.services.indexOf(item);
      this.service = Object.assign({}, item);
    },

    deleteService(item) {},

    addService() {
      if (!this.$refs.formServices.validate(true)) return;

      if (this.editedService > -1) {
        Object.assign(this.editedItem.services[this.editedService], this.service);
      } else {
        this.editedItem.services.push(JSON.parse(JSON.stringify(this.service)));
      }

      this.$refs.formServices.reset();
    }
  },

  watch: {
    vActions(newValue) {
      deep: true, (this.actions = newValue);
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
