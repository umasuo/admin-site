<template>
  <div role="tabpanel" class="tab-pane" v-if="isActive" :class="{ 'active': isActive }" aria-labelledby="home-tab">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabPanelItem',

    props: ['title', 'active'],

    data () {
      return {
        isActive: this.active
      }
    }
  }
</script>

<style lang="scss">
</style>
