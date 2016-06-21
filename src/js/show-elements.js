(function() {

  let
      id = 'injectCss',
      link = document.getElementById(id);

  if (!link.getAttribute('disabled')) { link.setAttribute('disabled', true); }
}());
