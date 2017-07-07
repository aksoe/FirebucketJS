<template>
  <div id="home">
  <toolbar></toolbar>
    <!-- Task Deletion Confirmation Dialog -->
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialogConfirmDeleteTask">
      <md-dialog-title>{{wording.dialogConfirmDeleteTaskTitle}}</md-dialog-title>
      <md-dialog-content>{{wording.dialogConfirmDeleteTaskContent}}</md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="closeConfirmDeleteTaskDialogAndDeleteTask('dialogConfirmDeleteTask')">YES</md-button>
        <md-button class="md-primary" @click.native="closeConfirmDeleteTaskDialog('dialogConfirmDeleteTask')">CANCEL</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-fab md-fab-bottom-right" v-on:click.native="goToCreateTask()">
      <md-icon class="md-fab-add-white">add</md-icon>
    </md-button>

    <!-- Placeholder -->
    <div id="placeholder-empty-bucket" v-show="!isThereAnyTask">
      <img src="../assets/image_bucket_small.png" alt="placeholder_logo"/>
      <h3>{{wording.placeholderEmptyBucketTitle}}</h3>
    </div>

    <md-whiteframe v-show="isThereAnyTask" md-elevation="1">
      <md-list v-for="dailyBucket in bucketArray" :key="dailyBucket.displayDate">
        <!-- Task Date -->
        <md-list-item>
            <div>
              <span class="md-title">{{dailyBucket.displayDay}}</span>
              <span>{{dailyBucket.displayDate}}</span>
            </div>
        </md-list-item>
        <!-- Task Item -->
        <md-list v-for="task in dailyBucket.tasks" :key="task.id">
          <md-list-item>
            <md-button v-on:click.native="openConfirmDeleteTaskDialog('dialogConfirmDeleteTask', task.id)" class="md-icon-button md-list-action">
              <md-icon>done</md-icon>
            </md-button>
            <div class="md-list-text-container">
              <span>{{task.title}}</span>
              <div>
                <div v-bind:class="getPriorityBadgeStyle(task.priority.id)"/>
                <span class="item-task-priority-text">{{task.priority.label}}</span>
              </div>
            </div>
            <div v-if="shouldTaskTagBeDisplayed(task.tag)" class="item-task-tag">
              <span class="md-caption">{{task.tag}}</span>
            </div>
          </md-list-item>
        </md-list>
        <md-divider v-if="shouldDividerBeDisplayed(dailyBucket.index)" class="md-inset"></md-divider>
      </md-list>
    </md-whiteframe>
  </div>
</template>

<script>
import Toolbar from '../components/Toolbar';
import firebase from '../api/firebase';
import dateUtils from '../utils/dateUtils';
import copy from '../i18n/copyHome';
import taskModule from '../modules/task';

export default {
  components: {
      Toolbar
  },
  name: 'home',
  data () {
    // bucketArray will contains an array of
    // {displayDate:date, tasks:[]}
    return {
      wording: copy.en,
      bucketArray: [],
      taskIdSelectedForDeletion: -1
    }
  },
  computed: {
    isThereAnyTask: function() {
      if (!this.bucketArray) {
        return false;
      }
      return this.bucketArray.length !== 0;
    },
  },
  methods: {
    openConfirmDeleteTaskDialog: function(ref, taskId) {
      this.taskIdSelectedForDeletion = taskId;
      this.$refs[ref].open();
    },
    closeConfirmDeleteTaskDialog: function(ref) {
      this.taskIdSelectedForDeletion = -1;
      this.$refs[ref].close();
    },
    closeConfirmDeleteTaskDialogAndDeleteTask: function(ref) {
      this.$refs[ref].close();
      taskModule.methods.deleteTask(this.$route.params.uid, this.taskIdSelectedForDeletion);

      this.fetchBucket();
    },
    fetchBucket: function() {
      this.bucketArray = [];
      this.bucketArray = taskModule.methods.getTasks(this.$route.params.uid);
    },
    shouldDividerBeDisplayed: function(index) {
      // We want to hide the divider if the current daily bucket is the latest to be displayed
      return (index != (this.bucketArray.length-1));
    },
    shouldTaskTagBeDisplayed: function(taskTag) {
      return taskTag != 'No tag selected';
    },
    getPriorityBadgeStyle: function(priorityId) {
      switch (priorityId) {
        // Low
        case 0:
          return 'item-task-priority-badge-low';
          break;
          // Normal
          case 1:
            return 'item-task-priority-badge-normal';
            break;
            // High
            case 2:
              return 'item-task-priority-badge-high';
              break;
              // Crucial
              case 3:
                return 'item-task-priority-badge-crucial';
                break;
        default:

      }
    },
    goToCreateTask: function() {
      this.$router.push({
        name: 'createTask',
        params: {
          uid: this.$route.params.uid
        }
      });
    }
  },
  created() {
    this.fetchBucket();
  }
}
</script>

<style scoped src="../styles/home.css"></style>
<style scoped src="../styles/fab.css"></style>
