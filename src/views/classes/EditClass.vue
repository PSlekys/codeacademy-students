<template>
  <div class="edit-class">
    <Notification
      v-if="error"
      v-on:close="error = false"
      :type="errorType"
      :message="errorMessage"
    />

    <form v-on:submit.prevent="edit">
      <div class="field">
        <label class="label">Group</label>
        <div class="control">
          <select v-model="group">
            <option
              v-for="singleGroup in groups"
              :key="singleGroup.id"
              :value="singleGroup.id"
            >
              {{ singleGroup.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button
            class="button is-primary"
            :class="loading && 'is-loading'"
            type="submit"
          >
            Edit Class
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
  name: "EditClass",
  components: { Notification },
  data() {
    return {
      group: "",
      groups: [],
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
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) => {
          this.groups.push({
            id: doc.id,
            name: doc.data().name,
          });
        })
      );

    firebase
      .firestore()
      .collection("classes")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.group = doc.data().group;
      });
  },
  methods: {
    edit() {
      this.loading = true;
      firebase
        .firestore()
        .collection("classes")
        .doc(this.$route.params.id)
        .set({
          date: new Date(),
          group: this.group,
        })
        .then(() => {
          this.error = true;
          this.errorType = "is-success";
          this.errorMessage = "You have successfully added a new class";
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
