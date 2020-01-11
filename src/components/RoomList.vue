<template>
  <div class="hello">
    <h1> Room List</h1>
    <ul>
      <li><p>ID : isOpen : PlayerX : PlayerO</p></li>
      <li v-for="room in list" :key="room.id">
        <p>{{ room.id }} | {{ room.isOpen }} | {{ room.playerX }} | {{ room.playerO }}</p>
      </li>
    </ul>
  </div>    
</template>

<script>
export default {
  name: 'RoomList',
  props: {
    list: Object
  }
}
</script>
