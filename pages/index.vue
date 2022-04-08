<template>
  <div class="metamask-wrapper">
    <template v-if="isMetamaskSupported">
      <arch-button v-if="!isLoggedIn" textButton="Metamask" @click.native="connectWallet" />
      <p v-else>Подключен кошелек: {{address}}</p>
    </template>
    <template v-else>
      <p>Необходимо установить расширение metamask!</p>
    </template>
  </div>
</template>

<script lang="ts">
import archButton from '~/components/UI/archButton.vue'
import eth from "@/services/eth";
import { computed, ComputedRef, ref, defineComponent, onMounted, useStore } from '@nuxtjs/composition-api'
export default defineComponent({
  components: { archButton },
  setup() {
    const { dispatch, getters } = useStore()
    const address: ComputedRef<string> = computed(() => getters['eth/address'])
    const isLoggedIn: ComputedRef<boolean> = computed(() => getters['eth/isLoggedIn'])
    const connectWallet = async () => {
      await dispatch('eth/connectWallet')
    }

    const isMetamaskSupported = ref(false)
    onMounted(async () => {
      isMetamaskSupported.value = eth.isExist()
      await dispatch('eth/checkConnect')
    })
    return {
      address,
      isLoggedIn,
      connectWallet,
      isMetamaskSupported
    }
  },
})
</script>

<style scoped>
.metamask-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}
</style>>
