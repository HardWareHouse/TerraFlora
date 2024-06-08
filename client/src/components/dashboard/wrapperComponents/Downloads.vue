<template>
    <div class="myaccount-content">
      <h3 class="text-xl font-semibold">Downloads</h3>
      <div class="myaccount-table table-responsive text-center">
        <table class="table-auto w-full">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-4 py-2">Product</th>
              <th class="px-4 py-2">Date</th>
              <th class="px-4 py-2">Expire</th>
              <th class="px-4 py-2">Download</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">Flowers daisy pink stick</td>
              <td class="border px-4 py-2">Aug 22, 2023</td>
              <td class="border px-4 py-2">Yes</td>
              <td class="border px-4 py-2"><a href="#" class="btn btn__bg"><i class="fa fa-cloud-download"></i> Download File</a></td>
            </tr>
            <tr>
              <td class="border px-4 py-2">Orchid flower red stick</td>
              <td class="border px-4 py-2">Sep 12, 2023</td>
              <td class="border px-4 py-2">Never</td>
              <td class="border px-4 py-2"><a href="#" class="btn btn__bg"><i class="fa fa-cloud-download"></i> Download File</a></td>
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
  