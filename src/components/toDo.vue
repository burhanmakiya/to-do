<template>
  <!-- ////////////////////////////////CREATe A NEw TASk/  -->
  <v-text-field
    v-model="title"
    label="+ New Task"
    @keydown.enter="newTask"
  ></v-text-field>
  <!-- ///////////////////////////////////////////////Filter -->
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-expansion-panel-text class="filters-board" @click.stop>
          <v-switch
            v-model="showHighPriority"
            label="High Priority"
            color="red"
          ></v-switch>
          <v-select
            v-model="selectedCategory"
            :items="categories.map((category) => category.name)"
            :item-text="(name) => getCategoryName(name)"
            label="Category"
            variant="underlined"
            clearable
            class="v-select"
          ></v-select>
          <v-radio-group v-model="taskFilter">
            <v-radio label="All" :value="'all'"></v-radio>
            <v-radio label="Completed" :value="'completed'"></v-radio>
            <v-radio label="Uncompleted" :value="'uncompleted'"></v-radio>
          </v-radio-group>
        </v-expansion-panel-text>
      </v-expansion-panel-title>
    </v-expansion-panel>
  </v-expansion-panels>
  <!-- ///////////////////////////////////summary -->
  <v-progress-linear v-model="progress" color="amber" height="100" striped>
    <div class="task-summary">
      <p class="total">Total Tasks: {{ totalTasks }}</p>
      <p class="Completed">Completed Tasks: {{ completedTasks }}</p>
      <p class="Remaining">Remaining Tasks: {{ remainingTasks }}</p>
      <p class="Progress">Progress: {{ progress }}%</p>
    </div></v-progress-linear
  >
  <!-- ////////////////Rendering the LIST OF THE TASk -->
  <ul style="list-style-type: none; padding: 0">
    <li v-for="task in filteredTasks" :key="task.id">
      <div class="task-container">
        <!-- deleteTask -->
        <v-btn
          class="ma-2"
          variant="text"
          icon="mdi-minus-circle"
          color="red"
          @click="deleteTask(task.taskId)"
        >
        </v-btn>
        <!-- toggleTaskCompletion -->
        <v-checkbox
          v-model="task.status"
          value="DONE"
          @change="toggleTaskCompletion(task.taskId, task.status)"
          hide-details
        ></v-checkbox>
        <v-expansion-panels variant="inset">
          <v-expansion-panel :disabled="task.status === 'DONE'">
            <v-expansion-panel-title>
              <template v-slot:default="{}">
                <div class="task-title">
                  <v-icon
                    v-if="task.estimation === 1"
                    small
                    class="mr-1"
                    color="red"
                  >
                    mdi-star
                  </v-icon>
                  {{ task.title }}
                </div>
              </template>
            </v-expansion-panel-title>
            <!-- ////////////////////////////<v-expansion-panel-text start>-->
            <v-expansion-panel-text>
              <div class="task-details">
                <div>
                  <strong>Subtasks:</strong>
                  <ul class="subtasks">
                    <li v-for="(subtask, index) in task.subtasks" :key="index">
                      {{ subtask }}
                    </li>
                  </ul>
                </div>
                <div>
                  <strong>Priority:</strong>
                  {{ task.priority ? "High " : "Low" }}
                </div>
                <div>
                  <strong>Category:</strong> {{ getCategoryName(task.points) }}
                </div>
                <div><strong>Date:</strong> {{ formatDate(task.date) }}</div>
                <div>
                  <v-list-item-action>
                    <v-btn color="primary" @click="openDialog(task.taskId)">
                      <v-icon dark>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </div>
              </div>
              <!-- ////////////////////////////<v-expansion-panel-text end>-->
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </li>
  </ul>
  <!-- ////////////////////////////////Open editTaskDialog/  -->
  <v-dialog v-model="editTaskDialog" max-width="40rem">
    <v-card>
      <v-card-text>
        <!-- Task Title -->
        <v-text-field v-model="editTitle" label="Task" />

        <!-- Priority Switch -->
        <v-switch v-model="priority" label="Priority" color="red" />

        <!-- Category Selection -->
        <v-chip-group
          v-model="editCategory"
          column
          label="Category"
          hint="Select a category"
          class="category-chip-group"
        >
          <v-chip
            v-for="(category, index) in categories"
            :key="index"
            :value="category.points"
            :color="category.color"
            @click="selectCategory(category)"
            class="category-chip"
          >
            <v-icon left>{{ category.icon }}</v-icon>
            {{ category.name }}
          </v-chip>
        </v-chip-group>

        <!-- Add Subtask -->
        <v-text-field
          v-model="newSubtask"
          label="Add Subtask"
          @keydown.enter="addSubtask"
        />

        <!-- Subtask List -->
        <ul class="subtask-list">
          <li
            v-for="(subtask, index) in subtasks"
            :key="index"
            class="subtask-item"
          >
            <v-btn
              variant="text"
              size="x-small"
              icon="mdi-minus-circle"
              color="red"
              @click="removeSubtask(index)"
            >
            </v-btn>

            {{ subtask }}
          </li>
        </ul>

        <!-- DatePicker -->
        <VueDatePicker
          v-model="date"
          :min-date="new Date()"
          auto-apply
          :enable-time-picker="false"
        />
      </v-card-text>

      <v-card-actions class="card-actions">
        <v-spacer></v-spacer>

        <!-- Edit Task Button -->
        <v-btn color="primary" @click="editTask(selectedTaskId)"
          >Edit Task</v-btn
        >

        <!-- Close Button -->
        <v-btn color="secondary" @click="editTaskDialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useTasksStore } from "@/store/tasks";
