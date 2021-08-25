<template>
  <div>
    <div class="container">
      <div>
        <body>
            <div class="textbox">
                <div class="textbox-box">
                    <div class="textbox-face textbox-side"></div>
                    <div class="textbox-face textbox-bottom"></div>
                    <div class="textbox-face textbox-top"></div>
                    <div class="textbox-field">
                        <div class="textbox-label">Food Name</div>
                        <input class="textbox-text" v-model="keyword" type="text" id="name" placeholder="Type here..." />
                    </div>
                    <div class="textbox-action">
                      <a v-on:click="isHidden = false" @click="foodName()" class="btn "><i class="fas fa-search"></i>Search</a>
                    </div>
                </div>
            </div>
        </body>
      </div>
      <div v-if="isHidden==false" class="res">
        <p> The nutrition details for {{foodname}}: </p>
        <p> Energy: {{energy}} </p>
        <div id="chart">
          <apexchart type="donut" :options="chartOptions1" :series="series1"></apexchart>
        </div>
        <div id="chart">
          <apexchart type="donut" :options="chartOptions2" :series="series2"></apexchart>
        </div>
        <p>Score: {{score}} </p>
        <button @click="addRecord()">Record</button>
      </div>
    </div>
  </div>
</template>


<script>
import VueApexCharts from 'vue-apexcharts'
import * as firebase from 'firebase/app'
import { debounce } from "lodash"
import {mapState} from 'vuex'
import vue from 'vue'
vue.use (VueApexCharts);
export default {
  components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    series1: [],
    series2:[],
    chartOptions1: {
      chart: {
        type: 'donut',
      },
      labels: ["vitaminA", "vitaminB1", "vitaminB2", "vitaminB3", "vitaminB5", "vitaminB6", "vitaminB12", "vitaminC", "vitaminD", "vitaminE", "vitaminK"],
      responsive: [{
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    chartOptions2: {
      chart: {
        type: 'donut',
      },
      labels: ["calcium", "magnesium", "phosphorus", "iron", "potassium", "sodium", "zinc", "copper"],
      responsive: [{
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    keyword: "",
    foodname: "",
    energy: "",
    score:"",
    isHidden: true
  }),
  methods: {
    addRecord() {
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; 
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      var m = "";
      if(month < 10){
        m = "0"
      }
      var d = "";
      if(day < 10){
        d = "0"
      }
      var newdate = year + m + month + d + day;
      const db = firebase.firestore()

      // doc(dailyNutrition.id)，把食物名字添加到food list，userid, date
      db.collection("daily-nutrition").doc(this.keyword + newdate).set({
        name: this.keyword, 
      }) 

      
      .then(() => {
          alert("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
    },
    async foodName() {
      const db = firebase.firestore()
      db.collection("food").where("name", "==", this.keyword)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data()["name"]);
                this.foodname = doc.data()["name"]
                this.energy = doc.data()["energy"]
                this.score = doc.data()["score"]
                this.series1 = [doc.data()["vitaminA"], doc.data()["vitaminB1"], doc.data()["vitaminB2"], doc.data()["vitaminB3"], doc.data()["vitaminB5"], doc.data()["vitaminB6"], doc.data()["vitaminB12"], doc.data()["vitaminC"], doc.data()["vitaminD"], doc.data()["vitaminE"], doc.data()["vitaminK"]]
                this.series2 = [doc.data()["calcium"], doc.data()["magnesium"], doc.data()["phosphorus"], doc.data()["iron"], doc.data()["potassium"], doc.data()["sodium"], doc.data()["zinc"], doc.data()["copper"]]
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
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
  },
  computed:{
      ...mapState(['userProfile'])
  },
};
</script>

<style scoped>
.picture {
  cursor: pointer;
}

.container {
  align-items: center;
  justify-content: center;
	width: 330px;
	height: 600px;
	top:0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}

*,
*:before,
*:after {
    box-sizing: border-box;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 150px;
    margin: 0;
    overflow: hidden;
    font-family: sans-serif;
}

.textbox {
    width: 700px;
    position: relative;
}

.textbox-box {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 0 1px #07662e;
    position: relative; 
}

.textbox-field {
    display: flex;
    flex-direction: column;
    padding: 10px 15px 15px;
    align-self: stretch;
    border-radius: 5px;
}

.textbox-label {
    text-transform: uppercase;
    font-weight: bold;
    color: #056e44;
}

.textbox-action {
    height: 100px;
    width: 150px;
    min-width: 60px;
    margin-right: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    -border-radius: 100px;
    background-color: #00915A;
    position: relative;
}

.textbox-action svg {
    width: 65%;
    height: 65%;
}


.textbox-action .textbox-side {
    width: 10px;
}

.textbox-action .textbox-bottom,
.textbox-action .textbox-top {
    height: 10px;
}

.textbox-action:hover {
    cursor: pointer;
    background-color: #056e44;
}


.textbox-text {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    font: 1.1rem sans-serif;
    display: block;
    color: #056e44;
}

.textbox-text:focus {
    outline: none;
}

.textbox-face {
    position: absolute;
    background-color: #056e44;
    left: 0;
}

.reference {
    position: absolute;
    right: 20px;
    bottom: 15px;
}

.reference img {
    width: 35px;
    height: 35px;
}

button {
  margin: 50px;
  font-family: serif;
}

</style>
