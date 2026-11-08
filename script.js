// 1) Videos: poné el ID de YouTube en data-youtube="" (lo que va después de "v=" en la URL).
document.querySelectorAll('.video .frame').forEach(function(f){
  var id=(f.dataset.youtube||'').trim();
  if(id){
    var i=document.createElement('iframe');
    i.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id);
    i.title='Entrevista completa';i.allowFullscreen=true;i.loading='lazy';
    i.allow='accelerometer; encrypted-media; picture-in-picture; fullscreen';
    f.appendChild(i);
  }else{
    f.insertAdjacentHTML('beforeend','<div class="soon">Video próximamente</div>');
  }
});

// 2) Píxeles que caen desde el título sobre la foto (páginas de historias).
// Ajustes: ROWS = alto máximo en filas | PASO = ms entre cuadros | GOTAS = cantidad de píxeles sueltos que caen (0 a 1)
(function(){
  var img=document.querySelector('.story .hero-img'); if(!img) return;
  var ROWS=8, PASO=130, GOTAS=.45;
  var wrap=document.createElement('div');
  wrap.className='herowrap'+(img.classList.contains('inset')?' inset':'');
  img.parentNode.insertBefore(wrap,img); wrap.appendChild(img); img.classList.remove('inset');
  var cv=document.createElement('canvas'); cv.className='pixdrip'; cv.setAttribute('aria-hidden','true'); wrap.appendChild(cv);
  var ctx=cv.getContext('2d'), cell=26, cols=0, last=0, visible=true;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function h(n){var x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);}
  function draw(now){
    var t=Math.floor(now/PASO)*PASO;
    ctx.clearRect(0,0,cols*cell,ROWS*cell);
    ctx.fillStyle=getComputedStyle(cv).color;
    for(var i=0;i<cols;i++){
      var v=(Math.sin(i*.9+t*.0011)+Math.sin(i*.37-t*.0017)+Math.sin(i*2.3+t*.0007))/3;
      var L=Math.max(0,Math.round((v+.2)*4.4)+(h(i)>.88?1:0));
      for(var r=0;r<L;r++) ctx.fillRect(i*cell,r*cell,cell,cell);
      if(h(i*7.3+Math.floor(t/390))<.1 && L+1<ROWS) ctx.fillRect(i*cell,(L+1)*cell,cell,cell);
      var g=Math.floor((t/(PASO*1.5)+h(i+.5)*30)%26);
      if(h(i*3.1)<GOTAS && g>L+1 && g<ROWS) ctx.fillRect(i*cell,g*cell,cell,cell);
    }
  }
  function size(){
    var w=wrap.clientWidth, dpr=window.devicePixelRatio||1;
    cell=Math.max(12,Math.round(w/34)); cols=Math.ceil(w/cell);
    cv.style.width=cols*cell+'px'; cv.style.height=ROWS*cell+'px';
    cv.width=Math.round(cols*cell*dpr); cv.height=Math.round(ROWS*cell*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0); draw(last||0);
  }
  size(); window.addEventListener('resize',size);
  if(reduce) return;
  if('IntersectionObserver' in window) new IntersectionObserver(function(e){visible=e[0].isIntersecting;}).observe(wrap);
  (function loop(now){ if(visible && now-last>=PASO){last=now;draw(now);} requestAnimationFrame(loop); })(0);
})();
