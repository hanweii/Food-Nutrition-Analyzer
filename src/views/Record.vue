<template>
  <div class="record">
    <div class="jumbotron">
        <h1>{{userProfile.name}}, What's on your mind?</h1>
        <p class="lead">You have {{userProfile.calcorie - dailyNutrition.Calcorie}} left.</p>
        <p class="lead">Happiness lies, first of all, in health.</p>
        <button @click="search()" class="button" role="button">RECORD</button>
    </div>
    <div v-if="dailyNutrition.food">
        <div v-for="(item, index) in dailyNutrition.food" :key="item.id">
            <div class="container">
                <p>{{ index }} with <b>{{item}}</b> calcorie</p>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="container">
            <p>You haven't recorded any food yet!</p>
        </div>
        
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data() {
        return{

        }
    },
    computed:{
        ...mapState(['userProfile', 'dailyNutrition'])
    },
    methods:{
        search(){
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
