document.addEventListener('DOMContentLoaded', function() {

  let
      body = document.body,
      surplus =	document.getElementById('hide-surplus'),
      team = document.getElementById('team');

  // Save checkbox preference
  function saveChecked(event) {

    chrome.storage.local.set({sanitize: surplus.checked}, function() {

      if (surplus.checked) {

        chrome.tabs.executeScript(null, {file: 'src/js/hide-elements.js'}, function() {});

        body.classList.add('on');

      } else {

        chrome.tabs.executeScript(null, {file: 'src/js/show-elements.js'}, function() {});

        body.classList.remove('on');
      }
    });
  }

  // Save team preference
  function saveTeam() {

    chrome.storage.local.set({team: team.value || ''}, function() {

      // Save the team name to localstorage for passing back to
      // runtime-messages.js
      if (!team.value) {

        localStorage.setItem('team', '');

      } else {

        localStorage.setItem('team', team.value);
      }

      // Log that team, bruh
      chrome.storage.local.get('team', function(result) {
        console.log('Team has been saved.', result);
      });
    });
  }

  // Check preference when popup is displayed
  chrome.storage.local.get('sanitize', function(result) {

    surplus.checked = result.sanitize;

    if (surplus.checked) {

      body.classList.add('on');

    } else {

      body.classList.remove('on');
    }
  });

  // Check preference when popup is displayed
  chrome.storage.local.get('team', function(result) {

    if (result.team) {

      team.value = result.team;

    } else {

      team.value = '';
    }
  });

  // Event listeners
  surplus.addEventListener('change', saveChecked);
  team.addEventListener('change', saveTeam);
});
