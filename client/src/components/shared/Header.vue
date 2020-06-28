<template>
  <div>
    <v-app-bar
      absolute
      color="#43a047"
      dark
      shrink-on-scroll
      prominent
      :src="require('@/assets/images/Home/Header-background.jpg')"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="50"
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Baby shower</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-gift</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <Sidebard :drawer.sync="drawer" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import Sidebard from '@/components/shared/Sidebar.vue'

export default {
  name: 'Header',
  components: {
    Sidebard,
  },
  data: () => ({
    drawer: false,
  }),
}
</script>