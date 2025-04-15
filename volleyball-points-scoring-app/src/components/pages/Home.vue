<template>
  <CContainer class="md-5">
    <h1 class="text-center">🏐 Placar de Vôlei</h1>
    <Scoreboard />
  </CContainer>
</template>
  
<script>
import Scoreboard from "../components/Scoreboard.vue";

export default {
  components: {
    Scoreboard,
  },
};
</script>
  