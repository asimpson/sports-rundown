<script>
(function () {
  document.querySelectorAll('[data-youtube-load]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var wrap = link.closest('.embed-youtube-lite');
      if (!wrap) return;
      var id = wrap.getAttribute('data-youtube-id');
      var title = wrap.getAttribute('data-youtube-title') || 'YouTube video';
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = title;
      iframe.loading = 'lazy';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.style.width = '100%';
      iframe.style.maxWidth = '560px';
      iframe.style.aspectRatio = '16 / 9';
      iframe.style.border = '0';
      link.replaceWith(iframe);
      var fallback = wrap.querySelector('.embed-youtube-lite__fallback');
      if (fallback) fallback.remove();
    });
  });
})();
</script>
