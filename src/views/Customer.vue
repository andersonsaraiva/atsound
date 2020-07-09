<template>
  <v-container>
    <appBreadcrumbs />

    <v-data-table :headers="headers" :items="customers" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" small>Cadastrar</v-btn>
            </template>

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
                      <v-text-field v-model="editedItem.name" label="Nome" type="text" required :rules="[required]" />
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="py-0">
                      <v-text-field v-model="editedItem.email" label="Email" type="text" required :rules="[required]" />
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="py-0">
                      <v-text-field v-model="editedItem.phone" label="Telefone" type="text" required :rules="[required]" />
                    </v-col>
                    <v-col cols="12" sm="6" md="6" class="py-0">
                      <v-text-field v-model="editedItem.cpf" label="CPF" required type="text" :rules="[required]" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>

              <v-card-actions class="pa-3">
                <v-spacer></v-spacer>
                <v-btn color="grey darken-3" dark @click="save" small>Salvar</v-btn>
                <v-btn color="red" dark @click="close" small>Cancelar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import customers from '@/api/customer.json';
import { required } from '@/helpers/validations';

export default {
  components: {
    appBreadcrumbs: () => import('@/components/breadcrumbs/app-breadcrumbs')
  },

  data: () => ({
    required,
    dialog: false,
    headers: [
      { text: 'Nome', align: 'start', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Telefone', value: 'phone' },
      { text: 'CPF', value: 'cpf' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'right' }
    ],
    customers: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      email: '',
      phone: '',
      cpf: ''
    },
    defaultItem: {
      name: '',
      email: '',
      phone: '',
      cpf: ''
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
      this.customers = customers;
    },

    editItem(item) {
      this.editedIndex = this.customers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.customers.indexOf(item);

      confirm('Are you sure you want to delete this item?') && this.customers.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (!this.$refs.form.validate(true)) return;

      if (this.editedIndex > -1) {
        Object.assign(this.customers[this.editedIndex], this.editedItem);
      } else {
        this.customers.push(this.editedItem);
      }

      this.close();
    }
  }
};
</script>
