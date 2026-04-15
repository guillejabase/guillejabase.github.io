(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }

    const init = () => {
        const date = new Date(2003, 10, 13);
        const age = document.getElementById('age');

        if (age) {
            const today = new Date();
            let years = today.getFullYear() - date.getFullYear();
            const hadBirthday = today.getMonth() > date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());

            if (!hadBirthday) {
                years -= 1;
            }

            age.textContent = `${years} ${years === 1 ? 'año' : 'años'}`;
        }

        const theme = document.getElementById('theme');

        const updateTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            const name = isDark ? 'Claro' : 'Oscuro';
            theme.textContent = name;
            theme.title = `Cambiar a tema ${name.toLowerCase()}`;
        };
        
        theme.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
            updateTheme();
        });
        updateTheme();

        const container = document.getElementById('particles');

        if (!container) {
            return;
        }

        const particleCount = 100;
        const particles = [];
        const mouse = { x: -10000, y: -10000 };
        const repulsionRadius = 150;
        const repulsionStrength = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 5 + 3;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 0.1 + 0.05;
            
            particle.style.width = particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            particles.push({
                element: particle,
                offsetX: 0, offsetY: 0,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed
            });
            container.appendChild(particle);
        }
        
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        const animate = () => {
            const containerRect = container.getBoundingClientRect();

            particles.forEach((p) => {
                p.offsetX += p.vx;
                p.offsetY += p.vy;
                
                const baseX = parseFloat(p.element.style.left) / 100 * containerRect.width;
                const baseY = parseFloat(p.element.style.top) / 100 * containerRect.height;
                const px = containerRect.left + baseX + p.offsetX;
                const py = containerRect.top + baseY + p.offsetY;
                
                const dx = px - mouse.x;
                const dy = py - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < repulsionRadius && distance > 0) {
                    const force = (1 - distance / repulsionRadius) * repulsionStrength;
                    p.offsetX += (dx / distance) * force;
                    p.offsetY += (dy / distance) * force;
                }
                
                p.element.style.transform = `translate(${p.offsetX}px, ${p.offsetY}px)`;
            });

            requestAnimationFrame(animate);
        };
        
        animate();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
