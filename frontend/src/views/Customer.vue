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
                  :rules="[required]"
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
                />
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="editedItem.date_of_birth"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editedItem.date_of_birth"
                      label="Data de nascimento"
                      prepend-inner-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    />
                  </template>

                  <v-date-picker v-model="editedItem.date_of_birth" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn small color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn small color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-select
                  v-model="editedItem.gender"
                  :items="['Masculino', 'Feminino']"
                  label="Sexo"
                  outlined
                  dense
                ></v-select>
              </v-col>

              <v-col cols="12" sm="3" md="3" class="py-0">
                <v-text-field
                  v-model="editedItem.cpf"
                  label="CPF"
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
                  v-model="editedItem.address.cep"
                  label="CEP"
                  required
                  type="text"
                  :rules="[required]"
                  outlined
                  dense
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

        <v-form ref="formCars" lazy-validation v-model="formCars">
          <v-container fluid>
            <v-row>
              <v-col>
                <v-expansion-panels focusable v-model="showCollapse" class="column-group">
                  <v-expansion-panel>
                    <v-expansion-panel-header>Serviços</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="12" sm="3" md="3" class="py-0">
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

                        <v-col cols="12" sm="3" md="3" class="py-0">
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

                        <v-col cols="12" sm="3" md="3" class="py-0">
                          <v-text-field
                            v-model="car.year"
                            label="Ano"
                            type="text"
                            dense
                            outlined
                            required
                            :rules="[required]"
                          />
                        </v-col>

                        <v-col cols="12" sm="3" md="3" class="py-0">
                          <v-btn color="primary" @click="addCar" :disabled="!formCars">
                            <v-icon left>add</v-icon>
                            Adicionar
                          </v-btn>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col>
                          <v-data-table
                            :headers="carsHeaders"
                            :items="editedItem.cars"
                            hide-default-footer
                            dense
                            class="elevation-1"
                          >
                            <template v-slot:item.actions="{ item }">
                              <v-icon small class="mr-2" @click="editCar(item)" color="green">
                                mdi-pencil
                              </v-icon>

                              <v-icon small @click="deleteCar(item)" color="red">
                                mdi-delete
                              </v-icon>
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
import items from '@/api/customer.json';
import { required } from '@/helpers/validations';
import { confirmMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';

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
    formCars: true,
    showCollapse: 0,
    dialog: false,
    menu: false,
    date: new Date().toISOString().substr(0, 10),
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
      { text: '', value: 'actions', sortable: false, align: 'right' }
    ],
    items: [],
    car: {
      model: '',
      color: '',
      year: '',
      license_plate: ''
    },
    editedCar: -1,
    editedIndex: -1,
    editedItem: {
      name: '',
      email: '',
      phone: '',
      cpf: '',
      gender: '',
      date_of_birth: '',
      address: {
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        city: '',
        state: ''
      },
      cars: [
        {
          model: '',
          color: '',
          year: '',
          license_plate: ''
        }
      ]
    },
    defaultItem: {
      name: '',
      email: '',
      phone: '',
      cpf: '',
      gender: '',
      date_of_birth: '',
      address: {
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        city: '',
        state: ''
      },
      cars: [
        {
          model: '',
          color: '',
          year: '',
          license_plate: ''
        }
      ]
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

    addCar() {
      if (!this.$refs.formCars.validate(true)) return;

      if (this.editedCar > -1) {
        Object.assign(this.editedItem.cars[this.editedCar], this.car);
      } else {
        this.editedItem.cars.push(JSON.parse(JSON.stringify(this.car)));
      }

      this.$refs.formCars.reset();
    },

    editCar(item) {
      this.editedCar = this.editedItem.cars.indexOf(item);
      this.car = Object.assign({}, item);
    },

    deleteCar(item) {}
  }
};
</script>