<template>
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="navbar-collapse">
        <ul class="navbar-nav mx-auto" id="navbarMain">
          <router-link to="/" v-slot="{ href, route, navigate, isActive, isExactActive }">
            <li :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active']">
              <a class="nav-link" :href="href" @click="navigate">Lobby</a>
            </li>
          </router-link>
          <router-link to="/about" v-slot="{ href, route, navigate, isActive, isExactActive }">
            <li :class="[isActive && 'nav-item router-link-active', isExactActive && 'nav-item router-link-exact-active']">
              <a class="nav-link" :href="href" @click="navigate">About</a>
            </li>
          </router-link>
          <router-link to="/singout" v-slot="{ href, route, navigate, isActive, isExactActive }">
            <li :class="[isActive && 'nav-item router-link-active', isExactActive && 'nav-item router-link-exact-active']" >
              <a class="nav-link" :href="href" @click="navigate">SingOut</a>
            </li>
          </router-link>
        </ul>
        </div>
      </nav>
    </header>
</template>

<script>
export default {
  name: 'HeaderXo',
}
</script>