<template>
  <section class="userlist">
    <div class="card">
      <div class="card-header">
        <span class="float-right text-muted font-12"><b> 32 </b> / 50 </span>
        <p class="m-0 h5">User List </p>
      </div>
      <div class="card-body p-0">
        <table class="table table-centered table-nowrap table-striped table-sm table-hover mb-0">
          <thead class="thead-dark">
            <tr class="align-content-center">
              <th scope="col" class="px-1 text-center small">Name</th>
              <th scope="col" class="px-1 text-right">
                <form>
                  <input type="text" class="form-control form-control-sm" placeholder="Search">
                </form>
              </th>
              <th scope="col" class="px-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in list.online" :key="user.id" class="align-content-center">
              <td class="text-center">
                <span>{{ user.name }}</span>
              </td>
              <td class="w-100 text-muted"><small>{{ user.id }}</small></td>
              <td class="table-action text-right px-3">
                <button type="button" @click="setPrivatMessageUsers(user.name)" class="btn btn-warning btn-sm">PRIVAT</button>
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
export default {
  name: 'UserList',
  props: {
    // только проверка типа
    height: Array,
    // проверка типа и другие правила валидации
    list: {
      default: 0,
      required: true,
    }
  },
    methods: {
      setPrivatMessageUsers (name) {
        this.$emit("setPrivatMessageUsers", name)
      }
    },
}
</script>
