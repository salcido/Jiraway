// big ass object representing all the possible JIRA fields
// we can hide. Defaults are all set to true.
let config = {
					components: {
						id: 'components',
						hide: true,
						label: 'Components'
					},
					duedate: {
						id: 'duedate',
						hide: true,
						label: 'Due Date'
					},
					environment: {
						id: 'environment',
						hide: true,
						label: 'Environment'
					},
					fixVersions: {
						id: 'fixVersions',
						hide: true,
						label: 'Fix Versions'
					},
					priority: {
						id: 'priority',
						hide: true,
						label: 'Priority'
					},
					originalEstimate: {
						id: 'timetracking_originalestimate',
						hide: true,
						label: 'Original Estimate'
					},
					remainingEstimate: {
						id: 'timetracking_remainingestimate',
						hide: true,
						label: 'Remaining Estimate'
					},
					versions: {
						id: 'versions',
						hide: true,
						label: 'Versions'
					},
					sprint: {
						id: 'customfield_10000',
						hide: true,
						label: 'Sprint'
					},
					epicLink: {
						id: 'customfield_10001',
						hide: true,
						label: 'Epic Link'
					},
					severity: {
						id: 'customfield_10104',
						hide: true,
						label: 'Severity'
					},
					clientTrackingNo: {
						id: 'customfield_10109',
						hide: true,
						label: 'Client Tracking Number'
					},
					functionalSpec: {
						id: 'customfield_10300',
						hide: true,
						label: 'Functional Spec'
					},
					lawsonPayCode: {
						id: 'customfield_12520',
						hide: true,
						label: 'Lawson Pay Code'
					},
					tkc: {
						id: 'customfield_12521',
						hide: true,
						label: 'TKC'
					},
					configurable: {
						id: 'customfield_12525',
						hide: true,
						label: 'Configurable?'
					},
					clientIntegration: {
						id: 'customfield_12526',
						hide: true,
						label: 'Client Ingegration Required?'
					},
					userAcceptance: {
						id: 'customfield_12528',
						hide: true,
						label: 'User Acceptance Tests'
					},
					projectedRelease: {
						id: 'customfield_12825',
						hide: true,
						label: 'Projected Release'
					},
					projectedQuarter: {
						id: 'customfield_12826',
						hide: true,
						label: 'Projected Quarter'
					}
				},
        localConfig;

// Upon first run, config object does not exist so we create it
if (!localStorage.getItem('config')) {

  chrome.storage.local.set({config: config}, function() {
    // noop
  });
}

// set the value of localConfig
localConfig = JSON.parse(localStorage.getItem('config'));


// Okay, now we can get down to business
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

  // Append options to body
  for (let i in localConfig) {

    let checked = localConfig[i].hide ? 'checked' : '',
        markup = '<div class="opt">' +
                    '<label>' +
                      '<input type="checkbox" value="' + localConfig[i].id + '"' + checked + '>' +
                        localConfig[i].label +
                    '</label>' +
                  '</div>';

    $('.config').append(markup);
  }

  // gotta hide 'em all
  $('.config').hide();

  // Show/hide advanced
  $('.adv').on('click', function(event) {

    event.preventDefault();

    $('.config').toggle('fast');

    $('body').toggleClass('expanded');
  });

  // Save preferences on checkbox changes
  $('input[type=checkbox]').on('click', function(event) {

    chrome.storage.local.get('config', function(result) {

      let newConfig = result.config;

      for (let i in result.config) {

        if (result.config[i].id === event.target.value) {

          newConfig[i].hide = event.target.checked;

        } else {

          newConfig[i].hide = result.config[i].hide;
        }
      }

      localStorage.setItem('config', JSON.stringify(newConfig));
    });
  });

  // Event listeners
  surplus.addEventListener('change', saveChecked);
  team.addEventListener('change', saveTeam);
});
