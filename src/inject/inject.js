$(document).ready(function() {

	$('body').on('click', '#create_link, #stqc_show, #create-subtask, #edit-issue', function() {

		let
				/*
				* 'components' is a common element on all task/sub-task forms
				*	 so I am using it to determine when the form has been rendered in the DOM
				*/
				target = $('label[for=components]').parent(),
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
					'customfield_10109', // Client tracking number
					'customfield_12520', // Lawson Pay Code
					'customfield_12521', // TKC
					'customfield_12525', // Configurable?
					'customfield_12526', // Client Integration Required?
					'customfield_12825', // Projected Release
					'customfield_12826' // Projected Quarter
				];

		int = setInterval(function() {

			if (target) {

				list.forEach(function(completelyUnnecessaryField) {

					$('label[for=' + completelyUnnecessaryField + ']').parent().addClass('hide-from-view');
				});

				clearInterval(int);
			}
		}, 300);
	});
});
