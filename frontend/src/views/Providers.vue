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
            <v-btn color="primary" @click="dialog = true" title="Cadastrar um novo Fornecedor">Cadastrar</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-data-table :search="search" :headers="headers" :items="items" class="elevation-1" dense>
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
        <v-card-title class="pa-3">
          <span class="headline">{{ formTitle }}</span>
          <v-spacer></v-spacer>
          <v-icon @click="close" title="Fechar janela">close</v-icon>
        </v-card-title>

        <v-divider horizontal></v-divider>

        <v-form ref="form" lazy-validation>
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
                  v-model="editedItem.email"
                  label="Email"
                  type="text"
                  dense
                  outlined
                  required
                  :rules="[required, email]"
                />
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
import { required, email } from '@/helpers/validations';
import { showMessage, confirmMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';

export default {
  components: {
    appBreadcrumbs: () => import('@/components/breadcrumbs/app-breadcrumbs')
  },

  events: {
    [HANDLERS.DELETE_PROVIDER]: 'showDelete',
    [HANDLERS.CLOSE_PROVIDER]: 'close'
  },

  data: () => ({
    search: '',
    required,
    email,
    dialog: false,
    headers: [
      { text: 'Código', value: 'id' },
      { text: 'Nome', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Telefone', value: 'phone' },
      { text: 'Site', value: 'url' },
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    editedIndex: -1,
    editedItem: {
      id: '',
      name: '',
      email: '',
      phone: '',
      url: ''
    },
    defaultItem: {
      id: '',
      name: '',
      email: '',
      phone: '',
      url: ''
    }
  }),

  created() {
    this.$store.dispatch('providers/get');
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Cadastro' : 'Edição';
    },

    items() {
      return this.$store.getters['providers/get'];
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirmMessage(`Deseja realmente excluir`, `${item.name}`, item, HANDLERS.DELETE_PROVIDER);
    },

    showDelete(item) {
      this.$store.dispatch('providers/delete', item);
    },

    close() {
      this.dialog = false;

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$refs.form.reset();
      });

      this.$store.dispatch('providers/get');
    },

    save() {
      if (!this.$refs.form.validate(true)) return;

      if (this.editedIndex > -1) {
        this.$store.dispatch('providers/update', this.editedItem);
      } else {
        this.$store.dispatch('providers/create', this.editedItem);
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
