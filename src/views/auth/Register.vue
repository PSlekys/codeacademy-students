<template>
  <div class="register">
    <Notification
      v-if="error"
      v-on:close="error = false"
      type="is-danger"
      :message="errorMessage"
    />
    <form v-on:submit.prevent="register">
      <div class="field">
        <label class="label">Full Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="fullname"
            placeholder="Petras Slekys"
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
        <label class="label">Password</label>
        <div class="control">
          <input
            class="input"
            v-model="password"
            type="password"
            placeholder="Password"
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
            Register
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Notification from "../../components/Notification";

export default {
  name: "Register",
  components: { Notification },
  data() {
    return {
      fullname: "",
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    register() {
      this.loading = true;
      this.error = true;
      this.errorMessage = "Registration is disabled";
    },
  },
};
</script>
