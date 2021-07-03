<template>
  <div id="login">
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
    <section>
      <div class="col1">
        <h1>Food Image Classifier and Food Nutrition Analyzer</h1>
        <p> Welcome to the food nutrition analyzer! Feel free to upload your meal's picture and to get its nutrition details. 
          You can also provide us your body information so that we can calculate your expected calory should be intake every day. 
          This web app powered by Vue.js, Node.js, and Firebase.</p>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <label for="email1">Email</label>
            <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
          </div>
          <div>
            <label for="password1">Password</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
          </div>
          <button @click="login()" class="button">Log In</button>
          <div class="extras">
            <a @click="togglePasswordReset()">Forgot Password</a>
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name">Name</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Name" id="name" />
          </div>
          <div>
            <label for="email2">Email</label>
            <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
          </div>
          <div>
            <label for="password2">Password</label>
            <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
          </div>

          <h1>Your profile</h1>
          <div>
            <label for="gender">Gender</label>
            <select v-model="signupForm.gender" id="gender">
              <option disabled value="">Please select one</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-Binary</option>
            </select>
          </div>

          <div>
            <label for="weight">Weight (kg)</label>
            <input v-model.trim="signupForm.weight" type="text" placeholder="Please enter weight in kg" id="weight" />
          </div>

          <div>
            <label for="height">Height (cm)</label>
            <input v-model.trim="signupForm.height" type="text" placeholder="Please enter height in centermeters" id="height" />
          </div>

          <div>
            <label for="exercise">Activity Factor</label>
            <select v-model="signupForm.exercise">
              <option v-for="option in options" v-bind:key="option.text" v-bind:value="option.value">
                {{ option.text }}
              </option>
            </select>
            <span>{{signupForm.exercise}}</span>
          </div>

          <div>
            <label for="age">Age</label>
            <input v-model.trim="signupForm.age" type="text" id="age" />
          </div>

          <div>
            <label for="targetWeight">Target Weight</label>
            <input v-model.trim="signupForm.targetWeight" type="text" id="targetWeight" />
          </div>

          <button @click="signup()" class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'

export default {
  components: {
    PasswordReset
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        email: '',
        password: '',
        gender:'',
        height:'',
        weight:'',
        age:'',
        exercise: 1.2,
        targetWeight:''
      },
      options: [
          { text: 'little or no exercise', value: 1.2 },
          { text: 'light exercise/sports 1-3 days/week', value: 1.375 },
          { text: 'moderate exercise/sports 3-5 days/week', value: 1.55 },
          { text: 'hard exercise/sports 6-7 days a week', value: 1.725},
          { text: 'very hard exercise/sports & physical job or 2x training', value: 1.9}
      ],
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    },
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        gender:this.signupForm.gender,
        height:this.signupForm.height,
        weight:this.signupForm.weight,
        age:this.signupForm.age,
        exercise: this.signupForm.exercise,
        targetWeight:this.signupForm.targetWeight
      })
    }
  }
}
</script>
