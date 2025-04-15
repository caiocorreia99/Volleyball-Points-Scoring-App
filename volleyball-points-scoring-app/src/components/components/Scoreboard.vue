<template>
  <CRow class="div-scoreboard">
    <CCol xs="12" sm="12" md="5" lg="5" xl="5" class="order-1">
      <TeamCardA
        :name="teamAName"
        :score="teamA"
        :sets="setsA"
        @add="addPoint('A')"
        @remove="removePoint('A')"
        @addSet="addSet('A')"
        @removeSet="removeSet('A')"
        @updateName="updateName('A', $event)"
      />
    </CCol>
    <CCol
      xs="12"
      sm="12"
      md="2"
      lg="2"
      xl="2"
      class="text-center div-control-endgame order-3 order-md-2"
    >
      <CButton class="color-style-control-endgame" @click="resetGame"
        ><i class="fas fa-rotate-left" style="color: #ffffff"></i
        ><br />Zerar</CButton
      >
      <CButton class="color-style-control-endgame" @click="endGame"
        ><i class="fas fa-flag-checkered" style="color: #ffffff"></i
        ><br />Encerrar</CButton
      >
    </CCol>
    <CCol xs="12" sm="12" md="5" lg="5" xl="5" class="order-2 order-md-3">
      <TeamCardB
        :name="teamBName"
        :score="teamB"
        :sets="setsB"
        @add="addPoint('B')"
        @remove="removePoint('B')"
        @addSet="addSet('B')"
        @removeSet="removeSet('B')"
        @updateName="updateName('B', $event)"
      />
    </CCol>
  </CRow>
</template>
  
<script>
import TeamCardA from "./CardTeamA.vue";
import TeamCardB from "./CardTeamB.vue";

export default {
  components: { TeamCardA, TeamCardB },
  data() {
    return {
      teamA: 0,
      teamB: 0,
      teamAName: "Time A",
      teamBName: "Time B",
      setsA: 0,
      setsB: 0,
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
    addSet(team) {
      if (team === "A") this.setsA++;
      else if (team === "B") this.setsB++;
    },
    removeSet(team) {
      if (team === "A" && this.setsA > 0) this.setsA--;
      else if (team === "B" && this.setsB > 0) this.setsB--;
    },
    resetGame() {
      this.$swal
        .fire({
          title: "Deseja zerar os sets também?",
          text: "Você pode zerar apenas os pontos ou zerar tudo.",
          icon: "question",
          showCancelButton: false,
          showDenyButton: true,
          confirmButtonText: "Zerar tudo",
          denyButtonText: "Zerar apenas pontos",
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#dc3545",
          denyButtonColor: "#0d6efd",
          cancelButtonColor: "#6c757d",
        })
        .then((result) => {
          if (result.isConfirmed) {
            // Zerar tudo
            this.teamA = 0;
            this.teamB = 0;
            this.setsA = 0;
            this.setsB = 0;
          } else if (result.isDenied) {
            // Zerar só os pontos
            this.teamA = 0;
            this.teamB = 0;
          }
          // Se cancelar, não faz nada
        });
    },
    endGame() {
      let winner = "";

      if (this.teamA > this.teamB) {
        this.setsA += 1;
        winner = `${this.teamAName} venceu o set!`;
      } else if (this.teamB > this.teamA) {
        this.setsB += 1;
        winner = `${this.teamBName} venceu o set!`;
      } else {
        winner = "Empate no set!";
      }

      this.$swal
        .fire({
          title: "🏁 Fim do set!",
          text: winner,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#198754",
        })
        .then(() => {
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
  