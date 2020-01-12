<template>
  <section class="userlist">
    <div class="card">
      <div class="card-header">
        <span class="float-right text-muted font-12"><b>107</b> / 195 </span>
        <p class="m-0 h5">User List</p>
      </div>
      <div class="card-body p-0">
        <table class="table table-centered table-nowrap table-striped table-sm table-hover mb-0">
          <thead class="thead-dark">
            <tr class="align-content-center">
              <th scope="col" class="px-1 text-center">#</th>
              <th scope="col" class="px-1 text-right">
                <form>
                  <input type="text" class="form-control form-control-sm" placeholder="Search">
                </form>
              </th>
              <th scope="col" class="px-1"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in list" :key="user.id" class="align-content-center">
              <td class="text-center"><small>{{ user.id }}</small></td>
              <td class="w-100">
                <span>{{ user.name }}</span>
              </td>
              <td class="table-action text-right px-3">
                <a href="/" class="btn btn-warning btn-sm">PRIVAT</a>
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
    list: Array
  }
}
</script>
