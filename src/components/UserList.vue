<template>
  <div class="hello">
    <h1> UserList </h1>
    <ul class="underlist">
        <li>ID : Name : Time Stamp </li>
        <li v-for="user in list" :key="user.id">
            <span>{{ user.id }} | {{ user.name }} | {{ user.timeStamp }} </span>
        </li>
    </ul>
  </div>    
</template>

<script>
export default {
  name: 'UserList',
  props: {
    list: Object
  }
}
</script>
