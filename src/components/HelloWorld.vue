<template>
  <section class="section is-mobile">
    
      <!-- Encabezado -->
      <div class="has-text-centered mb-6">
        <h1 class="title is-2">🎁 Amigo Secreto</h1>
        <img
          src="@/assets/amigo-secreto.png"
          alt="Imagen amigo secreto"
          style="max-width: 180px"
        />
      </div>
    <div class="container columns">
      <div class="is-justify-content-space-between">
      <!-- Formulario para ingresar nombres -->
      <div class="box column">
        <h2 class="subtitle is-4 has-text-weight-semibold">👥 Agregar Amigos</h2>

        <div class="field has-addons">
          <div class="control is-expanded has-icons-left">
            <input
              v-model="nuevoAmigo"
              class="input is-warning"
              type="text"
              placeholder="Nombre del amigo"
              @keyup.enter="agregarAmigo"
            />
            <span class="icon is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
          <div class="control">
            <button class="button is-warning" @click="agregarAmigo">
              Añadir
            </button>
          </div>
        </div>

        <!-- Lista de amigos -->
        <div class="column mt-4" v-if="amigos.length">
          <p class="has-text-weight-semibold mb-2">📋 Lista de amigos:</p>
          <ul>
            <li v-for="(amigo, index) in amigos" :key="index">
              {{ index + 1 }}. {{ amigo }}
            </li>
          </ul>
        </div>
      </div>
      <!-- Animación de carga -->
      <div class="has-text-centered my-4" v-if="sorteando">
        <span class="loader is-loading is-large"></span>
        <p class="mt-3 has-text-weight-semibold is-italic">Realizando sorteo, espera un momento...</p>
      </div>

      <!-- Resultados -->
      <div class="box is-primary" v-if="resultado.length && !sorteando">
        <p class="title is-5">🎉 Resultados del sorteo:</p>
        <ul>
          <li v-for="(ganador, index) in resultado" :key="index">
            😎 ¡El Amigo Secreto es <strong>{{ ganador }}</strong>!
          </li>
        </ul>
      </div>
      </div>
    </div>
    <!-- Botón para sortear -->
      <div class="has-text-centered my-5">
        <button
          class="button is-success is-large"
          @click="sortearAmigo"
          :disabled="amigos.length < 2 || sorteando"
        >
          <span class="icon">
            <i class="fas fa-random"></i>
          </span>
          <span v-if="!sorteando">Sortear Amigo Secreto</span>
          <span v-else>Cargando...</span>
        </button>
      </div>
  </section>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      nuevoAmigo: "",
      amigos: [],
      resultado: [],
      sorteando: false,
    };
  },
  methods: {
    agregarAmigo() {
      const nombre = this.nuevoAmigo.trim();
      if (!nombre) {
        alert("Por favor, escribe un nombre.");
        return;
      }
      if (this.amigos.includes(nombre)) {
        alert("Este nombre ya fue ingresado.");
        return;
      }
      this.amigos.push(nombre);
      this.nuevoAmigo = "";
      this.resultado = []; // Limpia resultado anterior
    },

    async sortearAmigo() {
      if (this.amigos.length < 2) return;

      this.sorteando = true;
      this.resultado = [];

      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula animación de sorteo

      // Lógica para seleccionar un único ganador aleatorio
      const participantes = this.amigos;
      const indiceGanador = Math.floor(Math.random() * participantes.length);
      const ganador = participantes[indiceGanador];

      // Guardamos el ganador en el array de resultados
      this.resultado = [ganador];
      this.sorteando = false;
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}
li::before {
  content: "🎁 ";
  margin-right: 5px;
}
.loader.is-loading {
  border: 4px solid #00d1b2;
  border-top-color: transparent;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  animation: spin 0.9s linear infinite;
  margin: 0 auto;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
