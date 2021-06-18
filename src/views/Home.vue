<template>
  <div>
    <div class="sn" @click="searchName()">Search by food name</div>
    <div class="uf" @click="upload()">Upload food picture</div>
    <div class="vh" @click="history()">View history</div>
  </div>
</template>

<script>
  export default {
    methods: {
      searchName() {
        this.$router.push('/foodName');
      },
      upload() {
        this.$router.push('/uploadPicture');
      },
      history() {
        this.$router.push('/history');
      }
    }
  }
</script>

<style lang="scss" scoped>
.sn {
  position: fixed;
  bottom: 240px;
  right: 950px;
  width: 300px;
  cursor: pointer;
  text-align: center;
  line-height: 165px;
  font-size: 20px;
  width: 300px;
  height: 180px;
  margin: auto;
  border: 3px solid #686867;
  background-color: rgb(255, 255, 255);
}
.sn:hover{
  background-color: rgb(180, 180, 175);
}
.uf {
  position: fixed;
  bottom: 240px;
  right: 550px;
  width: 300px;
  cursor: pointer;
  text-align: center;
  line-height: 165px;
  font-size: 20px;
  width: 300px;
  height: 180px;
  margin: auto;
  border: 3px solid #686867;
  background-color: rgb(255, 255, 255);
}
.uf:hover{
  background-color: rgb(180, 180, 175);
}
.vh {
  position: fixed;
  bottom: 240px;
  right: 150px;
  width: 300px;
  cursor: pointer;
  text-align: center;
  line-height: 165px;
  font-size: 20px;
  width: 300px;
  height: 180px;
  margin: auto;
  border: 3px solid #686867;
  background-color: rgb(255, 255, 255);
}
.vh:hover{
  background-color: rgb(180, 180, 175);
}

</style>