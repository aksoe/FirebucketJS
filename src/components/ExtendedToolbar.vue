<template>
  <div id="extendedToolbar">
    <md-whiteframe md-elevation="4">
      <md-toolbar class="md-primary md-large">
        <div class="md-toolbar-container">
          <md-button class="md-icon-button" v-on:click.native="goToHome">
            <md-icon>arrow_back</md-icon>
          </md-button>
          <span class="md-title">{{toolbarTitle}}</span>
          <span style="flex: 1;"></span>
        </div>

        <div class="md-toolbar-container">
          <md-input-container>
              <label>{{inputLabel}}</label>
              <md-input v-model="watchedToolbarInputValue"></md-input>
          </md-input-container>
        </div>
      </md-toolbar>
    </md-whiteframe>
  </div>
</template>

<script>
export default {
  name: 'extendedToolbar',
  props: {
    toolbarTitle: {
      type: String,
      required: true
    },
    inputLabel: {
      type: String,
      required: true
    },
    inputValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      watchedToolbarInputValue: ''
    }
  },
  watch: {
    'watchedToolbarInputValue': function() {
      this.$emit('update:inputValue', this.watchedToolbarInputValue);
    }
  },
  created: function() {
    this.watchedToolbarInputValue = this.inputValue;
  },
  methods: {
    goToHome: function() {
      this.$router.push({
        name: 'home',
        params: {
          uid: this.$route.params.uid
        }
      });
    }
  }
}
</script>

<style scoped src="../styles/toolbar.css"></style>
