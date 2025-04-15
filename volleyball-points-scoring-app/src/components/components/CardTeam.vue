<template>
    <CCol sm="6" md="4" class="mb-4">
      <CCard>
        <CCardBody class="text-center">
          <div v-if="editing">
            <input
              type="text"
              v-model="editableName"
              @blur="saveName"
              @keyup.enter="saveName"
              class="form-control text-center mb-2"
              autofocus
            />
          </div>
          <h2 v-else @click="editing = true" class="editable-name">
            {{ name }}
          </h2>
  
          <h1 class="display-3 placar">{{ formattedScore }}</h1>
          <CButton color="success" class="me-2" @click="$emit('add')">+1</CButton>
          <CButton color="warning" @click="$emit('remove')">-1</CButton>
        </CCardBody>
      </CCard>
    </CCol>
  </template>
  
  <script>
  export default {
    name: "TeamCard",
    props: {
      name: String,
      score: Number,
    },
    data() {
      return {
        editing: false,
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
    },
    methods: {
      saveName() {
        this.editing = false;
        this.$emit("updateName", this.editableName);
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  .placar {
    font-family: 'Orbitron', sans-serif;
    font-size: 4rem;
    letter-spacing: 2px;
  }
  .editable-name {
    cursor: pointer;
    user-select: none;
  }
  </style>
  