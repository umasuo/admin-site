<template>
  <ul class="nav side-menu">
    <li class="parent-menu" :class="{ active: isCurrent }">
      <!-- Render a top level nav link if menu has toName -->
      <router-link v-if="menu.toName" :to="{ name: menu.toName }">
        <i class="fa" :class="menu.faIcon"></i> {{ menu.title }}</span>
      </router-link>

      <!-- Render a normal a tag if menu item have toHref field -->
      <a v-else-if="menu.toHref" :href="menu.toHref" target="_blank">
        <i class="fa" :class="menu.faIcon"></i> {{ menu.title }}</span>
      </a>

      <!-- else render submenus -->
      <template v-else>
        <a @click="isOpen = !isOpen">
          <i class="fa" :class="menu.faIcon"></i> {{ menu.title }} <span class="fa fa-chevron-down" :class="isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></span>
        </a>
        <ul class="nav child_menu" v-show="isOpen">

          <!-- Render a normal a tag if menu item have toHref field -->
          <template v-for="menu in menu.subMenu">
            <a v-if="menu.toHref" :href="menu.toHref" :key="menu.toName">{{ menu.name }}</a>

            <!-- else render a router-link -->
            <router-link v-else
                         tag="li"
                         :key="menu.toName"
                         :to="{ name: menu.toName }" exact>
              <a>{{ menu.name }}</a>
            </router-link>
          </template>

        </ul>
      </template>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'NavMenu',

    props: ['menu'],

    data () {
      return {
        isOpen: false
      }
    },

    computed: {
      isCurrent () {
        const routeName = this.$route.name

        if (this.menu.toHref) {
          return false // normal a tag will open link in new page, and don't trigger vue router change.
        } else if (this.menu.toName) {
          return this.menu.toName === routeName
        } else {
          const matched = this.menu.subMenu.filter((menu) => {
            return menu.toName === routeName
          }).length >= 1
          this.isOpen = matched
          return matched
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
