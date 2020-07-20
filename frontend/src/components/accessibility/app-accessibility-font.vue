<template>
  <div class="change-fontSize">
    <v-btn @click="minusFont()" icon id="minusFont">
      <v-icon class="mr-1">fas fa-search-minus</v-icon>
    </v-btn>

    <v-btn @click="plusFont()" icon id="plusFont">
      <v-icon class="mr-1">fas fa-search-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    listTags: ['html', 'li', 'div', 'span', 'td', 'h1', 'h2', 'h3', 'h4', 'h5', 'a', 'label', 'p']
  }),

  methods: {
    setFontSize(el, isOperaor, minFontSize) {
      let fontSize = parseInt(window.getComputedStyle(el).fontSize);
      let setFontSize = isOperaor ? `${fontSize + 1}px` : `${fontSize - 1}px`;
      let _minFontSize = minFontSize ? minFontSize : 8;

      if (fontSize > _minFontSize && !isOperaor) {
        el.style.fontSize = setFontSize;
      } else if (fontSize > _minFontSize - 1 && isOperaor) {
        el.style.fontSize = setFontSize;
      }
    },

    changeFontSize(operator) {
      let isOperaor = operator == 'plus' ? true : false;

      for (let font in this.listTags) {
        let tags = document.querySelectorAll(this.listTags[font]);
        if (tags) {
          let fontSize = '';

          if (tags.length == 1) {
            this.setFontSize(tags[0], isOperaor, 8);
          } else {
            for (let tag in tags) {
              if (tags[tag].tagName) {
                this.setFontSize(tags[tag], isOperaor, 8);
              }
            }
          }
        }
      }
    },

    plusFont() {
      this.changeFontSize('plus');
    },

    minusFont() {
      this.changeFontSize('minus');
    }
  }
};
</script>
