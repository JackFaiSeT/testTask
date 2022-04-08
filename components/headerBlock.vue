<template>
  <header>
    <nav>
      <ul class="header-navigation">
        <li v-for="(item) in navigationMenu" :key="item.name" class="header-navigation__item">
          <nuxt-link :to="item.route">{{item.text}}</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { Vue, Component, Prop} from 'nuxt-property-decorator';
import { defineComponent } from '@nuxtjs/composition-api'
import { IHeader } from '@/contracts/IHeader'
import { INavigationMenu } from "@/contracts/INavigationMenu";
@Component({})
class HeaderProps extends Vue implements IHeader {
 @Prop({ default: () => []}) readonly navigationMenu: Array<INavigationMenu> = []
}

export default defineComponent({
  name: 'HeaderBlock',
  props: HeaderProps.options.props
})
</script>


<style scoped>
.nuxt-link-exact-active {
  background-color: #512882;
}

nav {
  height: 100%;
}

header {
  width: 100%;
  height: 50px;
  background-color: #560EAD;
}

.header-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  height: 100%;
}

.header-navigation__item > a{
  padding: 14px;
  color: #ffffff;
  list-style: none;
  text-decoration: none;
  font-size: 20px;
}

.header-navigation__item:hover > a {
  background-color: #512882;
}
</style>
