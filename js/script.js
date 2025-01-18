// Adiciona animações aos elementos ao rolar a página
document.addEventListener("scroll", () => {
    const elements = document.querySelectorAll("section");
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (position < windowHeight - 50) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        } else {
            el.style.opacity = 0;
            el.style.transform = "translateY(20px)";
        }
    });
});

// Configuração inicial de estilo para as seções
document.querySelectorAll("section").forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.1s ease";
});

const track = document.querySelector('.carousel-track');
let position = 0; // Posição inicial
const slideWidth = 310; // Largura de cada imagem + gap

// Função para rolagem automática
function autoScroll() {
    position -= slideWidth;
    if (Math.abs(position) >= track.scrollWidth) {
        position = 0; // Volta ao início
    }
    track.style.transform = `translateX(${position}px)`;
}

// Inicia a rolagem automática
let interval = setInterval(autoScroll, 3000); // Altere o tempo, se necessário

// Evento para parar e retomar a rolagem automática ao interagir
track.addEventListener('mouseenter', () => clearInterval(interval));
track.addEventListener('mouseleave', () => interval = setInterval(autoScroll, 3000));

// Interação de deslizar manualmente
let startX = 0;
let isDragging = false;

track.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    isDragging = true;
    track.style.transition = 'none'; // Remove a transição enquanto arrasta
});

track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = e.pageX - startX;
    track.style.transform = `translateX(${position + diff}px)`;
});

track.addEventListener('mouseup', (e) => {
    isDragging = false;
    const diff = e.pageX - startX;
    position += diff;

    // Ajusta a posição para manter o alinhamento correto
    position = Math.round(position / slideWidth) * slideWidth;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(${position}px)`;
});

track.addEventListener('mouseleave', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = 'transform 0.1s ease-in-out';
    track.style.transform = `translateX(${position}px)`;
});

