<template>
  <section class="userlist">
    <div class="card">
      <div class="card-header bg-dark px-3 py-2">
        <div class="row align-items-center">
          <div class="col"><span class="h4 font-weight-light text-secondary">UserList</span></div>
          <div class="col-auto text-muted"><b> {{ userCount }} </b> /  ??? </div>
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table table-centered table-nowrap table-sm table-hover mb-0">
          <tbody>
            <tr v-for="user in allUsers" :key="user.id" class="align-content-center">
              <td class="w-75 px-3">
                <p class="m-0 lead">{{ user.email }}</p>
                <p class="m-0 text-muted small"><small><b>id:</b> {{ user.id }}</small></p>
              </td>
              <td class="w-25 table-action text-right px-3 ">
                <button type="button" class="btn btn-outline-dark btn-sm"><span class="h4"><b-icon icon="chat-fill" aria-hidden="true"></b-icon></span></button>
                <!-- <button type="button" @click="setPrivatMessageUsers(user.name)" class="btn btn-warning btn-sm">PRIVAT</button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div> <!-- end card body-->
    </div> <!-- end card -->
  </section>    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserList',
  computed: mapGetters(['users', 'currentUser', 'usersCount']),
  methods: mapActions(['switchUser'])
    
}

</script>