import { tokenUserStore } from "@/store/token";
import { ref, onMounted, watch, computed } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const taskStore = useTasksStore();
const tokenStore = tokenUserStore();
const token = tokenStore.getToken();

////////////////////////////////// Clear Form/
const clearForm = () => {
  title.value = null;
  editTitle.value = null;
};
///////////////////////////////////openDialog/
const selectedTaskId = ref(null);
const newSubtask = ref(null);
const subtasks = ref([]);
const openDialog = (taskId) => {
  errorMessage.value = null;
  editTaskDialog.value = true;
  selectedTaskId.value = taskId;

  // pre-fill the form with the current task values,
  const task = tasksList.value.find((task) => task.taskId === taskId);
  if (task) {
    editTitle.value = task.title;
    priority.value = task.estimation === 1;
    editCategory.value = task.points ? task.points : 0;
    date.value = new Date();
  }
  subtasks.value = task.description ? JSON.parse(task.description) : [];
};

////////////////////////////////// ADD NEW TASK/
const title = ref(null);
const newTask = () => {
  const data = {
    title: title.value,
    points: 0,
  };
  taskStore
    .newTask(token, data)
    .then((res) => {
      clearForm();
      allTasks();
    })
    .catch((error) => {
      errorMessage.value = error;
    });
};
////////////////////////////////// GET ALL TASKS/
const getCategoryName = (points) => {
  const category = categories.value.find((cat) => cat.points === points);
  return category ? category.name : "";
};

