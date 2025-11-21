(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

    if (isDark) {
        document.documentElement.classList.add('dark');
    }

    document.addEventListener('DOMContentLoaded', () => {
        const theme = document.getElementById('theme');

        const updateTheme = () => {
            const name = document.documentElement.classList.contains('dark') ? 'light' : 'dark';

            theme.textContent = name;
            theme.title = `toggle to ${name} theme`;
        };

        updateTheme();
        
        theme.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');

            const name = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', name);
            
            updateTheme();
        });
    });
})();
