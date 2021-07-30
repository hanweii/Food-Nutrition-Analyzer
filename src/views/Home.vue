<template>

    <div class="jumbotron">
      <div class="container">
        <h1 class="display-4">Hello, {{userProfile.name}}!</h1>
        <p class="lead">I am not sure what to put here. But seems like we can put something inspriational.</p>
        
        <hr class="my-4">

        <div class="row">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Search Food By Picture</h5>
                <a @click="upload()" class="btn "><i class="fas fa-search"></i>Search</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Search Food By Name</h5>
                <a @click="searchName()" class="btn "><i class="fas fa-search"></i>Search</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">View History</h5>
                <a @click="history()" class="btn "><i class="fas fa-history"></i>View</a>
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
