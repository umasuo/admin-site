<template>
  <div id="app">
    <router-view></router-view>

    <portal-target name="modals">
      <!--
      for bootstrap modals to inject on, see https://github.com/LinusBorg/portal-vue for more info about this component.
      -->
    </portal-target>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style src="src/scss/main.scss" lang="scss"></style>
