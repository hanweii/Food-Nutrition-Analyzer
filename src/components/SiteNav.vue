<template>
<header>
  <section>
    <router-link to="/" id="logo">Food Nutrition Analyzer</router-link>
    <label for="toggle-1" class="toggle-menu"><ul><li></li> <li></li> <li></li></ul></label>
    <input type="checkbox" id="toggle-1">
    <nav>
      <ul>
        <li>
          <router-link to="/"><i class="fas fa-home"></i>Home</router-link>
        </li>
        <li>
          <router-link to="/profile"><i class="far fa-user-circle"></i>Profile</router-link>
        </li>
        <li>
          <router-link to="/record"><i class="fas fa-edit"></i>Record</router-link>
        </li>
        <li>
          <a @click="logout()"><i class="fas fa-sign-out-alt"></i>logout</a>
        </li>
      </ul>
    </nav>
  </section>
</header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
