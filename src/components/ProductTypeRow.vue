<template>
  <tr class="eva-product-type-row">
    <td class="eva-product-type-row__icon" style="width: 50px;">
      <img :src="productType.icon"></img>
    </td>

    <td style="width: 200px;">
      {{ productType.name }}
    </td>

    <td style="width: 80px;">
      {{ productType.groupName }}
    </td>

    <td style="width: 100px;">
      <router-link :to="{ name: 'ProductTypeDetail', params: { id: productType.id } }" href="javascript:;">{{$t('misc.edit')}}</router-link>
      <a href="javascript:;" @click="deleteProductType(productType)">{{$t('misc.delete')}}</a>
    </td>
  </tr>
</template>

<script>
  import api from 'src/api'

  export default {
    name: 'ProductTypeRow',

    props: ['productType'],

    methods: {
      async deleteProductType (productType) {
        try {
          await api.productTypes.deleteType(this.productType.id, this.productType.version)
          this.$emit('deleted', this.productType)
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
