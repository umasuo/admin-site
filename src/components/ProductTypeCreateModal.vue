<template>
  <div class="modal fade" ref="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <!-- TODO: i18n -->
          <h4 class="modal-title" id="myModalLabel">创建产品类别</h4>
        </div>
        <div class="modal-body eva-product-create__wrapper">
          <div class="eva-product-create__content">

            <!-- STEP 2, Info-->
            <div class="eva-product-create-info">

              <form class="form-horizontal form-label-left eva-product-create-info__form">
                <div class="form-group">
                  <label class="control-label col-xs-3">{{$t('product_definition.name')}}: </label>

                  <div class="col-xs-9">
                    <input class="form-control" type="text" v-model="create.name">
                  </div>
                </div>

                <div class="form-group">
                  <label class="control-label col-xs-3">所属产品组: </label>

                  <div class="col-xs-9">
                    <input class="form-control" type="text" v-model="create.group">
                  </div>
                </div>

                <p class="text-warning text-center" v-if="state === 'Request failed with status code 409'">{{$t('product_definition.has_same_name')}}</p>

                <p class="text-warning text-center" v-else-if="state === 'name, productTypeId and type are required'">{{$t('misc.must_provide')}}</p>
                <p class="text-warning text-center" v-else-if="state !== ''">{{$t('misc.unknow_error')}}</p>

                <button type="submit" class="btn btn-lg btn-primary btn-block" @click.prevent="createAndEdit">{{$t('misc.create')}}</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from 'src/api'

  export default {
    name: 'ProductTypeCreateModal',

    data () {
      return {
        create: {
          name: '',
          group: ''
        },
        state: ''
      }
    },

    methods: {
      async createAndEdit () {
        const type = await api.productTypes.createType(this.create.name, this.create.group)
        this.$router.push({name: 'ProductTypeDetail', params: {id: type.id}})
        console.dir(type)
      }
    }
  }
</script>

<style lang="scss">
  .eva-product-create__wrapper {
    overflow: hidden;
    padding: 0;
  }

  .eva-product-create__content {
    width: 200%;
    border-radius: 6px;
    min-height: 400px;
    transition: transform .7s;
    text-align: center;
  }

  .slideLeft {
    transform: translateX(-50%);
  }

  .eva-product-create-type,
  .eva-product-create-info {
    float: left;
    width: 50%;

    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }

  .eva-product-create-type {
    &__category,
    &__list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    $category_width: 100px;
    &__category {
      background-color: #eee;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: $category_width;
      border-bottom-left-radius: 6px;
      padding: 15px 0;

      li {
        padding: 10px 15px;

        &.active {
          background-color: white;
        }
      }
    }

    &__list {
      margin-left: $category_width;

      &:after {
        content: '';
        display: block;
        clear: both;
      }

      li {
        background-color: #eee;
        border-radius: 3px;
        float: left;
        margin: 15px 0 0 15px;
        text-align: center;
        padding: 10px 20px;
      }
    }
  }

  .eva-product-create-info {
    padding: 15px;

    &__form {
      background-color: #eaeaea;
      padding: 20px;
      border-radius: 6px;
      width: 400px;
      margin: 40px auto 0 auto;
      text-align: left;

      .checkbox label {
        padding-left: 0;
        padding-right: 20px;
      }

      .btn {
        width: 100px;
        margin: 30px auto 0 auto;
      }
    }

    &__form-type {
      margin-bottom: 15px;
    }
  }
</style>
