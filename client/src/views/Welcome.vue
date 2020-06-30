<template>
  <Layout>
    <div class="container-image--baby">
      <div class="border-container__section">
        <canvas ref="canvasConfetti" class="canvas--content"></canvas>
        <h1
          class="font-welcome-style container--Header animate__animated animate__rubberBand"
        >Bienvenidos a mi...</h1>
        <img :src="require('../assets/images/Home/border-container-baby.svg')" alt="container-frame" />
        <img
          class="animate__animated animate__backInDown"
          :src="require('../assets/images/Home/baby-welcome.svg')"
          alt="baby_welcome"
        />
        <h2 class="font-welcome-style container--Subtitle">Baby shower</h2>
        <div class="ballons-section">
          <div class="balloon">
            <img :src="require('../assets/images/Home/balloons-baby-left.svg')" alt="left-side" />
            <img :src="require('../assets/images/Home/balloons-baby-right.svg')" alt="right-side" />
          </div>
        </div>
        <router-link to="/thank-you">
          <img
            @mouseover="active = true"
            @mouseout="active = false"
            :class="[active ? 'animate__tada' : '']"
            :src="require('../assets/images/Home/btn-next.png')"
            class="animate__animated"
            alt="btn-next"
          />
        </router-link>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/containers/Layout.vue'
import confetti from 'canvas-confetti'

export default {
  name: 'Welcome',
  components: {
    Layout,
  },
  data: () => ({
    active: false,
  }),
  mounted() {
    confetti.create(this.$refs.canvasConfetti)
    this.useConfetti()
  },
  methods: {
    randomInRange: function(min, max) {
      return Math.random() * (max - min) + min
    },
    useConfetti: function() {
      confetti({
        angle: this.randomInRange(55, 125),
        spread: this.randomInRange(50, 70),
        particleCount: this.randomInRange(50, 100),
        origin: { y: 0.6 },
      })
    },
  },
}
</script>

<style>
@import '../assets/styles/Welcome/styles.css';
</style>

 