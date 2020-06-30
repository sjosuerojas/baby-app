<template>
  <v-app id="inspire">
    <v-main class="background-body__container">
      <slot />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/shared/Footer.vue'

export default {
  name: 'Layout',
  components: {
    Footer,
  },
}
</script>

<style>
.background-body__container {
  background: url('../assets/images/Home/Cloud-5s-1084px.svg') repeat 0 0;
  margin: 0;
  box-sizing: border-box;
  -webkit-animation: slide 20s linear infinite;
  animation: slide 20s linear infinite;
}

@-webkit-keyframes slide {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -800px 0;
  }
}

@keyframes slide {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -800px 0;
  }
}
</style>
