// big ass object representing all the possible JIRA fields
// we can hide.
let config = [
          {
            id: 'customfield_12527',
            hide: false,
            label: 'Acceptance Criteria'
          },
          {
            id: 'customfield_10706',
            hide: false,
            label: 'Account Manager'
          },
          {
            id: 'assignee',
            hide: false,
            label: 'Assignee'
          },
          {
            id: 'customfield_12524',
            hide: false,
            label: 'Business Benefit'
          },
          {
            id: 'customfield_12526',
            hide: false,
            label: 'Client Ingegration Required?'
          },
          {
            id: 'customfield_10109',
            hide: false,
            label: 'Client Tracking #'
          },
          {
            id: 'customfield_11200',
            hide: false,
            label: 'Code Reviewer'
          },
          {
            id: 'comment',
            hide: false,
            label: 'Comment'
          },
					{
						id: 'components',
						hide: false,
						label: 'Components'
					},
          {
            id: 'customfield_12525',
            hide: false,
            label: 'Configurable?'
          },
          {
            id: 'customfield_10106',
            hide: false,
            label: 'Customer'
          },
          {
            id: 'description',
            hide: false,
            label: 'Description'
          },
					{
						id: 'duedate',
						hide: false,
						label: 'Due Date'
					},
					{
						id: 'environment',
						hide: false,
						label: 'Environment'
					},
          {
            id: 'customfield_10001',
            hide: false,
            label: 'Epic Link'
          },
					{
						id: 'fixVersions',
						hide: false,
						label: 'Fix Versions'
					},
          {
            id: 'customfield_10300',
            hide: false,
            label: 'Functional Spec'
          },
          {
            id: 'issuetype',
            hide: false,
            label: 'Issue Type'
          },
          {
            id: 'labels',
            hide: false,
            label: 'Labels'
          },
          {
            id: 'customfield_12520',
            hide: false,
            label: 'Lawson Pay Code'
          },
					{
						id: 'timetracking_originalestimate',
						hide: false,
						label: 'Original Estimate'
					},
          {
            id: 'priority',
            hide: false,
            label: 'Priority'
          },
          {
            id: 'customfield_12826',
            hide: false,
            label: 'Projected Quarter'
          },
					{
						id: 'customfield_12825',
						hide: false,
						label: 'Projected Release'
					},
          {
            id: 'timetracking_remainingestimate',
            hide: false,
            label: 'Remaining Estimate'
          },
          {
            id: 'customfield_10104',
            hide: false,
            label: 'Severity'
          },
          {
            id: 'customfield_10000',
            hide: false,
            label: 'Sprint'
          },
          {
            id: 'customfield_10008',
            hide: false,
            label: 'Story Points'
          },
          {
            id: 'summary',
            hide: false,
            label: 'Summary'
          },
          {
            id: 'customfield_12521',
            hide: false,
            label: 'TKC'
          },
          {
            id: 'customfield_12528',
            hide: false,
            label: 'User Acceptance Tests'
          },
          {
            id: 'customfield_12523',
            hide: false,
            label: 'User Story'
          },
          {
            id: 'versions',
            hide: false,
            label: 'Versions'
          }
				],
        localConfig;

// Upon first run, config object does not exist so we create it
if (!localStorage.getItem('config')) {

  localStorage.setItem('config', JSON.stringify(config));

  chrome.storage.local.set({config: config}, function() {
    // noop
  });
}

// set the value of localConfig
localConfig = JSON.parse(localStorage.getItem('config'));



/**
 * BUSINESS TIME
 */

// it is the business time
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
  for (let i = 0; i < localConfig.length; i++) {

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
  $('input[type=checkbox]').on('click', function() {

    let newConfig = [];

    $('.config .opt input').each(function() {

      newConfig.push({ id: this.value,
                       hide: this.checked,
                       label: this.parentElement.innerHTML.split('>')[1]
                    });
    });

    chrome.storage.local.set({config: newConfig});

    localStorage.setItem('config', JSON.stringify(newConfig));
  });

  // Event listeners
  surplus.addEventListener('change', saveChecked);

  team.addEventListener('change', saveTeam);
});
