<template>
  <CContainer>
    <CRow>      
      <Scoreboard />
    </CRow>
  </CContainer>
</template>
  
<script>
import { CRow } from "@coreui/vue";
import Scoreboard from "../components/Scoreboard.vue";

export default {
  components: {
    Scoreboard,
  },
};
</script>
  