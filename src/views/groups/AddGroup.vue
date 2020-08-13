<template>
  <div class="add-group">
    <Notification
      v-if="error"
      v-on:close="error = false"
      :type="errorType"
      :message="errorMessage"
    />

    <form v-on:submit.prevent="add">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" v-model="name" placeholder="FE1" />
        </div>
      </div>

      <div class="field">
        <label class="label">Lecturer</label>
        <div class="control">
          <select v-model="lecturer">
            <option v-for="lec in allLecturers" :key="lec.id" :value="lec.id">{{
              lec.name + " " + lec.surname
            }}</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label">Students</label>
        <div class="control" v-for="student in students" :key="student.id">
          <label>
            <input
              class="checkbox"
              type="checkbox"
              :value="student.id"
              v-model="selectedStudents"
            />
            {{ student.name + " " + student.surname }}
          </label>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button
            class="button is-primary"
            :class="loading && 'is-loading'"
            type="submit"
          >
            Add Group
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Notification from "../../components/Notification";

export default {
  name: "Add Group",
  components: { Notification },
  data() {
    return {
      name: "",
      lecturer: "",
      allLecturers: [],
      students: [],
      selectedStudents: [],
      error: false,
      errorMessage: "",
      errorType: "",
      loading: false,
    };
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("lecturers")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.allLecturers.push({
            id: doc.id,
            name: doc.data().name,
            surname: doc.data().surname,
          })
        )
      );

    firebase
      .firestore()
      .collection("students")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.students.push({
            id: doc.id,
            name: doc.data().name,
            surname: doc.data().surname,
          });
        });
      });
  },
  methods: {
    add() {
      this.loading = true;
      firebase
        .firestore()
        .collection("groups")
        .add({
          name: this.name,
          lecturer: this.lecturer,
          students: this.selectedStudents,
        })
        .then(() => {
          this.error = true;
          this.errorType = "is-success";
          this.errorMessage = "You have successfully added a new group";
          this.loading = false;
        })
        .catch((error) => {
          this.error = true;
          this.errorType = "is-danger";
          this.errorMessage = error.message;
          this.loading = false;
        });
    },
  },
};
</script>
