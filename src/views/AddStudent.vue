<template>
  <div class="add-student">
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
          <input
            class="input"
            type="text"
            v-model="name"
            placeholder="Petras"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Surname</label>
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="surname"
            placeholder="Slekys"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            type="email"
            v-model="email"
            placeholder="e.g. alexsmith@gmail.com"
          />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button
            class="button is-primary"
            :class="loading && 'is-loading'"
            type="submit"
          >
            Add Student
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
  name: "Login",
  components: { Notification },
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      error: false,
      errorMessage: "",
      errorType: "",
      loading: false,
    };
  },
  methods: {
    add() {
      this.loading = true;
      firebase
        .firestore()
        .collection("students")
        .add({
          name: this.name,
          surname: this.surname,
          email: this.email,
        })
        .then(() => {
          this.error = true;
          this.errorType = "is-success";
          this.errorMessage = "You have successfully added a new student";
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
