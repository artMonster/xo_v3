<template>
  <section class="userSection">
    <div class="card">
      <div class="card-header p-0">       
        <p class="text-right px-4 mb-0 lead "><b>{{ usersCount }}</b></p>
      </div>
      <div class="card-body p-0">
        <b-list-group>
          <user
            v-for="user in users"
            :key="user.id"
            :user="user"
            :active="user.id === authInfo.id"
            :me="authInfo.email"
            @switch-user="switchUser">
          </user>
        </b-list-group>
      </div>
    </div>
  </section>    
</template>

<script>
import User from './User.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserSection',
  components: { User },
  computed: mapGetters(['users', 'usersCount', 'authInfo']),
  methods: mapActions(['switchUser', 'fetchUsers']),
  async mounted() {
    this.fetchUsers()
  },
}

</script>
