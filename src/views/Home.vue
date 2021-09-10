<template>

    <div class="jumbotron">
      <div class="container">
        <h1 class="display-4">Hello, {{userProfile.name}}!</h1>
        <p class="lead">Love yourself enough to live a healthy lifestyle.</p>
        
        <hr class="my-4">

        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Search Food By Picture</h5>
                <button @click="upload()" class="button "><i class="fas fa-search"></i>Search</button>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Search Food By Name</h5>
                <button @click="searchName()" class="button"><i class="fas fa-search"></i>Search</button>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">View History</h5>
                <button @click="history()" class="button"><i class="fas fa-history"></i>View</button>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'
  export default {
    computed: {
    ...mapState(['userProfile'])
    },
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
