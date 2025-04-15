<template>
  <CCol md="12">
    <div style="padding: 15px">
      <!-- Nome do time -->
      <div class="div-time-name">
        <h2 @click="openModal" class="editable-name title-time-name theme-yellow-color">
          {{ name }}
        </h2>
        <div class="sets theme-yellow-placar">
          <h4 class="font-style-sets">{{ formattedSets }}</h4>
        </div>
      </div>
      <!-- Pontuação -->
      <div class="theme-yellow-score" @click="$emit('add')" style="cursor: pointer;">
        <h1 class="display-3 font-style-placar">{{ formattedScore }}</h1>
      </div>
      <!-- Botões de pontuação -->
      <div class="div-buttons-controls">
        <CButton color="success" class="me-2 style-control-button " @click="$emit('add')">+ 1</CButton>
        <CButton class="style-control-button" color="warning" @click="$emit('remove')">- 1</CButton>
      </div>
      <!-- Botões de pontuação sets -->
      <div style="display: flex;">
        <CButton color="success" class="me-2 style-control-button " @click="$emit('addSet')">+ Set</CButton>
        <CButton class="style-control-button" color="warning" @click="$emit('removeSet')">- Set</CButton>
      </div>
    </div>

    <!-- Modal para edição do nome -->
    <CModal
      :visible="modalVisible"
      @close="modalVisible = false"
      alignment="center"
    >
      <CModalHeader>
        <CModalTitle>Editar Nome do Time</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput v-model="editableName" placeholder="Digite o novo nome" />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="modalVisible = false"
          >Cancelar</CButton
        >
        <CButton color="primary" @click="saveName">Salvar</CButton>
      </CModalFooter>
    </CModal>
  </CCol>
</template>

<script>
export default {
  name: "TeamCardA",
  props: {
    name: String,
    score: Number,
    sets: Number,
  },
  data() {
    return {
      modalVisible: false,
      editableName: this.name,
    };
  },
  watch: {
    name(newVal) {
      this.editableName = newVal;
    },
  },
  computed: {
    formattedScore() {
      return this.score.toString().padStart(2, "0");
    },
    formattedSets() {
      return this.sets.toString().padStart(2, "0");
    },
  },
  methods: {
    openModal() {
      this.modalVisible = true;
      this.editableName = this.name;
    },
    saveName() {
      const trimmed = this.editableName.trim();
      if (trimmed) {
        this.$emit("updateName", trimmed);
      }
      this.modalVisible = false;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
