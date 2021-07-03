import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

const calculateCalorie =(gender,weight, height, age, exercise) =>{
  if(gender == "Male"){
    console.log("male")
    return ((10 * weight) + (6.25 * height) - (5 * age) + 5)*exercise
  }else{
    console.log("female")
    return ((10 * weight) + (6.25 * height) - (5 * age) - 161)*exercise
  }
}

// realtime firebase for post
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setPosts', postsArray)
})



const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    birthday: {}
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    },
    setPosts(state, val) {
      state.posts = val
    },
    setBirthday(state, val){
      state.birthday = val
    }
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
      let postsArray = []
      const birthday1 = await fb.dailyNutritionCollection.where('userid', '==', userId).get()
      birthday1.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        let post = doc.data()
        post.id = doc.id

        postsArray.push(post)
      });

      // set user profile in state
      commit('setUserProfile', userProfile.data())
      commit('setBirthday', postsArray)

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
    async createPost({ state, commit }, post) {
      // create post in firebase
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        comments: 0,
        likes: 0
      })
    },
    async likePost ({ commit }, post) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${post.id}`

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { return }

      // create post
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })

      // update post likes count
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1
      })
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      
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
    }
  }
})

export default store
