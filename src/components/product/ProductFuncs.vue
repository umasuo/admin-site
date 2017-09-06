<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>{{$t('product_definition.func.name')}}</th>
        <th>{{$t('product_definition.func.trans_type')}}</th>
        <th>{{$t('product_definition.func.type')}}</th>
        <th>{{$t('product_definition.func.prop')}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(func, index) in funcs" :key="func.id">
        <th scope="row">{{ func.functionId }}</th>
        <td>{{ func.name }}</td>
        <td>{{ stringifyTransferType(func.transferType) }}</td>
        <td>{{ stringifyDataType(func.dataType) }}</td>
        <td>{{ stringifyDataTypeValue(func.dataType) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import mixin from 'src/components/ProductFuncMixins'

  export default {
    name: 'ProductFuncs',

    mixins: [mixin],

    props: ['product', 'mode'],

    computed: {
      funcs () {
        return this.product.functions.filter(func => {
          return func.category === this.mode
        })
      }
    }
  }
</script>

<style lang="scss">
</style>
