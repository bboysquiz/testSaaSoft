<template>
  <main class="app">
    <AccountManager class="app__content" />
  </main>
</template>
<script setup lang="ts">
import AccountManager from './features/accounts/ui/AccountsManager.vue';


</script>

<style scoped lang="sass">
.app
  min-height: 100vh
  display: flex
  justify-content: center
  padding: 24px
  background-color: #fff
  &__content
    width: 100%
    max-width: 1100px
</style>