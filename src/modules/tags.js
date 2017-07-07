import firebase from '../api/firebase';

export default {
  methods: {
    getTags: function() {
      var resultArray = [];
      var ref = 'taglist/tags/';
      firebase.methods.getRef(ref).once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            resultArray.push(childData);
          });
      });
      return resultArray;
    }
  }
}
