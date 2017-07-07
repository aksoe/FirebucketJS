import dateFormat from 'dateformat'

export default {
  methods: {
    getDate: function(dateStr) {
      return new Date(dateStr);
    },
    getDisplayDate: function(date) {
      return dateFormat(date, 'd mmmm');
    },
    getDisplayDay: function(date) {
      if (this.isToday(date)) {
        return "Today";
      } else if (this.isTomorrow(date)) {
        return "Tomorrow";
      }
      return dateFormat(date, 'dddd');
    },
    isToday: function(date) {
      var now = new Date();
      if (now.getDate() == date.getDate()) {
        if (now.getMonth() == date.getMonth()) {
          if (now.getFullYear() == date.getFullYear()) {
            return true;
          }
        }
      }

      return false;
    },
    isTomorrow: function(date) {
      var now = new Date();
      if ((now.getDate()+1) == date.getDate()) {
        if (now.getMonth() == date.getMonth()) {
          if (now.getFullYear() == date.getFullYear()) {
            return true;
          }
        }
      }

      return false;
    },
    isPast: function (date) {
      date = this.getDate(date.time);
      var now = new Date();
      if (date.getTime() <= now.getTime()) {
        return true;
      }

      return false;
    },
    areSameDay: function(date1, date2) {
      if (date1.getDate() == date2.getDate()) {
        if (date1.getMonth() == date2.getMonth()) {
          if (date1.getFullYear() == date2.getFullYear()) {
            return true;
          }
        }
      }

      return false;
    }
  }
}
