<template>
    <div class="myaccount-content">
      <h3 class="text-xl font-semibold">Orders</h3>
      <div class="myaccount-table table-responsive text-center">
        <table class="table-auto w-full">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-2">Order</th>
              <th class="px-4 py-2">Date</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Total</th>
              <th class="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">1</td>
              <td class="border px-4 py-2">Aug 22, 2023</td>
              <td class="border px-4 py-2">Pending</td>
              <td class="border px-4 py-2">$3000</td>
              <td class="border px-4 py-2"><a href="cart.html" class="btn btn__bg">View</a></td>
            </tr>
            <tr>
              <td class="border px-4 py-2">2</td>
              <td class="border px-4 py-2">July 22, 2023</td>
              <td class="border px-4 py-2">Approved</td>
              <td class="border px-4 py-2">$200</td>
              <td class="border px-4 py-2"><a href="cart.html" class="btn btn__bg">View</a></td>
            </tr>
            <tr>
              <td class="border px-4 py-2">3</td>
              <td class="border px-4 py-2">June 12, 2023</td>
              <td class="border px-4 py-2">On Hold</td>
              <td class="border px-4 py-2">$990</td>
              <td class="border px-4 py-2"><a href="cart.html" class="btn btn__bg">View</a></td>
            </tr>
          </tbody>
        </table>
      </div>
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
  
  .myaccount-table {
    margin-top: 16px;
  }
  
  .table-auto {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: center;
    border: 1px solid #ddd;
  }
  
  thead {
    background-color: #f7fafc;
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