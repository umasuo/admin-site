<template>
  <div>
    <button class="btn btn-default" :disabled="step <= 1" @click="previous">{{$t('misc.previous_step')}}</button>
    <button class="btn btn-primary" :disabled="step >= max" @click="forward">{{$t('misc.next_step')}}</button>
  </div>
</template>

<script>
  export default {
    name: 'WizardSteps',

    model: {
      prop: 'step'
    },

    props: {
      max: {
        type: Number,
        default: 3
      },
      step: {
        type: Number,
        default: 0
      }
    },

    methods: {
      forward () {
        this.$emit('input', this.step + 1)
      },

      previous () {
        this.$emit('input', this.step - 1)
      }
    }
  }
</script>

<style lang="scss">
</style>
