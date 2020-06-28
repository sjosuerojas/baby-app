<template>
  <v-app id="inspire">
    <v-card class="overflow-hidden">
      <Header />
      <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="650">
        <v-container style="height: 100vh;">
          <slot />
        </v-container>
      </v-sheet>
      <Footer />
    </v-card>
  </v-app>
</template>

<script>
import Header from '@/components/shared/Header.vue'
import Footer from '@/components/shared/Footer.vue'

export default {
  name: 'Layout',
  components: {
    Header,
    Footer,
  },
}
</script>
