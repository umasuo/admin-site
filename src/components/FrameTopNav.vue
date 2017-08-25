<template>
  <!-- top navigation -->
  <div class="top_nav">
    <div class="nav_menu">
      <nav class="" role="navigation">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="javascript:;" data-toggle="dropdown" aria-expanded="false" class="user-profile dropdown-toggle">
              Admin
              <span class=" fa fa-angle-down"></span>
            </a>
            <ul class="dropdown-menu dropdown-usermenu pull-right">
              <li><a href="javascript:;" @click="signout"><i class="fa fa-sign-out pull-right"></i> {{$t('auth.logout')}}</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <!-- /top navigation -->
</template>

<script>
  import api from 'src/api'

  export default {
    name: 'TopNav',

    methods: {
      signout () {
        api.developer.signout()
        this.$router.push({name: 'Signin'})
      }
    }
  }
</script>

<style lang="scss">
</style>
