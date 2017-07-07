import Firebase from 'firebase'

let config = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL: "DB_URL",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "SENDER_ID"
}

const appInstance = Firebase.initializeApp(config);
const dbInstance = appInstance.database();

export default {
  instances: {
      appInstance,
      dbInstance
  },
  methods: {
    signIn: function(email, password) {
      return appInstance.auth()
      .signInWithEmailAndPassword(email, password);
    },
    register: function(email, password) {
      return appInstance.auth()
      .createUserWithEmailAndPassword(email, password);
    },
    /* Where nodeRef can be concatenated, e.g. 'users/' + userId + '/tasks' */
    getRef: function(nodeRef) {
      return dbInstance.ref(nodeRef);
    }
  }
}
