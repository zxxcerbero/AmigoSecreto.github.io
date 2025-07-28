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
