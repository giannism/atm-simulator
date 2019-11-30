<template>
  <v-app>
    <v-content >
        <Atm/>
    </v-content>
  </v-app>
</template>

<script>


import Atm from "./components/Atm";
export default {
  name: 'App',

  components: {
    Atm
  },

  data: () => ({
    //
  }),
};
</script>
