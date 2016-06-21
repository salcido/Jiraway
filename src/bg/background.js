let initElems = [];

function appendFragment(source) {

  let fragment = document.createDocumentFragment();

  source.forEach(function(elm) {

    fragment.appendChild(elm);
  });

  (document.head || document.documentElement).appendChild(fragment.cloneNode(true));
}

chrome.storage.sync.get('sanitize', function(result) {

  let inject;

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
