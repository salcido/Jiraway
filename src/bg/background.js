let initElems = [];

// Inject the css/js files into the DOM
function appendFragment(source) {

  let fragment = document.createDocumentFragment();

  source.forEach(function(elm) {

    fragment.appendChild(elm);
  });

  (document.head || document.documentElement).appendChild(fragment.cloneNode(true));
}

// Check for last saved preference
chrome.storage.sync.get('sanitize', function(result) {

  let inject;

  // create the object if it does not yet exist
  if (!result) {

    chrome.storage.sync.set({sanitize: true});

    console.log('Preferences created.');
  }

  // Create injectCss element...
  inject = document.createElement('link');
  inject.rel = 'stylesheet';
  inject.type = 'text/css';
  inject.href = chrome.extension.getURL('src/inject/inject.css');
  inject.id = 'injectCss';

  // disable if needed
  if (!result.sanitize) {

    inject.setAttribute('disabled', true);
  }

  initElems.push(inject);

  appendFragment(initElems);
});
