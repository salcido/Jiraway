document.addEventListener('DOMContentLoaded', function () {

  let
      body = document.body,
      surplus =	document.getElementById('hide-surplus');

  function savePref(event) {

    chrome.storage.sync.set({sanitize: surplus.checked}, function() {

      if (surplus.checked) {

        chrome.tabs.executeScript(null, {file: 'src/js/hide-elements.js'}, function() {});

        body.classList.add('on');

      } else {

        chrome.tabs.executeScript(null, {file: 'src/js/show-elements.js'}, function() {});

        body.classList.remove('on');
      }
    });
  }

  // Check preference when popup is displayed
  chrome.storage.sync.get('sanitize', function(result) {

    surplus.checked = result.sanitize;

    if (surplus.checked) {

      body.classList.add('on');

    } else {

      body.classList.remove('on');
    }
  });

  surplus.addEventListener('change', savePref);
});
