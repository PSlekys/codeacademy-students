<template>
  <div class="edit-group">
    <Notification
      v-if="error"
      v-on:close="error = false"
      :type="errorType"
      :message="errorMessage"
    />

    <form v-on:submit.prevent="edit">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" v-model="name" placeholder="FE1" />
        </div>
      </div>

      <div class="field">
        <label class="label">Lecturer</label>
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="lecturer"
            placeholder="Petras Slekys"
          />
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
            Edit Group
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Notification from "../components/Notification";

export default {
  name: "Edit Group",
  components: { Notification },
  data() {
    return {
      name: "",
      lecturer: "",
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
      .collection("groups")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.name = doc.data().name;
        this.lecturer = doc.data().lecturer;
        this.selectedStudents = doc.data().students;
      });

    firebase
      .firestore()
      .collection("students")
      .orderBy("surname")
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
    edit() {
      this.loading = true;
      firebase
        .firestore()
        .collection("groups")
        .doc(this.$route.params.id)
        .set({
          name: this.name,
          lecturer: this.lecturer,
          students: this.selectedStudents,
        })
        .then(() => {
          this.error = true;
          this.errorType = "is-success";
          this.errorMessage =
            "You have successfully changed details of a group";
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
