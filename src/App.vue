<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<style>

@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

.table th, .table td, .table thead th {
    vertical-align: middle;
}
.table thead th {
  border: none;
}
.border {
  border-width: 4px !important;
}

.text-wrap {
    border-radius: 3px;
    display: inline-block;
    position: relative;
    text-align: left;
    padding: 0.25rem 0.75rem 0 0.75rem;
}
svg {
  display: inherit;
}
</style>
