<template>
  <div class="students">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.surname }}</td>
          <td>{{ student.email }}</td>
          <td>
            <router-link :to="'/edit-lecturer/' + student.id">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "Lecturers",
  data() {
    return {
      students: [],
    };
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("lecturers")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.students.push({
            id: doc.id,
            name: doc.data().name,
            surname: doc.data().surname,
            email: doc.data().email,
          })
        )
      );
  },
};
</script>
