<template>
<div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <td>
        <input type="file" id="file" ref="file" v-on:change="onFileChanged()"/>
        </td>

        <td >
        <button v-on:click="isHidden = false" @click="submitFile()">Submit</button>
        </td>
    </div>
    <div class="inner">
     <tr v-if="isHidden==false" class="inner">
            <p> The nutrition details for {{foodname}}: </p>
            <p> Energy: {{energy}} </p>
            <div id="chart">
              <apexchart type="donut" :options="chartOptions1" :series="series1"></apexchart>
            </div>
            <div id="chart">
              <apexchart type="donut" :options="chartOptions2" :series="series2"></apexchart>
            </div>
            <p>Score: {{score}} </p>
            <button >Record</button>
      </tr>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
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
  data() {
    return {
      file: '',
      textClassify: [],
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
    }
  },
  methods: {
  
    onFileChanged (event) {
      this.file = this.$refs.file.files[0];
    },
            
    submitFile()  {
      // upload file, get it from this.file
      let formData = new FormData();
      formData.append('file', this.file);
      axios.post( 'http://localhost:5000/predict',
        formData,{ 
          headers: { 'Content-Type': 'multipart/form-data'
                  }
                }
              ).then(response=>{
                  this.textClassify = response.data;
                  console.log('SUCCESS!!'); 
                  const db = firebase.firestore()
                  db.collection("food").where("name", "==", this.textClassify.result)
                  .get()
                  .then((querySnapshot) => {
                      querySnapshot.forEach((doc) => {
                        if (doc.exists) {
                            // console.log("Document data:", doc.data()["name"]);
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
          })
          .catch(err =>{
            console.log(err);
          });    
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  align-items: center;
  justify-content: center;
	width: 500px;
	height: 600px;
	top:0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}
.inner{
  width: 70%;
  align-items: center;
  justify-content: center;
  margin: auto;

}
</style>