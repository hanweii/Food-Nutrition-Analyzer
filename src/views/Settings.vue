<template>
  <section id="settings">
    <div class="col1">
      <h3>Profile</h3>
      <p>Update your profile</p>

      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>

      <div>
        <h3> Your BMR is {{userProfile.calcorie}}</h3>
      </div>
      <form @submit.prevent>
        <label for="name">Name</label>
        <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />

        <label for="gender">Gender</label>
        <select v-model="gender" id="gender">
          <option disabled value="">Please select one</option>
          <option>Male</option>
          <option>Female</option>
          <option>Non-Binary</option>
        </select>

        <label for="weight">Weight (kg)</label>
        <input v-model.trim="weight" type="text" :placeholder="userProfile.weight" id="weight" />

        <label for="height">Height (cm)</label>
        <input v-model.trim="height" type="text" :placeholder="userProfile.height" id="height" />

        <label for="exercise">Activity Factor</label>
        <select v-model="exercise">
          <option v-for="option in options" v-bind:key="option.text" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>

        <label for="age">Age</label>
        <input v-model.trim="age" type="text" :placeholder="userProfile.age" id="age" />

        <label for="targetWeight">Target Weight</label>
        <input v-model.trim="targetWeight" type="text" :placeholder="userProfile.targetWeight" id="targetWeight" />
      
        <button @click="updateProfile()" class="button">Update Profile</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      name: '',
      gender:'',
      height:'',
      weight:'',
      age:'',
      exercise: 1.2,
      options: [
        { text: 'little or no exercise', value: 1.2 },
        { text: 'light exercise/sports 1-3 days/week', value: 1.375 },
        { text: 'moderate exercise/sports 3-5 days/week', value: 1.55 },
        { text: 'hard exercise/sports 6-7 days a week', value: 1.725},
        { text: 'very hard exercise/sports & physical job or 2x training', value: 1.9}
      ],
      targetWeight:'',
      showSuccess: false
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name,
        gender: this.gender !== '' ? this.gender : this.userProfile.gender,
        weight: this.weight !== '' ? this.weight : this.userProfile.weight,
        height: this.height !== '' ? this.height : this.userProfile.height,
        age: this.age !== '' ? this.age : this.userProfile.age,
        exercise: this.exercise,
        targetWeight : this.targetWeight !== '' ? this.targetWeight : this.userProfile.targetWeight
      })

      this.name = ''
      this.weight = ''
      this.height = ''
      this.age = ''
      this.targetWeight = ''

      this.showSuccess = true

      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  }
}
</script>
