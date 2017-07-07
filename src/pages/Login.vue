<template>
  <div id="login">
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialogError">
      <md-dialog-title>{{wording.dialogErrorTitle}}</md-dialog-title>

      <md-dialog-content>{{lastErrorMessage}}</md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeErrorDialog('dialogError')">OK</md-button>
      </md-dialog-actions>
    </md-dialog>

    <img src="../assets/logo.png" alt="logo" style="width:150px;height:150px;"/>
      <md-whiteframe md-elevation="2" id="login-form">
        <span class="md-title text-primary">{{wording.login}}</span>
        <md-input-container>
            <label>{{wording.email}}</label>
            <md-input v-model="userModel.email"></md-input>
        </md-input-container>
        <md-input-container>
          <label>{{wording.password}}</label>
          <md-input type="password" v-model="userModel.password"></md-input>
        </md-input-container>

        <md-button type="submit" class="md-raised md-primary" v-on:click.native="loginUser">{{wording.signIn}}</md-button>
        <br />
        <md-button class="md-primary" v-on:click.native="goToRegister">{{wording.createAccount}}</md-button>
      </md-whiteframe>

      <md-snackbar md-position="bottom left" ref="snackbarregistrationunavailable">{{wording.errors.registrationUnavailable}}</md-snackbar>
      <md-snackbar md-position="bottom left" ref="snackbarinvalidemail">{{wording.errors.invalidEmail}}</md-snackbar>
      <md-snackbar md-position="bottom left" ref="snackbarinvalidpassword">{{wording.errors.invalidPassword}}</md-snackbar>
  </div>
</template>

<script>
import copy from '../i18n/copyLogin';
import userModule from '../modules/user';

export default {
  name: 'login',
  methods: {
    openErrorDialog: function(ref) {
      this.$refs[ref].open();
    },
    closeErrorDialog: function(ref) {
      this.$refs[ref].close();
    },
    loginUser: function () {

      if (!this.userModel.email) {
        this.showInvalidEmail();
      } else if (!this.userModel.password) {
        this.showInvalidPassword();
      } else {
        userModule.methods.login().then(userResult => {
          this.$router.push({
            name: 'home',
            params: {
              uid: userResult.uid
            }
          });
        }).catch(error => {
          this.lastErrorMessage = error.message;
          this.openErrorDialog('dialogError');
        });
      }
    },
    goToRegister: function() {
      // this.$router.push({
      //   name: 'register'
      // });
      this.showRegistrationUnavailable();
    },
    showInvalidEmail: function() {
      this.$refs.snackbarinvalidemail.open();
    },
    showInvalidPassword: function() {
      this.$refs.snackbarinvalidpassword.open();
    },
    showRegistrationUnavailable: function() {
      this.$refs.snackbarregistrationunavailable.open();
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

<style scoped src="../styles/login.css"></style>
