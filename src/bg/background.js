let initElems = [];

// Inject the css/js files into the DOM
function appendFragment(source) {

  let fragment = document.createDocumentFragment();

  source.forEach(function(elm) {

    fragment.appendChild(elm);
  });

  (document.head || document.documentElement).appendChild(fragment.cloneNode(true));
}

// Check for last saved preference, create it if it does not exist,
// create the DOM element(s) and push them into the `initElems` array
// to be appended with `appendFragment()`.
chrome.storage.local.get('sanitize', function(result) {

  let inject,
      inject_js;

  // Create injectCss element...
  inject = document.createElement('link');
  inject.rel = 'stylesheet';
  inject.type = 'text/css';
  inject.href = chrome.extension.getURL('src/inject/inject.css');
  inject.id = 'injectCss';

  // inject.js
  inject_js = document.createElement('script');
  inject_js.type = 'text/javascript';
  inject_js.src = chrome.extension.getURL('src/inject/inject.js');

  // disable if needed
  if (!result.sanitize) {

    inject.setAttribute('disabled', true);
  }

  initElems.push(inject_js);
  initElems.push(inject);

  appendFragment(initElems);
});

// Set current team to localStorage.
// TODO add refresh notice
chrome.storage.local.get('team', function(result) {

  localStorage.setItem('team', result.team);
});

chrome.storage.local.get('config', function(result) {
console.log('RESULT FROM BG', result);
  if (result.config) {
    localStorage.setItem('config', JSON.stringify(result.config));
  }
});
