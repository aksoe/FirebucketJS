<template>
  <div>
  <md-input-container class="editor-date-field" style="display:none;">
    <label v-if="label">{{ label }}</label>
    <md-input type="text" v-model="time"></md-input>
  </md-input-container>
  <md-list-item v-on:click.native="openDatePicker()">
    <md-icon>today</md-icon>
    <div class="md-list-text-container">
      <span>{{ label }}</span>
      <span>{{ time }}</span>
    </div>
  </md-list-item>
</div>
</template>

<script>
import moment from 'moment-timezone'
import Anytime from 'anytime';

export default {
  props: {
    label: String,
    value: {
      type: Object,
      validator: function (value) { return value && value.iso; },
    },
    format: {
      type: String,
      default: function () { return 'YYYY-MM-DD HH:mm:ss z'; },
    },
  },
  data() {
    return {
      time: moment(new Date(this.value ? this.value.iso : Date.now())).format(this.format)
    };
  },
  mounted() {
    this.picker = new Anytime({
      moment,
      input: this.$el.querySelector('input'),
      offset: 0,
      format: this.format,
      initialValue: new Date(this.value ? this.value.iso : Date.now()),
      minYear: 2009,
      maxYear: 2020,
      timezone: 'Europe/London',
    });
    this.picker.render();
  },
  beforeDestroy() {
    this.picker.destroy();
  },
  watch: {
    time() {
      this.$emit('input', this.time);
    },
  },
  methods: {
    openDatePicker: function() {
      this.picker.show();
    }
  }
};
</script>

<style>
.editor-date-field .anytime-picker {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
}
.editor-date-field .anytime-picker--is-visible {
  display: block;
}
.editor-date-field .anytime-picker__dates {
  width: 200px;
}
.editor-date-field .anytime-picker__dates > * {
  box-sizing: border-box;
  width: 14.28%;
  display: inline-block;
}

.editor-date-field .anytime-picker {
  display: none;
  position: absolute;
  width: 240px;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 3px;
  border-radius: 0.3em;
  box-shadow: 0 0 10px -2px rgba(0,0,0,0.8);
  z-index: 100;
  color: #333;
  line-height: 1;
}
.editor-date-field .anytime-picker--is-visible {
  display: block;
}
.editor-date-field .anytime-picker__dropdown {
  height: 24px;
  display: inline-block;
  width: auto;
  margin: 0 3px;
}
.editor-date-field .anytime-picker__dates .anytime-picker__day-name {
  font-size: 11px;
  text-align: center;
  padding-bottom: 3px;
}
.editor-date-field .anytime-picker__dates {
  margin: 3px 0;
  width: auto;
}
.editor-date-field .anytime-picker__dates span,
.editor-date-field .anytime-picker__dates .anytime-picker__date {
  display: inline-block;
  width: 14.285714285714286%;
  padding: 8px 3px;
  margin: 0;
}
.editor-date-field .anytime-picker__date {
  position: relative;
  border: 0;
  background: #ddd;
  color: #333;
  text-align: center;
  box-shadow: inset 0 0 0 1px #fff;
  transition-property: color, background-color;
  transition-duration: 0.4s;
  transition-timing-function: ease;
  cursor: pointer;
}
.editor-date-field .anytime-picker__date--current {
  background: #FF9C42;
  color: white;
}
.editor-date-field .anytime-picker__date--selected {
  background: #0CAFD4;
  color: white;
}
.editor-date-field .anytime-picker__date:hover,
.editor-date-field .anytime-picker__date:focus {
  outline: 0;
  transition-duration: 0.1s;
  background: #39BCDC;
  color: #fff;
}
.editor-date-field .anytime-picker__header,
.editor-date-field .anytime-picker__footer {
  padding: 5px;
  text-align: center;
}
.editor-date-field .anytime-picker__header .anytime-picker__dropdown,
.editor-date-field .anytime-picker__footer .anytime-picker__dropdown,
.editor-date-field .anytime-picker__header .anytime-picker__button,
.editor-date-field .anytime-picker__footer .anytime-picker__button {
  margin: 3px 2px;
  padding: 8px 14px;
  vertical-align: middle;
}
.editor-date-field .anytime-picker__footer {
  background-color: #ddd;
  padding: 0;
}
.editor-date-field .anytime-picker__footer .anytime-picker__button {
  line-height: 1em;
  font-size: 18px;
  width: 100%;
  padding: 14px;
  margin: 0;
  border: none;
}
.editor-date-field .anytime-picker__time {
  padding: 10px 0;
  text-align: center;
}
.editor-date-field .anytime-picker__time .anytime-picker__dropdown {
  width: 30%;
}
.editor-date-field .anytime-picker__button {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  overflow: visible;
  font-family: inherit;
  font-weight: normal;
  line-height: 0.4;
  padding: 6px 7px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 0;
  color: #333;
  border: 1px solid #c6c6c6;
  background-color: #ddd;
  min-width: 25px;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
}
.editor-date-field .anytime-picker__button:focus,
.editor-date-field .anytime-picker__button:hover {
  text-decoration: none;
  outline: 0;
  transition-duration: 0.1s;
  color: #333;
  border-color: #a5a5a5;
  background-color: #bbb;
}
.editor-date-field .anytime-picker__button:active {
  border-color: #8f8f8f;
  background-color: #a5a5a5;
}
.editor-date-field .anytime-picker__button.anytime-picker__button--clear {
  display: none;
}
</style>
