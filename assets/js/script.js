// Navegación AJAX dinámica y carga de secciones
document.addEventListener('DOMContentLoaded', function () {
    // Utilidad: detectar si es táctil
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // Navegación AJAX para enlaces internos
    document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
        // Unifica el manejo de eventos para click y touchend
        ['click', 'touchend'].forEach(function(eventName) {
            link.addEventListener(eventName, function(e) {
                const href = link.getAttribute('href');
                // Solo AJAX para enlaces internos .html
                if (href && href.match(/^\.|\/[^:]+\.html$/)) {
                    e.preventDefault();
                    // En móvil, recarga completa para evitar problemas de AJAX
                    if (window.innerWidth < 992) {
                        window.location.href = href;
                        // Cierra el menú hamburguesa después de navegar (no antes)
                        var navbarCollapse = document.getElementById('navcol-1');
                        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                            new bootstrap.Collapse(navbarCollapse).hide();
                        }
                        document.body.classList.remove('modal-open');
                        document.body.style.overflow = '';
                        let backdrops = document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop, .navbar-backdrop');
                        backdrops.forEach(b => b.parentNode && b.parentNode.removeChild(b));
                        return;
                    } else {
                        // PC: AJAX
                        var navbarCollapse = document.getElementById('navcol-1');
                        if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains('show')) {
                            new bootstrap.Collapse(navbarCollapse).hide();
                        }
                        document.body.classList.remove('modal-open');
                        document.body.style.overflow = '';
                        let backdrops = document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop, .navbar-backdrop');
                        backdrops.forEach(b => b.parentNode && b.parentNode.removeChild(b));
                        loadSection(href);
                        history.pushState(null, '', href);
                    }
                }
            }, {passive:true});
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
                // Vuelve a cargar el footer y comentarios si corresponde
                loadFooter();
                if (document.getElementById('ajax-comments-container')) {
                    loadComments();
                }
            });
    }

    // Cargar footer dinámicamente en todas las páginas
    function loadFooter() {
        fetch('assets/ajax/footer.html')
            .then(res => res.text())
            .then(html => {
                // Elimina footers duplicados
                document.querySelectorAll('#footerpad').forEach((f, i) => {
                    if (i > 0) f.remove();
                });
                let footer = document.getElementById('footerpad');
                if (!footer) {
                    footer = document.createElement('div');
                    footer.id = 'footerpad';
                    document.body.appendChild(footer);
                }
                footer.innerHTML = html;
            });
    }

    // Cargar comentarios solo en index
    function loadComments() {
        fetch('assets/ajax/comments.html')
            .then(res => res.text())
            .then(html => {
                var cont = document.getElementById('ajax-comments-container');
                if (cont) cont.innerHTML = html;
            });
    }

    // Ejecutar al cargar la página
    loadFooter();
    if (document.getElementById('ajax-comments-container')) {
        loadComments();
    }
});
