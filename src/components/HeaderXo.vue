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
          </ul>
        </div>
        <ul class="navbar-nav mx-auto">
           <li class="nav-item">
            <a class="nav-link">
              <span class="text-info">
                <b-icon icon="person-fill" aria-hidden="true"></b-icon>
              </span>
              <span class="text-info">
               
              </span>
            </a>
           </li>
            <li class="nav-item">
            <a class="nav-link">
              <span class="text-success">
                <b-icon icon="flag-fill" aria-hidden="true"></b-icon>
              </span>
              <span class="text-success">
               
              </span>
            </a>
          </li>
          <router-link to="/singout" v-slot="{ href, navigate, isActive, isExactActive }">
              <li class="nav-item" >
                <a class="nav-link" :href="href" @click="navigate">
                  <span>
                    <b-icon icon="box-arrow-right" aria-hidden="true"></b-icon>
                  </span>
                  </a>
              </li>
            </router-link>
          </ul>
      </nav>
    </header>
</template>


<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HeaderXo',
  computed: mapGetters(['getAuth']),
}
</script>