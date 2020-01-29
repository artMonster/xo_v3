<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
  },
  components: {
    EmptyLayout, MainLayout
  }
}
</script>
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
.list-group-item+.list-group-item.active *,
.list-group-item.active:first-child * {
  color: #ffffff !important;
}
.card-header {
  background-color: transparent;
  border: none !important;
}
.card,
.list-group-item {
  border: none !important;
}
.list-group-item {
  cursor: pointer;
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
.custom-control-label::before,
.custom-control-label::after,
.custom-control-input,
.custom-control,
.custom-control-label {
  width: 3rem;
  height: 3rem;
}
.custom-control {
  padding: 0;
  margin-top: .5rem;
  margin-bottom: .5rem;
  margin-left: auto;
  margin-right: auto;
  height: 4rem;
}
.custom-control-label::before,
.custom-control-label::after {
  left: calc(50% - 1.5rem);
  top: 20px;
  margin-bottom: 0;
  border: none;
}
.custom-control-input:disabled~.custom-control-label::before,
.custom-control-input[disabled]~.custom-control-label::before {
  background-color: #28a745;
}
dd {
  margin: 0;
}
.border-success .custom-control-label::before {
  border: 5px solid green !important
}
</style>