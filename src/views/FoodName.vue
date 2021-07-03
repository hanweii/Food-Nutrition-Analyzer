<template>
  <div>
    <div class="container">
      <label >
        Type the food name
      </label>
      <div>
        <input v-model="keyword" type="text" id="name"/>
        <svg
          v-on:click="isHidden = !isHidden"
          @click="foodName()"
          class="picture"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <div v-if="!isHidden" class="res">
        <p> The nutrition details for {{foodname}}: </p>
        <br>
        <p> Energy: {{energy}} </p>
        <button> Record </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as fb from '../firebase'
import * as firebase from 'firebase/app'
import { debounce } from "lodash"
export default {
  data: () => ({
    keyword: "",
    foodname: "",
    energy: "",
    lists: [],
    isHidden: true
  }),
  methods: {
    addRecord() {
    },
    async foodName() {
      const db = firebase.firestore()
      // console.log(db.collection("food").doc()) 

      // fb.foodCollection
      // .get()
      // .then(querySnapshot => {
      // const foods = querySnapshot.docs.map(doc => doc.data())
      // for (const f of foods) {
      //   if(f["name"] == this.keyword){
      //     this.foodname = f["name"]
      //     this.energy = f["energy"]
      //   }
      // }
      // })

      var docRef = db.collection("food").doc("1");

      docRef.get().then((doc) => {
          if (doc.exists) {
              console.log("Document data:", doc.data()["name"]);
              this.foodname = doc.data()["name"]
              this.energy = doc.data()["energy"]
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

      // const result = fb.db.collection('food').where("name", "==", this.keyword)
      // console.log(result)
      this.foodname = this.keyword
    }
  },
  created() {
    this.debounceName = debounce(this.foodName, 1000);
  },
  watch: {
    keyword() {
      if (!this.keyword) return;
      this.debounceName();
    }
  }
};
</script>

<style scoped>
.picture {
  cursor: pointer;
}
.picture:hover{
  background-color: rgb(150, 196, 218);
}
.container {
	width: 300px;
	height: 300px;
	position: absolute;
	top:0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}
</style>
