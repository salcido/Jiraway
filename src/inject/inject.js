$(document).ready(function() {

	$('body').on('click', '#create_link, #stqc_show, #create-subtask, #edit-issue, .issueaction-edit-issue', function() {

		let
				/*
				* 'components' is a common element on all task/sub-task forms
				*	 so I am using it to determine when the form has been rendered in the DOM
				*/
				target = $('.jira-dialog-heading').parent(),
				int,
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
					'customfield_10106', // Customer
					'customfield_10109', // Client Tracking Number
					'customfield_10300', // Functional Spec
					'customfield_12520', // Lawson Pay Code
					'customfield_12521', // TKC
					'customfield_12525', // Configurable?
					'customfield_12526', // Client Integration Required?
					'customfield_12528', // User Acceptance Tests
					'customfield_12825', // Projected Release
					'customfield_12826' // Projected Quarter
				];

		int = setInterval(function() {

			// wait for DOM elements to render
			if (target) {

				list.forEach(function(fieldName) {

					$('label[for=' + fieldName + ']').parent().addClass('hide-from-view');
				});

				clearInterval(int);
			}
		}, 500);
	});

	// Append N/A and Yes buttons to header
	$('body').on('click', '#action_id_781', function() {

		let int,
				markup = '<span class="jiraway-selects">' +
										'Mark select inputs as: &nbsp;' +
										'<button class="jiraway-na">N/A</button>' +
										'&nbsp;' +
										'<button class="jiraway-yes">Yes</button>' +
									'</span>';

		int = setInterval(function() {

			if ($('.jira-dialog-heading').length > 0) {

				clearInterval(int);

				$('.jira-dialog-heading').append(markup);
			}
		}, 500);
	});

	// N/A button listener
	$('body').on('click', '.jiraway-na', function() {

		$('.select.cf-select option:contains("N/A")').prop('selected', true);
	});

	// Yes button listener
	$('body').on('click', '.jiraway-yes', function() {

		$('.select.cf-select option:contains("Yes")').prop('selected', true);
	});
});
