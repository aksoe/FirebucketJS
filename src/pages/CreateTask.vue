<template>
  <div id="createTask">
  <extendedToolbar :toolbarTitle="wording.toolbarTitle"
                    :inputValue="newTask.title"
                    @update:inputValue="val => newTask.title = val"
                    :inputLabel="wording.inputLabel"></extendedToolbar>

  <md-spinner id="spinner-create" v-if="newTaskCreationInProgress" :md-size="60" md-indeterminate class="md-primary"></md-spinner>

  <!-- Priority Picker Dialog -->
  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialogPriorityPicker">
    <md-dialog-title>{{wording.dialogPriorityPickerTitle}}</md-dialog-title>
    <md-list class="priority-picker-list">
      <md-list-item class="priority-picker-item" v-on:click.native="updateCurrentPriority(0)">
          <span>{{wording.priorities.priorityLow}}</span>
      </md-list-item>
      <md-list-item class="priority-picker-item" v-on:click.native="updateCurrentPriority(1)">
          <span>{{wording.priorities.priorityNormal}}</span>
      </md-list-item>
      <md-list-item class="priority-picker-item" v-on:click.native="updateCurrentPriority(2)">
          <span>{{wording.priorities.priorityHigh}}</span>
      </md-list-item>
      <md-list-item class="priority-picker-item" v-on:click.native="updateCurrentPriority(3)">
          <span>{{wording.priorities.priorityCrucial}}</span>
      </md-list-item>
    </md-list>
    <md-dialog-actions>
      <md-button class="md-primary" @click.native="closePriorityPicker()">CANCEL</md-button>
    </md-dialog-actions>
  </md-dialog>

  <!-- Tag Picker Dialog -->
  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialogTagPicker">
    <md-dialog-title>{{wording.itemTagTitle}}</md-dialog-title>
    <md-list class="tag-picker-list" >
      <md-list-item v-for="tag in tagList" :key="tag" class="tag-picker-item" v-on:click.native="updateCurrentTag(tag)">
          <span>{{tag}}</span>
      </md-list-item>
    </md-list>
    <md-dialog-actions>
      <md-button class="md-primary" @click.native="closeTagPicker()">CANCEL</md-button>
    </md-dialog-actions>
  </md-dialog>

    <md-button id="fab-create" class="md-fab md-fab-top-right" v-on:click.native="createTask(newTask)">
      <md-icon class="md-fab-add-white">send</md-icon>
    </md-button>
    <md-whiteframe md-elevation="1" id="whiteframe">
      <md-list>
        <md-list-item v-on:click.native="openPriorityPicker()">
          <md-icon>swap_vert</md-icon>
          <div class="md-list-text-container">
            <span>{{wording.itemPriorityTitle}}</span>
            <span>{{newTask.priority.label}}</span>
          </div>
        </md-list-item>
        <md-divider/>
        <md-list-item v-on:click.native="openTagPicker()">
          <md-icon>local_offer</md-icon>
          <div class="md-list-text-container">
            <span>{{wording.itemTagTitle}}</span>
            <span>{{newTask.tag}}</span>
          </div>
        </md-list-item>
        <md-divider/>
        <md-list-item>
          <md-icon>today</md-icon>
          <div class="md-list-text-container">
            <span>{{wording.itemDeadlineTitle}}</span>
            <span>{{date.time}}</span>
          </div>
        </md-list-item>
      </md-list>
      <date-picker :date="date" :option="option"></date-picker>
    </md-whiteframe>

    <md-snackbar md-position="bottom left" ref="snackbar">{{wording.errors.invalidTaskTitle}}</md-snackbar>
    <md-snackbar md-position="bottom left" ref="snackbarPastDate">{{wording.errors.pastDate}}</md-snackbar>
  </div>
</template>

<script>
import ExtendedToolbar from '../components/ExtendedToolbar';
import datePicker from 'vue-datepicker/vue-datepicker-es6.vue';
import copy from '../i18n/copyCreateTask';
import tagsModule from '../modules/tags';
import taskModule from '../modules/task';
import dateUtils from '../utils/dateUtils';

export default {
  components: {
      ExtendedToolbar,
      'date-picker': datePicker
  },
  name: 'createTask',
  data () {
    return {
      wording: copy.en,
      newTask: taskModule.model,
      newTaskInProgress: false,
      tags: [],
      date: {
        time: ''
      },
      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: 'Today',
        inputStyle: {
          'display': 'inline',
          'padding': '6px',
          'line-height': '16px',
          'font-size': '14px',
          'border': '2px solid #fff',
          'color': '#D32F2F',
        },
        color: {
          header: '#D32F2F',
          headerText: '#FDD835'
        },
        buttons: {
          ok: 'OK',
          cancel: 'CANCEL'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      }
    }
  },
  methods: {
    openPriorityPicker: function() {
      this.$refs['dialogPriorityPicker'].open();
    },
    closePriorityPicker: function() {
      this.$refs['dialogPriorityPicker'].close();
    },
    openTagPicker: function() {
      this.$refs['dialogTagPicker'].open();
    },
    closeTagPicker: function() {
      this.$refs['dialogTagPicker'].close();
    },
    updateCurrentPriority: function(priorityId) {
      this.newTask.priority.id = priorityId;
      switch (priorityId) {
        // Low
        case 0:
          this.newTask.priority.label = this.wording.priorities.priorityLow;
          break;
          // Normal
          case 1:
          this.newTask.priority.label = this.wording.priorities.priorityNormal;
            break;
            // High
            case 2:
          this.newTask.priority.label = this.wording.priorities.priorityHigh;
              break;
              // Crucial
              case 3:
          this.newTask.priority.label = this.wording.priorities.priorityCrucial;
                break;
        default:

      }
      this.closePriorityPicker();
    },
    updateCurrentTag: function(tag) {
      this.newTask.tag = tag;
      this.closeTagPicker();
    },
    createTask: function(newTask) {
      if (newTask.title) {
        this.showLoading();

        if (dateUtils.methods.isPast(this.date)) {
          this.hideLoading();
          this.showPastDate();
          return;
        }

        taskModule.methods.createTask(this.$route.params.uid, this.date);
        this.goToHome();
      } else {
        this.showInvalidTaskTitle();
      }
    },
    showInvalidTaskTitle: function() {
      this.$refs.snackbar.open();
    },
    showPastDate: function() {
      this.$refs.snackbarPastDate.open();
    },
    showLoading: function() {
      this.newTaskInProgress = true;
    },
    hideLoading: function() {
      this.newTaskInProgress = false;
    },
    goToHome: function() {
      this.$router.push({
        name: 'home',
        params: {
          uid: this.$route.params.uid
        }
      });
    }
  },
  computed: {
    tagList: function() {
      return this.tags;
    },
    newTaskCreationInProgress: function() {
      return this.newTaskInProgress;
    }
  },
  created() {
    this.tags = tagsModule.methods.getTags();
  }
}
</script>

<style scoped src="../styles/create_task.css"></style>
<style scoped src="../styles/fab.css"></style>
