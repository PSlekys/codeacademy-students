<template>
  <div class="edit-lecturer">
    <Notification
      v-if="!enteredId"
      v-on:close="enteredId = false"
      type="is-danger"
      message="Please enter an ID"
    />

    <div v-if="enteredId">
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
              Edit Lecturer
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Notification from "../../components/Notification";

export default {
  name: "EditLecturer",
  components: { Notification },
  computed: {
    enteredId() {
      return this.$route.params.id;
    },
  },
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
  beforeMount() {
    if (this.enteredId) {
      firebase
        .firestore()
        .collection("lecturers")
        .doc(this.$route.params.id)
        .get()
        .then((doc) => {
          this.name = doc.data().name;
          this.surname = doc.data().surname;
          this.email = doc.data().email;
        });
    }
  },
  methods: {
    edit() {
      this.loading = true;
      firebase
        .firestore()
        .collection("lecturers")
        .doc(this.$route.params.id)
        .set({
          name: this.name,
          surname: this.surname,
          email: this.email,
        })
        .then(() => {
          this.error = true;
          this.errorType = "is-success";
          this.errorMessage = "You have successfully changed student details";
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
