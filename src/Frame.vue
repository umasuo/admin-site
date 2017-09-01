<template>
  <div class="container body">
    <div class="main_container">
      <div class="col-md-3 left_col menu_fixed">
        <div class="left_col scroll-view">
          <div class="navbar nav_title" style="border: 0;">
            <router-link :to="{ name: 'Dashboard' }" class="site_title">
              <svg class="brand-logo" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 182 141" style="enable-background:new 0 0 182 141;fill:white;" xml:space="preserve">
                <path d="M85,18.7c-52.1,0-84.9,37.7-84.9,71s38,50.6,84.9,50.6c46.9,0,84.9-17.3,84.9-50.6S137.9,18.7,85,18.7zM85.1,132.1c-40.7,0-74.7-15-74.7-43.9S40,27.5,85.1,27.5c46,0,74.7,31.9,74.7,60.8S125.8,132.1,85.1,132.1z"/>
                <path style="opacity:0.302;" d="M84.3,39.3c-40.1,0-65.4,25.7-65.4,49c0,23.3,29.3,35.4,65.4,35.4s65.4-12.1,65.4-35.4C149.7,65,125.1,39.3,84.3,39.3z"/>
                <path d="M169.1,38c-1.5-13.6-12.8-24.1-26.6-24.6c-0.3,0-0.5-0.1-0.8-0.1l-2.5,0.1c-2.1,0.1-3.7,1.8-3.6,3.9c0.1,2.1,1.8,3.7,3.9,3.6l1.3,0v0c11.1-0.4,20.5,8.3,20.9,19.4h0l0,1.3c0.1,2.1,1.8,3.7,3.9,3.6c2.1-0.1,3.7-1.8,3.6-3.9l-0.1-2.5C169.2,38.5,169.1,38.2,169.1,38z M181.8,38.3c0-0.1,0-0.3-0.1-0.4c-1.6-20.9-19.1-37.1-40-37.1c-0.1,0-0.3,0-0.4,0l-1.3,0h0l-1.3,0c-2.1,0.1-3.7,1.8-3.6,3.9c0.1,2.1,1.8,3.7,3.9,3.6l1.3,0v0h0c18.1-0.7,33.3,13.4,34,31.5l0,1.3c0.1,2.1,1.8,3.7,3.9,3.6c2.1-0.1,3.7-1.8,3.6-3.9L181.8,38.3z"/>
                <path d="M59.5,67.9c-8-2-15.3-0.2-16.3,4c-1.1,4.2,4.6,9.2,12.5,11.2c8,2,15.3,0.2,16.3-4C73,74.9,67.4,69.9,59.5,67.9z M124.3,71.9c-1.1-4.2-8.4-6-16.3-4c-8,2-13.6,7-12.5,11.2c1.1,4.2,8.4,6,16.3,4C119.7,81.2,125.3,76.1,124.3,71.9z"/>
              </svg>
              <span class="brand-text">Eva Cloud Admin</span>
            </router-link>
          </div>

          <div class="clearfix"></div>

          <br/>

          <!-- sidebar menu -->
          <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
            <div class="menu_section">
              <NavMenu v-for="subMenu in menu" :menu="subMenu" :key="subMenu.toName"></NavMenu>
            </div>
          </div>
          <!-- /sidebar menu -->

          <div class="sidebar-footer">
            {{$t('app.icp_license')}}
          </div>
        </div>
      </div>

      <TopNav></TopNav>

      <!-- page content -->
      <div class="right_col" role="main">
        <!-- router view -->
        <router-view></router-view>
      </div>
      <!-- /page content -->

      <!-- footer content -->
      <footer>
        {{$t('app.console_footer')}}
        <div class="clearfix"></div>
      </footer>
      <!-- /footer content -->
    </div>
  </div>
</template>

<script>
  import NavMenu from 'src/components/FrameNavMenu'
  import TopNav from 'src/components/FrameTopNav'

  export default {
    name: 'Frame',

    data () {
      return {
        menu: [
          {
            title: this.$t('nav.dashboard'),
            faIcon: 'fa-tachometer',
            toName: 'Dashboard'
          },
          {
            title: this.$t('nav.product_types'),
            faIcon: 'fa-tablet',
            toName: 'ProductTypes'
          },
          {
            title: this.$t('nav.developers'),
            faIcon: 'fa-users',
            toName: 'DevelopersManager'
          },
          {
            title: this.$t('nav.applications'),
            faIcon: 'fa-file',
            toName: 'ApplicationsManager'
          }
          // {
          //   title: this.$t('nav.documentation'),
          //   faIcon: 'fa-book',
          //   toHref: 'https://umasuo.gitbooks.io/eva/content/'
          // }
        ]
      }
    },

    components: {
      NavMenu,
      TopNav
    }
  }
</script>

<style lang="scss">
  .brand-logo,
  .brand-text {
    color: white;
    vertical-align: middle;
    line-height: 26px;
    font-weight: 300;
  }

  .brand-logo {
    height: 26px;
    padding-right: 7px;
  }

  .right_col {
    min-height: 100vh;
    min-height: calc(100vh - 51px);
  }

  .sidebar-footer {
    font-size: 12px;
    text-align: center;
    margin: 5px 0;
  }
</style>
