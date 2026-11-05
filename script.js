// Reemplazá cada data-youtube por el ID del video (lo que va después de "v=" en la URL de YouTube).
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