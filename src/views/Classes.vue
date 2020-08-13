<template>
  <div class="classes">
    <table class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Group</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="singleClass in classes" :key="singleClass.id">
          <td>{{ singleClass.date }}</td>
          <td>{{ singleClass.group }}</td>
          <td>
            <router-link :to="'/edit-class/' + singleClass.id">
              Edit
            </router-link>
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
  name: "Classes",
  data() {
    return {
      classes: [],
    };
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("classes")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          firebase
            .firestore()
            .collection("groups")
            .doc(doc.data().group)
            .get()
            .then((group) => {
              this.classes.push({
                id: doc.id,
                date: new Date(doc.data().date.seconds * 1000)
                  .toLocaleString("lt")
                  .slice(0, 10),
                group: group.data().name,
              });
            })
        )
      );
  },
};
</script>
