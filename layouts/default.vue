<template>
  <div class="app">
    <Header :navigationMenu="navigationMenu"/>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script lang='ts'>
import { computed, ComputedRef, defineComponent, useStore } from '@nuxtjs/composition-api'
import Header from '@/components/headerBlock.vue'
export default defineComponent({
  components: {Header},
  setup() {
    const { dispatch, getters } = useStore()
    const navigationMenu: ComputedRef<Array<any>> = computed(() => getters['layout/navigationMenu'])
    dispatch('layout/initNavigationMenu')
    return {
      navigationMenu
    }
  },
})
</script>