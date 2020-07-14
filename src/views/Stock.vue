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
            <v-btn color="primary" @click="dialog = true">Cadastrar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-data-table :search="search" :headers="headers" :items="items" class="elevation-1" dense>
      <template v-slot:item.quantity="{ item }">
        <span :class="['font-weight-bold', getColor(item.quantity)]">{{ item.quantity }}</span>
      </template>

      <template v-slot:item.purchaseValue="{ item }">
        {{ formatValue(item.purchaseValue) }}
      </template>

      <template v-slot:item.stockValue="{ item }">
        {{ formatValue(item.purchaseValue * item.quantity) }}
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
                <v-text-field type="date" v-model="editedItem.purchaseDate" label="Data da Compra" dense outlined />
              </v-col>
              <v-col cols="12" sm="2" md="2" class="py-0">
                <vuetify-money
                  v-model="editedItem.purchaseValue"
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
                  v-model="editedItem.providerId"
                  label="Fornecedor"
                  dense
                  outlined
                  :items="providers"
                  item-text="name"
                  item-value="id"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="save" small>Salvar</v-btn>
          <v-btn @click="close" small>Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import items from '@/api/stock.json';
import providers from '@/api/providers.json';
import { required } from '@/helpers/validations';
import { showMessage, confirmMessage } from '@/helpers/messages';
import { formatValue } from '@/helpers/utils';
import * as HANDLERS from '@/helpers/handlers';

export default {
  components: {
    appBreadcrumbs: () => import('@/components/breadcrumbs/app-breadcrumbs')
  },

  events: {
    [HANDLERS.DELETE_STOCK]: 'showDelete'
  },

  data: () => ({
    providers,
    search: '',
    required,
    dialog: false,
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Marca', value: 'brand' },
      { text: 'Quantidade', value: 'quantity' },
      { text: 'Valor de Compra', value: 'purchaseValue' },
      { text: 'Valor em Estoque', value: 'stockValue' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      name: null,
      brand: null,
      description: null,
      quantity: null,
      purchaseDate: null,
      purchaseValue: null,
      providerId: null
    },
    defaultItem: {
      id: null,
      name: null,
      brand: null,
      description: null,
      quantity: null,
      purchaseDate: null,
      purchaseValue: null,
      providerId: null
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
    formatValue,

    initialize() {
      this.items = items;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirmMessage(`Deseja realmente excluir`, `${item.name}`, item, HANDLERS.DELETE_STOCK);
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

      showMessage('success', 'Operação realizada com sucesso!');

      this.close();
    },

    getColor(item) {
      if (item == 1) return 'red--text';
      else if (item == 2) return 'orange--text';
      else return 'green--text';
    }
  }
};
</script>
