<script setup>
const colorMode = useColorMode();
colorMode.preference = "light";
</script>
<template>
  <UApp>
    <NuxtPage />
    <UNotifications />
  </UApp>
</template>
