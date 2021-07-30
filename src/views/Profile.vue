<template>
  <div class="profile">
    <form @submit.prevent>
      <h2> Your BMR is {{userProfile.calcorie}}</h2>
      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>
      <div class="row">
        <h4 class="basic-info">Account</h4>
        
        <div class="input-group input-group-icon">
          <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" />
          <div class="input-icon">
            <i class="fas fa-user"></i>
          </div>
        </div>
        <div class="input-group input-group-icon">
          <input type="text" placeholder="Email" id="email" />
          <div class="input-icon">
            <i class="fas fa-envelope"></i>
          </div>
        </div>
        <div class="input-group input-group-icon">
          <input type="text" placeholder="PassWord" id="password" />
          <div class="input-icon">
            <i class="fas fa-key"></i>
          </div>
        </div> 
      </div>

      <div class="row">
        <h4>Profile</h4>
        <div class="input-group input-group-icon">
          <input v-model.trim="weight" type="text" :placeholder="'Weight: '+userProfile.weight + 'KG'" id="weight" />
          <div class="input-icon">
            <i class="fas fa-weight"></i>
          </div>
        </div>
        <div class="input-group input-group-icon">
          <input v-model.trim="height" type="text" :placeholder="'Height: '+userProfile.height + 'CM'" id="height" />
          <div class="input-icon">
            <i class="fas fa-child"></i>
          </div>
        </div>
        <div class="input-group input-group-icon">
          <input v-model.trim="age" type="text" :placeholder="'Age: '+ userProfile.age" id="age" />
          <div class="input-icon">
            <i class="fas fa-calendar-alt"></i>
          </div>
        </div> 
        <div class="input-group input-group-icon">
          <input v-model.trim="targetWeight" type="text" :placeholder="'Target Weight: '+ userProfile.targetWeight" id="targetWeight" />
          <div class="input-icon">
            <i class="fas fa-bullseye"></i>
          </div>
        </div>
        <div class="input-group input-group-icon">
          <select v-model="gender" id="gender">
            <option disabled value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div class="input-group input-group-icon">
          <select v-model="exercise">
            <option v-for="option in options" v-bind:key="option.text" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <button @click="updateProfile()" class="button">Update</button>
    </form>
  </div>
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
