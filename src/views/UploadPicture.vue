<template>
  <div class="uploadPicture">
    <input type="file" id="file" ref="file" v-on:change="onFileChanged()" />

    <button v-on:click="isHidden = false" @click="submitFile()">Submit</button>

    <div v-if="isHidden == false" class="res">
      <p>The nutrition details for {{ foodname }}:</p>
      <p>Energy: {{ energy }}</p>
      <div id="chart">
        <apexchart
          type="donut"
          :options="chartOptions1"
          :series="series1"
        ></apexchart>
      </div>
      <div id="chart">
        <apexchart
          type="donut"
          :options="chartOptions2"
          :series="series2"
        ></apexchart>
      </div>
      <p>Score: {{ score }}</p>
      <button @click="addRecord()">Record</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueApexCharts from "vue-apexcharts";
import * as firebase from "firebase/app";
import { debounce } from "lodash";
import { mapState } from "vuex";
import vue from "vue";
vue.use(VueApexCharts);
export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      file: "",
      textClassify: [],
      series1: [],
      series2: [],
      chartOptions1: {
        chart: {
          type: "donut",
        },
        labels: [
          "vitaminA",
          "vitaminB1",
          "vitaminB2",
          "vitaminB3",
          "vitaminB5",
          "vitaminB6",
          "vitaminB12",
          "vitaminC",
          "vitaminD",
          "vitaminE",
          "vitaminK",
        ],
        responsive: [
          {
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      chartOptions2: {
        chart: {
          type: "donut",
        },
        labels: [
          "calcium",
          "magnesium",
          "phosphorus",
          "iron",
          "potassium",
          "sodium",
          "zinc",
          "copper",
        ],
        responsive: [
          {
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      keyword: "",
      foodname: "",
      energy: "",
      score: "",
      isHidden: true,
    };
  },
  methods: {
    addRecord() {
      this.$store.dispatch('recordFood', {
        name: this.foodname,
        energy: this.energy
      })

      this.$router.push('/record');
    },
    onFileChanged(event) {
      this.file = this.$refs.file.files[0];
    },

    submitFile() {
      // upload file, get it from this.file
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post("http://localhost:5000/predict", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          this.textClassify = response.data;
          console.log("SUCCESS!!");
          console.log(this.textClassify.result);
          const db = firebase.firestore();
          db.collection("food")
            .where("name", "==", this.textClassify.result)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (doc.exists) {
                  // console.log("Document data:", doc.data()["name"]);
                  this.foodname = doc.data()["name"];
                  this.energy = doc.data()["Energy"];
                  this.score = doc.data()["Score"];
                  this.series1 = [
                    doc.data()["VitaminA"],
                    doc.data()["VitaminB1"],
                    doc.data()["VitaminB2"],
                    doc.data()["VitaminB3"],
                    doc.data()["VitaminB5"],
                    doc.data()["VitaminB6"],
                    doc.data()["VitaminB12"],
                    doc.data()["VitaminC"],
                    doc.data()["VitaminD"],
                    doc.data()["VitamimnE"],
                    doc.data()["VitaminK"],
                  ];
                  this.series2 = [
                    doc.data()["Calcium"],
                    doc.data()["Magnesium"],
                    doc.data()["Phosphorus"],
                    doc.data()["Iron"],
                    doc.data()["Potassium"],
                    doc.data()["Sodium"],
                    doc.data()["Zinc"],
                    doc.data()["Copper"],
                  ];
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
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 600px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.inner {
  width: 70%;
  align-items: center;
  justify-content: center;
  margin: auto;
}
</style>