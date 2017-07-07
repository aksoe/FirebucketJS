import firebase from '../api/firebase';

const model = {
  email: '',
  password: ''
}

export default {
  model,
  methods: {
    login: function() {
      return firebase.methods.signIn(model.email, model.password);
    },
    register: function() {
      return firebase.methods.signIn(model.email, model.password);
    }
  }
}
