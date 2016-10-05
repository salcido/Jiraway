$(document).ready(function() {

	function configureForm() {

		let
				currentTeam,
				list = [
					'components', // Components
					'duedate', // Due Date
					'environment', // Environment
					'fixVersions', // Fix versions
					'priority', // Priority
					'timetracking_originalestimate', // Original Estimate
					'timetracking_remainingestimate', // Remaining Estimate
					'versions', // Versions
					'customfield_10000', // Sprint
					'customfield_10001', // Epic Link
					'customfield_10104', // Severity
					'customfield_10109', // Client Tracking Number
					'customfield_10300', // Functional Spec
					'customfield_12520', // Lawson Pay Code
					'customfield_12521', // TKC
					'customfield_12525', // Configurable?
					'customfield_12526', // Client Integration Required?
					'customfield_12528', // User Acceptance Tests
					'customfield_12825', // Projected Release
					'customfield_12826'  // Projected Quarter
				],
				team = localStorage.getItem('team');

		$(document).ajaxSuccess(function() {

			currentTeam = document.getElementById('customfield_12820');

			// wait for DOM elements to render
			if ($('.jira-dialog-content .qf-container .form-body .content .active-pane').children().length > 0) {

				list.forEach(function(fieldName) {

					$('label[for=' + fieldName + ']').parent().addClass('hide-from-view');
				});

				if (currentTeam && !currentTeam.value) {
					// Select Sprint team
					currentTeam.value = team;
				}
			}
		});
	}

	// Hide stuff when Code Review is clicked
	function codeReviewForm() {

		$(document).ajaxSuccess(function() {
			$('#customfield_13418-1').parent().parent().addClass('hide-from-view');
			$('#customfield_13417').parent().addClass('hide-from-view');
			$('#customfield_12701').parent().addClass('hide-from-view');
			$('#customfield_12618').parent().addClass('hide-from-view');
			$('#customfield_12704').parent().addClass('hide-from-view');
			$('#customfield_12619').parent().addClass('hide-from-view');
		});
	}

	// Event listeners
	$('body').on('click', '#create_link, #stqc_show, #create-subtask, #edit-issue, .issueaction-edit-issue', function() {

		configureForm();
	});

	// Update fields when project is changed
	$('body').on('click', '#project-suggestions', function() {

		$(document).ajaxSuccess(function() {

			configureForm();
		});
	});

	// Update fields when Code Review is clicked
	$('#action_id_821').on('click', function() {

		codeReviewForm();
	});

	console.log('getting config from INJECT: ///////////////', localStorage.getItem('config'));
});
