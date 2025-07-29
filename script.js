// Custom cursor orb with smooth movement
const cursorOrb = document.querySelector('.cursor-orb');
let mouseX = 0;
let mouseY = 0;
let orbX = 0;
let orbY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateOrb() {
    orbX += (mouseX - orbX) * 0.15;
    orbY += (mouseY - orbY) * 0.15;
    
    cursorOrb.style.left = orbX - 8 + 'px';
    cursorOrb.style.top = orbY - 8 + 'px';
    
    requestAnimationFrame(animateOrb);
}
animateOrb();

// Click effect for orb
document.addEventListener('mousedown', () => {
    cursorOrb.classList.add('clicked');
});

document.addEventListener('mouseup', () => {
    cursorOrb.classList.remove('clicked');
});

// Click anywhere screen functionality
const clickScreen = document.getElementById('clickScreen');
const mainContent = document.getElementById('mainContent');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicControl = document.querySelector('.music-control');
const musicIcon = document.querySelector('.music-icon');

let musicPlaying = false;

clickScreen.addEventListener('click', () => {
    clickScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    // Start music
    backgroundMusic.play().then(() => {
        musicPlaying = true;
        musicIcon.classList.remove('paused');
        musicIcon.classList.add('playing');
        musicControl.classList.remove('paused');
        musicControl.classList.add('playing');
    }).catch(e => {
        console.log('Audio autoplay prevented:', e);
    });
    
    // Generate stars
    generateStars();
});

// Music control functionality
musicControl.addEventListener('click', () => {
    if (musicPlaying) {
        backgroundMusic.pause();
        musicPlaying = false;
        musicIcon.classList.remove('playing');
        musicIcon.classList.add('paused');
        musicControl.classList.remove('playing');
        musicControl.classList.add('paused');
    } else {
        backgroundMusic.play().then(() => {
            musicPlaying = true;
            musicIcon.classList.remove('paused');
            musicIcon.classList.add('playing');
            musicControl.classList.remove('paused');
            musicControl.classList.add('playing');
        }).catch(e => {
            console.log('Audio play failed:', e);
        });
    }
});

// Generate animated stars
function generateStars() {
    const starsContainer = document.querySelector('.stars-container');
    const numStars = 50;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Download button functionality
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent parent click
            
            const clientButton = button.closest('.client-button');
            const downloadUrl = clientButton.getAttribute('data-download-url');
            const clientName = clientButton.querySelector('.client-name').textContent;
            
            if (downloadUrl) {
                window.open(downloadUrl, '_blank');
                button.textContent = 'Opening...';
                setTimeout(() => {
                    button.textContent = 'Download';
                }, 300);
            }
        });
    });
    
    // Client button click effects (for the whole button area)
    const clientButtons = document.querySelectorAll('.client-button');
    
    clientButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Only trigger if not clicking the download button
            if (!e.target.classList.contains('download-btn')) {
                console.log('Client info clicked:', button.querySelector('.client-name').textContent);
                
                // Visual feedback for the whole button
                button.style.transform = 'translateY(-1px) scale(0.98)';
                setTimeout(() => {
                    button.style.transform = 'translateY(-1px) scale(1)';
                }, 150);
            }
        });
    });
});

// Prevent context menu on right click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Handle audio loading errors
backgroundMusic.addEventListener('error', () => {
    console.log('Music file not found - place music.mp3 in the same directory');
});