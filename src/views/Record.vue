<template>
  <section id="settings">
      <div>
      <h1> Hey {{userProfile.name}}, Welcome Back!</h1> 
      <h2> You have {{userProfile.calcorie}} left today</h2>
      </div>
    <div class="col1">
        <h2>Breakfast</h2>    
    </div>

    <div class="col1">
        <h2>Lunch</h2>
    </div> 

    <div class="col1">
        <h2>Dinner</h2>
    </div>             

    <div class="col1">
        <h2>Snack</h2>
    </div> 

  </section>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data() {
        return{

        }
    },
    computed:{
        ...mapState(['userProfile'])
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>

</style>