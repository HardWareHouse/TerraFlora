<template>
    <div class="myaccount-content">
      <h3 class="text-xl font-semibold">Billing Address</h3>
      <address>
        <p><strong>Erik Jhonson</strong></p>
        <p>1355 Market St, Suite 900 <br> San Francisco, CA 94103</p>
        <p>Mobile: (123) 456-7890</p>
      </address>
      <a href="#" class="btn btn__bg"><i class="fa fa-edit"></i> Edit Address</a>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .myaccount-content {
    padding: 16px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  address {
    margin: 16px 0;
    font-style: normal;
  }
  
  .btn {
    background-color: #1d4ed8;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    text-decoration: none;
  }
  
  .btn:hover {
    background-color: #2563eb;
  }
  </style>
  