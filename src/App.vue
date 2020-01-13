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
.media-body .ctext-wrap {
  background: #f1f3fa;
    border-radius: 3px;
    display: inline-block;
    position: relative;
    margin-left: 1rem;
    text-align: left;
    padding: 0.25rem 0.75rem 0 0.75rem;
}
.media-privat .media-body {
  text-align: right;
  margin-right: 1rem;
  margin-left: 0;
}
.media-privat .media-body .ctext-wrap {
  background: #fef5e4;
}
.media-privat .media-body .ctext-wrap:after {
    left: 99%;
    top: 0;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-top-color: #fef5e4;
    border-width: 6px;
    margin-right: -1px;
    border-left-color: #fef5e4;
}
.media-body .ctext-wrap:after {
    right: 99%;
    top: 0;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-top-color: #f1f3fa;
    border-width: 6px;
    margin-right: -1px;
    border-right-color: #f1f3fa;
}
</style>
