<template>
  <v-app id="inspire">
    <v-container class="fill-height" fluid>
      <v-row justify="center">
        <v-card
          height="400"
          color="transparent"
          class="text-center d-flex justify-content-center align-center flex-column"
          flat
        >
          <v-img
            :src="require('@/assets/images/404/notFoundIcon.svg')"
            max-width="400"
            max-height="250"
          ></v-img>
          <div class="display-1 mt-5">404 Página no encontrada.</div>
          <div class="grey--text lighten-5 my-5">
            La página a la que intenta acceder nunca existió en esta realidad,
            <br />o ha migrado a un universo paralelo.
          </div>
          <v-btn class="ma-2" color="indigo" to="/profile" outlined>Regresar</v-btn>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'Error404',
}
</script>