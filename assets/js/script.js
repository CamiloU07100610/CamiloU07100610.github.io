// Navegación AJAX dinámica y carga de secciones
document.addEventListener('DOMContentLoaded',function(){function isTouchDevice(){return'ontouchstart'in window||navigator.maxTouchPoints>0}document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link){['click','touchend'].forEach(function(eventName){link.addEventListener(eventName,function(e){const href=link.getAttribute('href');if(href&&href.match(/^\.|\/[^:]+\.html$/)){e.preventDefault();if(window.innerWidth<992){window.location.href=href;var navbarCollapse=document.getElementById('navcol-1');if(navbarCollapse&&navbarCollapse.classList.contains('show')){new bootstrap.Collapse(navbarCollapse).hide()}document.body.classList.remove('modal-open');document.body.style.overflow='';let backdrops=document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop, .navbar-backdrop');backdrops.forEach(b=>b.parentNode&&b.parentNode.removeChild(b));return}else{var navbarCollapse=document.getElementById('navcol-1');if(window.innerWidth<992&&navbarCollapse&&navbarCollapse.classList.contains('show')){new bootstrap.Collapse(navbarCollapse).hide()}document.body.classList.remove('modal-open');document.body.style.overflow='';let backdrops=document.querySelectorAll('.modal-backdrop, .offcanvas-backdrop, .navbar-backdrop');backdrops.forEach(b=>b.parentNode&&b.parentNode.removeChild(b));loadSection(href);history.pushState(null,'',href)}}},{passive:true})})});window.addEventListener('popstate',function(){const path=window.location.pathname.split('/').pop();if(path.endsWith('.html'))loadSection(path)});const path=window.location.pathname.split('/').pop();if(path&&path!==''&&path!=='index.html'){loadSection(path)}function loadSection(page){const mainContainer=document.querySelector('main')||document.body;fetch(page).then(res=>res.text()).then(html=>{const temp=document.createElement('div');temp.innerHTML=html;let content=temp.querySelector('main')||temp.querySelector('section')||temp;mainContainer.innerHTML=content.innerHTML;window.scrollTo({top:0,behavior:'smooth'});loadFooter();if(document.getElementById('ajax-comments-container')){loadComments()}})}function loadFooter(){fetch('assets/ajax/footer.html').then(res=>res.text()).then(html=>{document.querySelectorAll('#footerpad').forEach((f,i)=>{if(i>0)f.remove()});let footer=document.getElementById('footerpad');if(!footer){footer=document.createElement('div');footer.id='footerpad';document.body.appendChild(footer)}footer.innerHTML=html})}function loadComments(){fetch('assets/ajax/comments.html').then(res=>res.text()).then(html=>{var cont=document.getElementById('ajax-comments-container');if(cont)cont.innerHTML=html})}loadFooter();if(document.getElementById('ajax-comments-container')){loadComments()}});

// Banner de cookies global para todas las páginas
(function(){
  if(document.getElementById('cookie-banner')) return; // Evita duplicados
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.style = 'position:fixed;bottom:0;left:0;width:100vw;background:rgba(24,28,34,0.98);color:#fff;z-index:9999;padding:16px 10px;text-align:center;font-size:1rem;box-shadow:0 -2px 12px #23272f55;display:none;';
  banner.innerHTML = 'Este sitio utiliza cookies de terceros (por ejemplo, radioking.com) para mejorar la experiencia y mostrar el reproductor de radio. <a href="./terminos.html" style="color:#00bfff;text-decoration:underline;">Más información</a>.'+
    '<button id="cookie-accept" style="margin-left:18px;padding:6px 18px;border-radius:8px;background:#00bfff;color:#fff;border:none;cursor:pointer;">Aceptar</button>';
  document.body.appendChild(banner);
  var btn = banner.querySelector('#cookie-accept');
  function loadRadioIframe(){
    var placeholder = document.getElementById('radio-iframe-placeholder');
    if(placeholder && !document.getElementById('radio-iframe-real')){
      placeholder.innerHTML = '';
      var iframe = document.createElement('iframe');
      iframe.id = 'radio-iframe-real';
      iframe.src = 'https://player.radioking.io/oasis-stereo/?c=%2370A1FF&c2=%232F3542&f=h&i=0&p=1&s=1&li=1&popup=1&plc=NaN&h=undefined&l=750&v=2';
      iframe.className = 'responsive-radio-iframe';
      iframe.allow = 'autoplay';
      iframe.loading = 'lazy';
      iframe.title = 'Reproductor Oasis Stereo';
      iframe.width = '100%';
      iframe.height = '90';
      iframe.frameBorder = '0';
      iframe.setAttribute('decoding','async');
      placeholder.appendChild(iframe);
    }
  }
  if(!localStorage.getItem('cookieConsent')){
    banner.style.display = 'block';
  } else {
    loadRadioIframe();
  }
  btn && btn.addEventListener('click',function(){
    localStorage.setItem('cookieConsent','1');
    banner.style.display = 'none';
    loadRadioIframe();
  });
})();
