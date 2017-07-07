import firebase from '../api/firebase';
import dateUtils from '../utils/dateUtils';

const model = {
  id: '',
  title: '',
  priority: {
    id: 1,
    label: 'Normal'
  },
  tag: 'No tag selected',
  deadlineMs: 1490984374709,
  millisDeadline: 1490984374709,
  deadline: 'Fri Mar 31 21:19:34 GMT+03:00 2017'
}

const createDailyBucket = function(pos, date) {
  return {
    index: pos,
    displayDay: dateUtils.methods.getDisplayDay(date),
    displayDate: dateUtils.methods.getDisplayDate(date),
    tasks: []
  };
}

export default {
  model,
  methods: {
    createTask: function(userId, date) {
      var date = dateUtils.methods.getDate(date.time);
      model.deadlineMs = date.getTime();
      model.millisDeadline = date.getTime();
      model.deadline = date.toISOString();

      var ref = 'users/'+userId+'/tasks';
      var key = firebase.methods.getRef(ref).push().key;
      console.log(key);
      model.id = key;
      ref = ref+'/'+key;
      firebase.methods.getRef(ref).set(model);
    },
    deleteTask: function(userId, taskId) {
      var ref = 'users/'+userId+'/tasks/'+taskId;
      firebase.methods.getRef(ref).remove();
    },
    getTasks: function(userId) {
      var ref = 'users/'+userId+'/tasks';
      var resultArray = [];

      firebase.methods.getRef(ref).once('value', snapshot => {
        var latestDate = null;
        var latestDailyBucket = null;
        var index = 0;
        snapshot.forEach(childSnapshot => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            // We create dailyBuckets sorted by date
            var currentTaskDate = dateUtils.methods.getDate(childData.deadline);

            // First Item
            if (latestDate == null && latestDailyBucket == null) {
              latestDate = currentTaskDate;
              latestDailyBucket = createDailyBucket(index, latestDate);
            }

            if (!dateUtils.methods.areSameDay(latestDate, currentTaskDate)) {
              resultArray.push(latestDailyBucket);

              latestDate = currentTaskDate;
              index += 1;
              latestDailyBucket = createDailyBucket(index, latestDate);
            }

            // We add the task
            latestDailyBucket.tasks.push(childData);
          });
         resultArray.push(latestDailyBucket);
      });
      return resultArray;
    }
  }
}
