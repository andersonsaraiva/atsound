<template>
  <v-container>
    <appBreadcrumbs />

    <v-row class="fill-height">
      <v-col>
        <v-sheet class="d-flex align-center mb-4">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Hoje
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next" class="mr-2">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>

          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Dia</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mês</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>Últimos 4 dias</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn color="primary" @click="handleSave" class="ml-2">Cadastrar</v-btn>
        </v-sheet>

        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>

          <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
            <v-card min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dense>
                <v-icon small class="mr-2" @click="handleEdit(selectedEvent)">mdi-pencil</v-icon>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon small class="mr-2" @click>mdi-heart</v-icon>
                <v-icon small @click>mdi-dots-vertical</v-icon>
              </v-toolbar>

              <v-card-text>
                <span v-html="selectedEvent.details"></span>
                {{ selectedEvent.description }}
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="secondary" @click="selectedOpen = false" small>
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>

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
                  v-model="scheduleItem.name"
                  label="Nome"
                  type="text"
                  required
                  :rules="[required]"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" sm="6" md="6" class="py-0">
                <v-text-field
                  v-model="scheduleItem.color"
                  label="Color"
                  type="text"
                  :rules="[required]"
                  outlined
                  dense
                />
              </v-col>

              <v-col cols="12" sm="6" md="6" class="py-0">
                <v-menu
                  ref="startMenu"
                  v-model="startMenu"
                  :close-on-content-click="false"
                  :return-value.sync="scheduleItem.start"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="scheduleItem.start"
                      label="Data de inicio"
                      prepend-inner-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      outlined
                    />
                  </template>

                  <v-date-picker v-model="scheduleItem.start" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn small color="primary" @click="startMenu = false">Cancel</v-btn>
                    <v-btn small color="primary" @click="$refs.startMenu.save(scheduleItem.start)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="6" class="py-0">
                <v-menu
                  ref="endMenu"
                  v-model="endMenu"
                  :close-on-content-click="false"
                  :return-value.sync="scheduleItem.end"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="scheduleItem.end"
                      label="Data final"
                      prepend-inner-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    />
                  </template>

                  <v-date-picker v-model="scheduleItem.end" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn small color="primary" @click="endMenu = false">Cancel</v-btn>
                    <v-btn small color="primary" @click="$refs.endMenu.save(scheduleItem.end)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" class="py-0">
                <v-textarea
                  v-model="scheduleItem.description"
                  label="Descrição"
                  dense
                  outlined
                  rows="3"
                  required
                  :rules="[required]"
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
import { required } from '@/helpers/validations';

export default {
  components: {
    appBreadcrumbs: () => import('@/components/breadcrumbs/app-breadcrumbs')
  },

  data: () => ({
    required,
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Mês',
      week: 'Semana',
      day: 'Dia',
      '4day': 'Últimos 4 dias'
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    dialog: false,
    startMenu: false,
    endMenu: false,
    editedIndex: -1,
    scheduleItem: {
      name: '',
      start: '',
      end: '',
      description: '',
      color: '',
      timed: true
    },
    events: [
      {
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        name: 'Troca de rodas',
        start: new Date('2020-07-09T13:00:00.000Z'),
        end: new Date('2020-07-09T14:45:00.000Z'),
        description: 'Trocar rodas aro 20", cliente XXXX',
        color: 'blue',
        timed: true
      },
      {
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        name: 'Instalação de som',
        start: new Date('2020-07-17T14:00:00.000Z'),
        end: new Date('2020-07-17T16:45:00.000Z'),
        description: 'Instalar aparelho de som do cliente XXXX',
        color: 'indigo',
        timed: true
      }
    ]
  }),

  mounted() {
    this.$refs.calendar.checkChange();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Cadastro' : 'Edição';
    }
  },

  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },

    getEventColor(event) {
      return event.color;
    },

    setToday() {
      this.type = 'day';
      this.focus = '';
    },

    prev() {
      this.$refs.calendar.prev();
    },

    next() {
      this.$refs.calendar.next();
    },

    save() {
      this.scheduleItem.start = new Date(`${this.scheduleItem.start}T11:00:00.000Z`);
      this.scheduleItem.end = new Date(`${this.scheduleItem.end}T11:00:00.000Z`);

      if (this.editedIndex === -1) {
        this.events.push(this.scheduleItem);
      } else {
        const events = this.events.filter(item => item.id !== this.editedIndex);

        this.events = [...events, this.scheduleItem];
      }

      this.scheduleItem = {
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        name: '',
        start: '',
        end: '',
        description: '',
        color: '',
        timed: true
      };

      this.dialog = false;
    },

    handleSave() {
      this.editedIndex = -1;

      this.scheduleItem = {
        id: Math.random()
          .toString(36)
          .substr(2, 9),
        name: '',
        start: '',
        end: '',
        description: '',
        color: '',
        timed: true
      };

      this.dialog = true;
    },

    handleEdit(selectedEvent) {
      this.editedIndex = selectedEvent.id;

      const test = JSON.parse(JSON.stringify(selectedEvent));

      test.start = '2020-07-17';
      test.end = '2020-07-17';

      this.scheduleItem = test;

      this.dialog = true;
    },

    close() {
      this.dialog = false;
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },

    updateRange({ start, end }) {
      // console.log(start, end);
      return;

      // const events = [];

      // const min = new Date(`${start.date}T00:00:00`);
      // const max = new Date(`${end.date}T23:59:59`);
      // const days = (max.getTime() - min.getTime()) / 86400000;
      // const eventCount = this.rnd(days, days + 20);
      //
      // for (let i = 0; i < eventCount; i++) {
      //   const allDay = this.rnd(0, 3) === 0;
      //   const firstTimestamp = this.rnd(min.getTime(), max.getTime());
      //   const first = new Date(firstTimestamp - (firstTimestamp % 900000));
      //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
      //   const second = new Date(first.getTime() + secondTimestamp);
      //
      //   events.push({
      //     name: this.names[this.rnd(0, this.names.length - 1)],
      //     start: first,
      //     end: second,
      //     color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     timed: !allDay
      //   });
      // }
      //
      // this.events = events;
    }

    // rnd(a, b) {
    //   return Math.floor((b - a + 1) * Math.random()) + a;
    // }
  }
};
</script>
