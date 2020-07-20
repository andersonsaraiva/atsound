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
                <v-text-field v-model="editedItem.name" label="Nome" type="text" dense outlined required :rules="[required]" />
              </v-col>
              <v-col cols="12" sm="6" md="6" class="py-0">
                <v-text-field v-model="editedItem.email" label="Email" type="text" dense outlined required :rules="[required, email]" />
              </v-col>
              <v-col cols="12" sm="6" md="6" class="py-0">
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
              <v-col cols="12" sm="6" md="6" class="py-0">
                <v-text-field v-model="editedItem.url" label="Site" type="text" dense outlined />
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
import items from '@/api/providers.json';
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
    search: '',
    required,
    email,
    dialog: false,
    headers: [
      { text: 'Nome', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Telefone', value: 'phone' },
      { text: 'Site', value: 'url' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      email: '',
      phone: '',
      url: ''
    },
    defaultItem: {
      name: '',
      email: '',
      phone: '',
      url: ''
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
    }
  }
};
</script>