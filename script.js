/* ================================
   LOADING SCREEN
================================ */
const loadingTexts = [
    'INITIALIZING SYSTEM...',
    'LOADING MODULES...',
    'COMPILING ASSETS...',
    'ESTABLISHING CONNECTION...',
    'SYSTEM READY'
];

let textIndex = 0;
const loadingTextEl = document.getElementById('loading-text');
let loadingComplete = false;

// Update loading text
const loadingInterval = setInterval(() => {
    if (loadingTextEl && textIndex < loadingTexts.length - 1) {
        textIndex++;
        loadingTextEl.textContent = loadingTexts[textIndex];
    }
}, 400);

// Function to hide loading screen
function hideLoadingScreen() {
    if (loadingComplete) return;
    loadingComplete = true;
    
    clearInterval(loadingInterval);
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

// Hide loading screen when page loads
window.addEventListener('load', () => {
    setTimeout(hideLoadingScreen, 1500);
});

// Failsafe: Hide loading screen after 3 seconds no matter what
setTimeout(hideLoadingScreen, 3000);

// Also hide on DOMContentLoaded as backup
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hideLoadingScreen, 2000);
});

/* ================================
   MATRIX RAIN EFFECT
================================ */
const matrixCanvas = document.getElementById('matrix-canvas');

if (matrixCanvas) {
    try {
        const ctx = matrixCanvas.getContext('2d');

        // Resize canvas to fill window
        function resizeMatrix() {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        }

        resizeMatrix();

        // Matrix characters
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
        const charArray = chars.split('');
        const fontSize = 14;
        let columns = Math.floor(matrixCanvas.width / fontSize);
        let drops = Array(columns).fill(1);

        // Draw matrix rain
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            ctx.fillStyle = 'rgba(0, 255, 65, 0.25)';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 35);

        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            resizeMatrix();
            columns = Math.floor(matrixCanvas.width / fontSize);
            drops = Array(columns).fill(1);
        }, 250));
        
    } catch (error) {
        console.warn('Matrix effect initialization failed:', error);
        if (matrixCanvas) matrixCanvas.remove();
    }
} else {
    console.warn('Matrix canvas not found');
}

/* ================================
   CUSTOM CURSOR
================================ */
const cursor = document.querySelector('.cursor');
let mouseX = 0;
let mouseY = 0;

// Check if device is touch-enabled
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Hide cursor on touch devices
if (isTouchDevice && cursor) {
    cursor.style.display = 'none';
}

// Update cursor position (desktop only)
if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }

        // Store mouse position for Three.js camera
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Cursor hover effect on interactive elements
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.transform = 'scale(1)';
        });
    });
}

// Touch event handling for mobile devices
if (isTouchDevice) {
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });
}

/* ================================
   THREE.JS BACKGROUND
================================ */
const container = document.getElementById('canvas-container');

// Only initialize Three.js if library is loaded and container exists
if (container && typeof THREE !== 'undefined') {
    try {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
        container.appendChild(renderer.domElement);

        /* PARTICLE SYSTEM */
        const particlesGeometry = new THREE.BufferGeometry();
        
        // Reduce particle count on mobile for better performance
        const isMobile = window.innerWidth < 768;
        const particlesCount = isMobile ? 500 : 2000;
        const posArray = new Float32Array(particlesCount * 3);

        // Generate random particle positions
        for (let i = 0; i < posArray.length; i++) {
            posArray[i] = (Math.random() - 0.5) * 120;
        }

        particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(posArray, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x00ff41,
            transparent: true,
            opacity: 0.6
        });

        const particlesMesh = new THREE.Points(
            particlesGeometry,
            particlesMaterial
        );
        scene.add(particlesMesh);

        /* WIREFRAME ICOSAHEDRON */
        const icosahedronGeometry = new THREE.IcosahedronGeometry(15, 1);
        const icosahedronMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff41,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
        scene.add(icosahedron);

        /* WIREFRAME TORUS KNOT */
        const torusKnotGeometry = new THREE.TorusKnotGeometry(8, 2, 100, 16);
        const torusKnotMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d9ff,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
        torusKnot.position.set(-25, 15, -20);
        scene.add(torusKnot);

        // Set camera position
        camera.position.z = 40;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Rotate particles
            particlesMesh.rotation.y += 0.0004;

            // Rotate icosahedron
            icosahedron.rotation.x += 0.003;
            icosahedron.rotation.y += 0.004;

            // Rotate torus knot
            torusKnot.rotation.x += 0.002;
            torusKnot.rotation.y += 0.003;

            // Camera follows mouse with smooth interpolation
            camera.position.x += (mouseX * 8 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 8 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, 250));
        
    } catch (error) {
        console.warn('Three.js initialization failed:', error);
        // Remove container if Three.js fails
        if (container) container.remove();
    }
} else {
    console.warn('Three.js not loaded or container not found');
    // Remove container if Three.js is not available
    if (container) container.remove();
}

/* ================================
   SMOOTH SCROLL
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ================================
   CONTACT FORM HANDLER
================================ */
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Show success message
    alert('MESSAGE SENT SUCCESSFULLY!\n\nThank you for reaching out, ' + name + '!');
    
    // Reset form
    event.target.reset();
    
    // You can add actual form submission logic here
    // For example, sending data to a server using fetch API
}

/* ================================
   SCROLL REVEAL ANIMATION
================================ */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
);

reveals.forEach((el) => revealObserver.observe(el));

/* ================================
   NAVIGATION ACTIVE STATE
================================ */
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

/* ================================
   PERFORMANCE OPTIMIZATION
================================ */
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to resize events
const debouncedResize = debounce(() => {
    // Your resize logic here if needed
}, 250);

window.addEventListener('resize', debouncedResize);

/* ================================
   CONSOLE MESSAGE
================================ */
console.log('%c🚀 Welcome to Andika Bramastra\'s Portfolio!', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion using HTML, CSS, JavaScript, and Three.js', 'color: #00d9ff; font-size: 14px;');
console.log('%cInterested in the code? Check out the GitHub repository!', 'color: #ffe600; font-size: 12px;');
