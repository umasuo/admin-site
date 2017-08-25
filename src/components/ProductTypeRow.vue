<template>
  <tr class="eva-product-type-row">
    <td style="width: 200px;">
      {{ productType.name }}
    </td>

    <td style="width: 80px;">
      {{ productType.groupName }}
    </td>

    <td style="width: 100px;">
      <!-- <router-link :to="{ name: 'ProductDetail', params: { pid: product.id } }" href="javascript:;">{{$t('misc.edit')}}</router-link> -->
      <a href="javascript:;" @click="deleteProduct(product)">{{$t('misc.delete')}}</a>
    </td>
  </tr>
</template>

<script>
  export default {
    name: 'ProductTypeRow',

    props: ['productType'],

    methods: {
      deleteProduct (product) {
        try {
          // TODO: call api to delete product type
          alert('todo')
        } catch (e) {
          console.dir(e)
        }
      }
    }
  }
</script>

<style lang="scss">
  .eva-product-type-row {
    width: 100%;

    &__icon {
      padding: 4px !important;
      img {
        height: 29px;
        width: 29px;
      }
    }

    &__desc {
      word-break: break-all;
      overflow: hidden;
      height: 21px;
    }
  }
</style>
