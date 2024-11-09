// Definindo a sequência correta das notas para o usuário reproduzir
const sequenciaCorreta = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowRight', 'ArrowLeft'];
let sequenciaUsuario = [];

// Mapeamento das teclas para os arquivos de som correspondentes
const sons = {
    'ArrowUp': 'som1.wav',       // Tecla Cima
    'ArrowDown': 'som2.wav',     // Tecla Baixo
    'ArrowLeft': 'som4.wav',     // Tecla Esquerda
    'ArrowRight': 'som3.wav'     // Tecla Direita
};

// Função para tocar o som da nota
function tocarNota(tecla) {
    const som = sons[tecla];
    if (som) {
        const audio = new Audio(som);
        audio.play();

        // Adiciona a tecla pressionada na sequência do usuário
        sequenciaUsuario.push(tecla);

        // Verifica a sequência a cada tecla pressionada
        verificarSequencia();
    }
}

// Função para verificar a sequência do usuário em relação à sequência correta
function verificarSequencia() {
    // Se a sequência do usuário tiver o mesmo comprimento da sequência correta
    if (sequenciaUsuario.length === sequenciaCorreta.length) {
        // Compara as sequências
        if (sequenciaUsuario.join() === sequenciaCorreta.join()) {
            // Toca a música de recompensa uma vez
            const musicaRecompensa = new Audio('serenata.mp3');
            musicaRecompensa.play();

            // Desativa o evento de teclado para impedir novas entradas
            document.removeEventListener('keydown', handleKeyDown);
        }
    }

    // Se a sequência estiver incorreta, reinicia
    else if (!sequenciaCorreta.slice(0, sequenciaUsuario.length).every((value, index) => value === sequenciaUsuario[index])) {
        // Se a sequência estiver incorreta, reinicia a sequência do usuário
        sequenciaUsuario = [];
    }
}

// Função de evento para capturar teclas pressionadas
function handleKeyDown(event) {
    tocarNota(event.key);
}

// Adiciona o listener para capturar as teclas pressionadas
document.addEventListener('keydown', handleKeyDown);
