<template>
    <header>
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-collapse">
          <ul class="navbar-nav mr-auto" id="navbarMain">
            <router-link to="/" v-slot="{ href, route, navigate, isActive, isExactActive }">
              <li :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
                <a class="nav-link" :href="href" @click="navigate">Lobby</a>
              </li>
            </router-link>
            <router-link to="/room" v-slot="{ href, route, navigate, isActive, isExactActive }">
              <li :class="[isActive && 'nav-item router-link-active', isExactActive && 'nav-item router-link-exact-active']">
                <a class="nav-link" :href="href" @click="navigate">Room</a>
              </li>
            </router-link>
            <router-link to="/about" v-slot="{ href, route, navigate, isActive, isExactActive }">
              <li :class="[isActive && 'nav-item router-link-active', isExactActive && 'nav-item router-link-exact-active']">
                <a class="nav-link" :href="href" @click="navigate">About</a>
              </li>
            </router-link>
          </ul>
        </div>
        <ul class="navbar-nav mx-auto">
           <li class="nav-item">
            <a class="nav-link text-white"><strong>{{ userName }}</strong></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" >
              <img :src="userPic" height="24" class="rounded-circle" :alt="userName">
            </a>
          </li>
          <router-link to="/singout" v-slot="{ href, route, navigate, isActive, isExactActive }">
              <li :class="[isActive && 'nav-item router-link-active', isExactActive && 'nav-item router-link-exact-active']" >
                <a class="nav-link" :href="href" @click="navigate">SingOut</a>
              </li>
            </router-link>
          </ul>
      </nav>
    </header>
</template>


<script>
export default {
  name: 'HeaderXo',
  data() {
    return {
      userName: this.$route.params.userName,
      userPic: 'https://coderthemes.com/hyper/creative/assets/images/users/avatar-2.jpg'
    }
  }
}

</script>