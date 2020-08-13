<template>
  <div class="groups">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Lecturer</th>
          <th>Students</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groups" :key="group.id">
          <td>{{ group.name }}</td>
          <td>{{ group.lecturer }}</td>
          <td>
            <ul>
              <li v-for="student in group.students" :key="student">
                {{ student }}
              </li>
            </ul>
          </td>
          <td>
            <router-link :to="'/edit-group/' + group.id">Edit</router-link>
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
  name: "Groups",
  data() {
    return {
      groups: [],
    };
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let group = {};
          group.id = doc.id;
          group.name = doc.data().name;
          group.lecturer = doc.data().lecturer;
          group.students = [];
          doc.data().students.forEach((studentId, index) => {
            firebase
              .firestore()
              .collection("students")
              .doc(studentId)
              .get()
              .then((student) => {
                group.students.push(
                  `${student.data().name} ${student.data().surname}`
                );
              })
              .then(() => {
                if (doc.data().students.length - 1 === index) {
                  this.groups.push(group);
                }
              });
          });
        });
      });
  },
};
</script>
