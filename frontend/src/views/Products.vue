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
            <v-btn color="primary" @click="addProduct">Cadastrar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-data-table :search="search" :headers="headers" :items="items" class="elevation-1" dense>
      <template v-slot:item.quantity="{ item }">
        <span :class="['font-weight-bold', getColor(item.quantity)]">{{ item.quantity }}</span>
      </template>

      <template v-slot:item.purchase_value="{ item }">
        {{ formatValue(item.purchase_value) }}
      </template>

      <template v-slot:item.stock_value="{ item }">
        {{ formatValue(item.purchase_value * item.quantity) }}
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
                  dense
                  outlined
                  required
                  :rules="[required]"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6" class="py-0">
                <v-text-field
                  v-model="editedItem.brand"
                  label="Marca"
                  type="text"
                  dense
                  outlined
                  required
                  :rules="[required]"
                />
              </v-col>
              <v-col cols="12" sm="12" md="12" class="py-0">
                <v-textarea v-model="editedItem.description" label="Descrição do Produto" dense outlined rows="3" />
              </v-col>
              <v-col cols="12" sm="2" md="2" class="py-0">
                <v-text-field
                  v-model="editedItem.quantity"
                  label="Quantidade"
                  type="number"
                  min="0"
                  dense
                  outlined
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
                      v-model="dateFormated"
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
                  <v-date-picker
                    v-model="editedItem.purchase_date"
                    @input="menu = false"
                    locale="pt-br"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="2" md="2" class="py-0">
                <vuetify-money
                  v-model="editedItem.purchase_value"
                  label="Valor de Compra"
                  dense
                  outlined
                  required
                  :rules="[required]"
                  :valueWhenIsEmpty="''"
                  :options="options"
                  background-color="transparent"
                />
              </v-col>
              <v-col cols="12" sm="5" md="5" class="py-0">
                <v-autocomplete
                  v-model="editedItem.provider_id"
                  label="Fornecedor"
                  dense
                  outlined
                  item-text="name"
                  item-value="id"
                  :items="providers"
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
import { required } from '@/helpers/validations';
import { confirmMessage } from '@/helpers/messages';
import { formatValue, formatDate, formatDateForm, formatDateComputed } from '@/helpers/utils';
import * as HANDLERS from '@/helpers/handlers';

export default {
  components: {
    appBreadcrumbs: () => import('@/components/breadcrumbs/app-breadcrumbs')
  },

  events: {
    [HANDLERS.DELETE_PRODUCT]: 'showDelete',
    [HANDLERS.CLOSE_PRODUCT]: 'close'
  },

  data: () => ({
    menu: false,
    form: true,
    search: '',
    required,
    dialog: false,
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Marca', value: 'brand' },
      { text: 'Quantidade', value: 'quantity' },
      { text: 'Valor de Compra', value: 'purchase_value' },
      { text: 'Valor em Estoque', value: 'stock_value' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    editedIndex: -1,
    editedItem: {
      id: null,
      name: null,
      brand: null,
      description: null,
      quantity: null,
      purchase_date: null,
      purchase_value: null,
      provider_id: null
    },
    defaultItem: {
      id: null,
      name: null,
      brand: null,
      description: null,
      quantity: null,
      purchase_date: null,
      purchase_value: null,
      provider_id: null
    },
    options: {
      locale: 'pt-BR',
      suffix: '',
      length: 11,
      precision: 2
    }
  }),

  created() {
    this.$store.dispatch('products/get');
    this.$store.dispatch('providers/get');
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Cadastro' : 'Edição';
    },

    items() {
      return this.$store.getters['products/get'];
    },

    providers() {
      return this.$store.getters['providers/get'];
    },

    dateFormated: {
      get: function() {
        return this.getSetDate();
      },
      set: function() {
        return this.getSetDate();
      }
    }
  },

  methods: {
    formatValue,

    getSetDate() {
      if (this.editedItem.purchase_date) {
        return formatDateComputed(this.editedItem.purchase_date);
      } else {
        return null;
      }
    },

    addProduct() {
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);

      item.purchase_date = formatDateForm(item.purchase_date);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirmMessage(`Deseja realmente excluir`, `${item.name}`, item, HANDLERS.DELETE_PRODUCT);
    },

    showDelete(item) {
      this.$store.dispatch('products/delete', item);
    },

    close() {
      this.dialog = false;

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.reset();
      });

      this.$store.dispatch('products/get');
    },

    save() {
      if (!this.$refs.form.validate(true)) return;

      if (this.editedIndex > -1) {
        this.$store.dispatch('products/update', this.editedItem);
      } else {
        this.$store.dispatch('products/create', this.editedItem);
      }
    },

    getColor(item) {
      if (item == 1) return 'red--text';
      else if (item == 2) return 'orange--text';
      else return 'green--text';
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>
