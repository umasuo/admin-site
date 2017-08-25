<template>
  <div class="x_panel">
    <div class="x_title">

      <ul class="nav nav-tabs bar_tabs" role="tablist">
        <li role="presentation" :class="{ 'active': tab.isActive }" v-for="tab in tablist">
          <a href="javascript:;" role="tab" @click="changeActive(tab)">{{ tab.title }}</a>
        </li>
      </ul>

      <div class="clearfix"></div>
    </div>

    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tablist: [],
        activeTab: null
      }
    },

    mounted () {
      this.$children.forEach(c => {
        this.tablist.push(c)
        if (c.isActive) this.activeTab = c
      })
    },

    methods: {
      changeActive (newActiveTab) {
        this.activeTab.isActive = false
        this.activeTab = newActiveTab
        newActiveTab.isActive = true
      }
    }
  }
</script>

<style lang="scss">
</style>
