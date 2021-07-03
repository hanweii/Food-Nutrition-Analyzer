<template>
  <div>
    <h5>{{ userProfile.name }}</h5>
    <h5>{{ birthday.length }}</h5>
          <div v-for="post in birthday" :key="post.id" class="post">
            <h5>{{ post.breakfast[0] }}</h5>
            <h5>{{ post.breakfast[1] }}</h5>
          </div>

  </div>
</template>

<script>
import { commentsCollection } from '@/firebase'
import { profileCollection } from '@/firebase'
import { mapState } from 'vuex'

export default {
  
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['userProfile', 'posts','birthday'])
  }
}
</script>

<style lang="scss" scoped>

</style>