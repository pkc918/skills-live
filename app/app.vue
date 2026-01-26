<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">

const { data } = await useFetch('/api/version');
console.log(data.value);
</script>