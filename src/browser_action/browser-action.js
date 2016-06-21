document.addEventListener('DOMContentLoaded', function () {

  let
      body = document.body,
      garbage =	document.getElementById('hide-garbage');

  function savePref(event) {

    chrome.storage.sync.set({sanitize: garbage.checked}, function() {

      if (garbage.checked) {

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

    garbage.checked = result.sanitize;

    if (garbage.checked) {

      body.classList.add('on');

    } else {

      body.classList.remove('on');
    }
  });

  garbage.addEventListener('change', savePref);
});
