<template>
  <div id="register">
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialogError">
      <md-dialog-title>{{wording.dialogErrorTitle}}</md-dialog-title>

      <md-dialog-content>{{lastErrorMessage}}</md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeErrorDialog('dialogError')">OK</md-button>
      </md-dialog-actions>
    </md-dialog>
    <img src="../assets/logo.png" alt="logo" style="width:150px;height:150px;"/>
      <md-whiteframe md-elevation="2" id="register-form">
        <span class="md-title text-primary">{{wording.createAccount}}</span>
        <md-input-container>
            <label>{{wording.email}}</label>
            <md-input v-model="userModel.email"></md-input>
        </md-input-container>
        <md-input-container>
          <label>{{wording.password}}</label>
          <md-input type="password" v-model="userModel.password"></md-input>
        </md-input-container>

        <md-button type="submit" class="md-raised md-primary" v-on:click.native="registerUser">{{wording.register}}</md-button>
      </md-whiteframe>
  </div>
</template>

<script>
import copy from '../i18n/copyRegister';
import userModule from '../modules/user';

export default {
  name: 'register',
  methods: {
    openErrorDialog: function(ref) {
      this.$refs[ref].open();
    },
    closeErrorDialog: function(ref) {
      this.$refs[ref].close();
    },
    registerUser: function () {
      userModule.methods.register().then(userResult => {
        console.log(userResult);
        this.$router.push('/home');
      }).catch(error => {
        this.lastErrorMessage = error.message;
        this.openErrorDialog('dialogError');
      });
    }
  },
  data () {
    return {
      wording: copy.en,
      userModel: userModule.model,
      lastErrorMessage: ''
    }
  }
}
</script>

<style scoped src="../styles/register.css"></style>
