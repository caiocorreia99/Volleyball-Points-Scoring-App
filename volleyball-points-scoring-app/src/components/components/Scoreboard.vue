<template>
  <CRow class="justify-content-center">
    <TeamCard
      :name="teamAName"
      :score="teamA"
      @add="addPoint('A')"
      @remove="removePoint('A')"
      @updateName="updateName('A', $event)"
    />
    <TeamCard
      :name="teamBName"
      :score="teamB"
      @add="addPoint('B')"
      @remove="removePoint('B')"
      @updateName="updateName('B', $event)"
    />

    <CCol xs="12" class="text-center mt-3">
      <CButton color="info" class="me-2" @click="resetGame">🔄 Zerar</CButton>
      <CButton color="danger" @click="endGame">🏁 Encerrar</CButton>
    </CCol>
  </CRow>
</template>
  
<script>
import TeamCard from "./CardTeam.vue";

export default {
  components: { TeamCard },
  data() {
    return {
      teamA: 0,
      teamB: 0,
      teamAName: "Time A",
      teamBName: "Time B",
    };
  },
  methods: {
    addPoint(team) {
      if (this.isGameOver()) return;

      if (team === "A") this.teamA++;
      else if (team === "B") this.teamB++;

      this.checkEndGame();
    },
    removePoint(team) {
      if (team === "A" && this.teamA > 0) this.teamA--;
      else if (team === "B" && this.teamB > 0) this.teamB--;
    },
    resetGame() {
      this.teamA = 0;
      this.teamB = 0;
    },
    endGame() {
      const winner =
        this.teamA > this.teamB
          ? "Time A venceu!"
          : this.teamB > this.teamA
          ? "Time B venceu!"
          : "Empate!";

      this.$swal
        .fire({
          title: "🏁 Fim da partida!",
          text: winner,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#198754",
        })
        .then(() => {
          // Zera os pontos após confirmação
          this.resetGame();
        });
    },
    isGameOver() {
      return this.hasWinner();
    },
    hasWinner() {
      const diff = Math.abs(this.teamA - this.teamB);
      return (this.teamA >= 25 || this.teamB >= 25) && diff >= 2;
    },
    checkEndGame() {
      if (this.hasWinner()) this.endGame();
    },
    updateName(team, newName) {
      if (team === "A") this.teamAName = newName;
      else if (team === "B") this.teamBName = newName;
    },
  },
};
</script>
  