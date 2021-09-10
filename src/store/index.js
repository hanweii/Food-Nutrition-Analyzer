import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
import * as firebase from 'firebase/app'

Vue.use(Vuex)

// get today's date, need to fix to get local time, now everything is in UTC
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var todayStr = yyyy+"-"+mm+"-"+dd
console.log(yyyy+"-"+mm+"-"+dd)

// let todayString = new Date().toISOString().slice(0, 10)
// console.log(todayString)
// let today = new Date(todayString)

// calculate personal BMR
const calculateCalorie =(gender,weight, height, age, exercise) =>{
  if(gender == "Male"){
    return ((10 * weight) + (6.25 * height) - (5 * age) + 5)*exercise
  }else{
    return ((10 * weight) + (6.25 * height) - (5 * age) - 161)*exercise
  }
}

const store = new Vuex.Store({
  state: {
    userProfile: {},
    dailyNutrition:{},
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setDailyNutrition(state, val){
      state.dailyNutrition = val
    },
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      
      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        gender:form.gender,
        height:form.height,
        weight:form.weight,
        age:form.age,
        exercise: form.exercise,
        targetWeight:form.targetWeight,
        calcorie: calculateCalorie(form.gender, form.weight, form.height, form.age, form.exercise),
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      const userId = fb.auth.currentUser.uid

      const getDailyNutrition = await fb.dailyNutritionCollection
      .where('userid', '==', userId)
      .where('date', '==', todayStr)
      .get()
      
      if(getDailyNutrition.empty){
        const newDailyNutritionID = await fb.dailyNutritionCollection.add({
          userid: userId,
          date: todayStr,
          food:{},
          Calcorie: 0.
        })
        const newDailyNutrition = await fb.dailyNutritionCollection.doc(newDailyNutritionID.id).get()
        commit('setDailyNutrition', newDailyNutrition.data())
      }else{
        getDailyNutrition.forEach(doc => {
          console.log(doc.id)
          let item = doc.data()
          commit('setDailyNutrition', item)
        })
      }
            
      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut()

      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      router.push('/login')
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      
      console.log(calculateCalorie(user.gender,user.weight, user.height,user.age, user.exercise ))
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        gender:user.gender,
        height:user.height,
        weight:user.weight,
        age:user.age,
        exercise: user.exercise,
        targetWeight:user.targetWeight,
        calcorie: calculateCalorie(user.gender,user.weight, user.height,user.age, user.exercise ),
      })


      dispatch('fetchUserProfile', { uid: userId })
    },
    async recordFood({dispatch}, foodItem){
      const userId = fb.auth.currentUser.uid
      const getDailyNutrition = await fb.dailyNutritionCollection
      .where('userid', '==', userId)
      .where('date', '==', todayStr)
      .get()

      getDailyNutrition.forEach(async doc => {
        console.log(doc.id)
        var  originalCal = doc.data()["Calcorie"]
        const dailyNutritionRef = await fb.dailyNutritionCollection.doc(doc.id).update({
          [`food.${foodItem.name}`]: foodItem.energy,
          Calcorie: originalCal+foodItem.energy
        })
      })

      dispatch('fetchUserProfile', { uid: userId })
    }
  }
})

export default store

