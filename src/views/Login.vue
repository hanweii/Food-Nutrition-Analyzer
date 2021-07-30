<template>
  <div id="login">
      

    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>

    <div class="container" :class="{'right-panel-active': panelActive}" id="loginContainer">
      <div class="form-container sign-in-container">
        <form @submit.prevent>
            <h1>Sign In</h1>
            <input v-model.trim="loginForm.email" type="text" placeholder="Email" id="email1" />
            <input v-model.trim="loginForm.password" type="password" placeholder="Password" id="password1" />

            <a href="#" @click="togglePasswordReset()">Forgot Password</a>

          <button @click="login()" class="button">Log In</button>
          
        </form>
      </div>

      <div class="form-container sign-up-container">
        <form @submit.prevent>
          <h1>Create Your Account</h1>
          <input v-model.trim="signupForm.name" type="text" placeholder="Name" id="name" />

          <input v-model.trim="signupForm.email" type="text" placeholder="Email" id="email2" />

          <input v-model.trim="signupForm.password" type="password" placeholder="Password (min 6 characters)" id="password2" />

          <button @click="signup()" class="button">Sign Up</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To continue, please login with your email and password</p>
            <button @click="switchPanel()" class="ghost">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>
              Welcome to the food nutrition analyzer! Feel free to upload your meal's picture and to get its nutrition details. 
              You can also provide us your body information so that we can calculate your expected calory should be intake every day. 
              This web app powered by Vue.js, Node.js, and Firebase.
            </p>
            <button @click="switchPanel()" class="ghost">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
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
      showPasswordReset: false,
      panelActive: false
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
    },
    switchPanel() {
      this.panelActive = !this.panelActive
    }

  }
}
</script>
