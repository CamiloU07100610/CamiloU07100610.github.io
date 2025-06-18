// Navegación AJAX dinámica y carga de secciones
document.addEventListener('DOMContentLoaded', function () {
    // Navegación AJAX para enlaces internos
    document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href && href.endsWith('.html')) {
                e.preventDefault();
                loadSection(href);
                history.pushState(null, '', href);
            }
        });
    });

    // Soporte para navegación con el botón atrás/adelante
    window.addEventListener('popstate', function() {
        const path = window.location.pathname.split('/').pop();
        if (path.endsWith('.html')) loadSection(path);
    });

    // Carga inicial si no es index.html
    const path = window.location.pathname.split('/').pop();
    if (path && path !== '' && path !== 'index.html') {
        loadSection(path);
    }

    // Carga AJAX de secciones
    function loadSection(page) {
        const mainContainer = document.querySelector('main') || document.body;
        fetch(page)
            .then(res => res.text())
            .then(html => {
                // Extrae solo el contenido principal
                const temp = document.createElement('div');
                temp.innerHTML = html;
                let content = temp.querySelector('main') || temp.querySelector('section') || temp;
                mainContainer.innerHTML = content.innerHTML;
                window.scrollTo({top:0,behavior:'smooth'});
            });
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Responsive: cerrar menú al hacer clic en un enlace en móvil
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                var navbarCollapse = document.getElementById('navcol-1');
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    new bootstrap.Collapse(navbarCollapse).hide();
                }
            });
        });

    });

    // Cargar footer dinámicamente en todas las páginas
    function loadFooter() {
        fetch('assets/ajax/footer.html')
            .then(res => res.text())
            .then(html => {
                let footer = document.getElementById('footerpad');
                if (!footer) {
                    footer = document.createElement('div');
                    footer.id = 'footerpad';
                    document.body.appendChild(footer);
                }
                footer.innerHTML = html;
            });
    }

    // Ejecutar al cargar la página
    loadFooter();

    // AJAX para cargar comentarios (solo en index)
    if (document.getElementById('ajax-comments-container')) {
        fetch('assets/ajax/comments.html')
            .then(res => res.text())
            .then(html => {
                document.getElementById('ajax-comments-container').innerHTML = html;
            });
    }

    // Enviar solicitud de canción por AJAX
    function bindSongRequestForm() {
        var form = document.querySelector('.cc_request_form');
        if (!form) return;
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var data = new FormData(form);
            fetch('https://halo.streamerr.co/public/oasisstereo/request', {
                method: 'POST',
                body: data
            })
            .then(res => res.ok ? res.text() : Promise.reject())
            .then(() => {
                form.querySelector('[data-type="result"]').innerHTML =
                    '<div class="alert alert-success animate__animated animate__fadeIn">¡Solicitud enviada!</div>';
            })
            .catch(() => {
                form.querySelector('[data-type="result"]').innerHTML =
                    '<div class="alert alert-danger animate__animated animate__fadeIn">Error al enviar.</div>';
            });
        });
    }
});