const formatDate = (timestamp) => {
  if (!timestamp) return new Date().toLocaleDateString();
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

const tasksList = ref([]);
const allTasks = () => {
  taskStore
    .allTasks(token)
    .then((res) => {
      tasksList.value = res.data.map((task) => {
        return {
          ...task,
          subtasks: task.description ? JSON.parse(task.description) : [],
          priority: task.estimation === 1,
          date: task.spentTime * 1000000,
        };
      });
      clearForm();
    })
    .catch((error) => {
      errorMessage.value = error;
    });
};

////////////////////////////////// REMOVE A TASK/
const deleteTask = (taskId) => {
  taskStore
    .deleteTask(token, taskId)
    .then((res) => {
      allTasks();
    })
    .catch((error) => {
      errorMessage.value = error;
    });
};
////////////////////////////////////Edit A TASK/
const editTaskDialog = ref(false);
const errorMessage = ref(null);
const editTitle = ref(null);
const priority = ref(false);
const editCategory = ref(null);
const selectCategory = (category) => {
  editCategory.value = category.points;
};

const categories = ref([
  { name: "Private", points: 0, color: "blue", icon: "mdi-account" },
  { name: "Work", points: 1, color: "green", icon: "mdi-briefcase" },
  { name: "Shopping", points: 2, color: "orange", icon: "mdi-cart" },
]);

const timestamp = ref(null);
const date = ref(new Date());
watch(date, () => {
  timestamp.value = date.value.getTime();
});

const editTask = (taskId) => {
  const data = {
    title: editTitle.value,
    estimation: priority.value ? 1 : 0,
    points: editCategory.value,
    description: JSON.stringify(subtasks.value),
    spentTime: timestamp.value / 1000000,
  };

  taskStore
    .updateTask(token, taskId, data)
    .then((res) => {
      editTaskDialog.value = false;
      clearForm();
      allTasks();
    })
    .catch((error) => {
      errorMessage.value = error;
    });
};

//////////////////////////////////// TOGGLE TASK COMPLETION/
const toggleTaskCompletion = (taskId, currentStatus) => {
  console.log(currentStatus);
  const newStatus = currentStatus === false ? "TODO" : "DONE";
  const data = { status: newStatus };
  taskStore
    .updateTask(token, taskId, data)
    .then((res) => {
      allTasks();
    })
    .catch((error) => {
      errorMessage.value = error;
    });
};

////////////////////////////////////  subTASK/
const addSubtask = () => {
  if (newSubtask.value) {
    subtasks.value.push(newSubtask.value);
    newSubtask.value = null;
  }
};
const removeSubtask = (index) => {
  subtasks.value.splice(index, 1);
};
///////////////////////////////////Filter Task List/
const totalTasks = computed(() => tasksList.value.length);
const completedTasks = computed(
  () => tasksList.value.filter((task) => task.status === "DONE").length
);
const remainingTasks = computed(
  () => tasksList.value.filter((task) => task.status === "TODO").length
);
const progress = computed(() => {
  if (totalTasks.value === 0) return 0;
  return Math.round((completedTasks.value / totalTasks.value) * 100);
});

const showHighPriority = ref(false);
const selectedCategory = ref(null);
const taskFilter = ref("all");

const filteredTasks = computed(() => {
  return tasksList.value
    .filter((task) => {
      console.log("asd", task.date);
      let displayTask = true;

      if (showHighPriority.value) {
        displayTask = displayTask && task.priority;
      }

      if (selectedCategory.value) {
        const selectedCategoryObj = categories.value.find(
          (cat) => cat.name === selectedCategory.value
        );
        displayTask = displayTask && task.points === selectedCategoryObj.points;
      }

      if (taskFilter.value === "completed") {
        displayTask = displayTask && task.status === "DONE";
      } else if (taskFilter.value === "uncompleted") {
        displayTask = displayTask && task.status === "TODO";
      }

      return displayTask;
    })
    .sort((a, b) => a.date - b.date);
});

onMounted(() => {
  allTasks();
});
</script>

<style scoped>
.task-details ul.subtasks {
  margin-left: 1.5rem;
}
.task-container {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.task-title {
  display: flex;
  align-items: center;
}

.task-details > div {
  margin-bottom: 8px;
}

.category-chip-group {
  margin-bottom: 1rem;
}

.category-chip {
  margin: 0.25rem;
}

.subtask-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.subtask-item {
  margin-bottom: 0.5rem;
}

.remove-subtask-btn {
  margin-left: 0.5rem;
}

.card-actions {
  display: flex;
  justify-content: space-between;
}

.subtask-item {
  display: flex;
  align-items: center;
}

.custom-remove-btn {
  margin: 0 10px;
  padding: 0;
  min-width: 20px;
}

.filters-board {
  display: flex;
}

.v-select {
  width: 50%;
}

.filters-board-panel {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  height: 100%;
}
.task-summary {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 40rem;
}
</style>
