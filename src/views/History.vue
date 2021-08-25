<template>
  <div class="inner1">

    <vsa-list >
    <!-- Here you can use v-for to loop through items  -->
      <vsa-item  v-for="post in birthday.slice().reverse()" :key="post.id">
        <vsa-heading >
          <h5>{{ getDate(post.date) }}</h5>
        </vsa-heading>

        <vsa-content style="background:#ffffff">
          <h5 >{{ post.food[0] }}</h5>
          <h5 >{{ post.food[1] }}</h5>
        </vsa-content>
      </vsa-item>
    </vsa-list>
      
  </div>
  
  
</template>

<script>
import { commentsCollection } from '@/firebase'
import { profileCollection } from '@/firebase'
import { mapState } from 'vuex'
import moment from "moment"


export default {
  
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['userProfile', 'posts','birthday'])
  },
  methods:{
    getDate(datetime) {
      let myDate = new Date(datetime.seconds * 1000)
      let myDay = moment(myDate, 'x').format('yyyy-MM-DD')
      return myDay
    }
  }
}

</script>



<style lang="scss" scoped>
	.inner {
		background: #ffffff;
    width: 1500px;
    
	}
  .inner1 {
		margin-left: 50px;
    margin-right: 40px;
    margin-top: 40px;

	}


</style>