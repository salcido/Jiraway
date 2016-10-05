$(document).ready(function() {

	function configureForm() {

		let
				count = 0,
				currentTeam,
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
					//'customfield_10106', // (Customer is now a required field)
					'customfield_10109', // Client Tracking Number
					'customfield_10300', // Functional Spec
					'customfield_12520', // Lawson Pay Code
					'customfield_12521', // TKC
					'customfield_12525', // Configurable?
					'customfield_12526', // Client Integration Required?
					'customfield_12528', // User Acceptance Tests
					'customfield_12825', // Projected Release
					'customfield_12826' // Projected Quarter
				],
				team = localStorage.getItem('team');

		int = setInterval(function() {

			currentTeam = document.getElementById('customfield_12820');

			// wait for DOM elements to render
			if ($('.jira-dialog-content .qf-container .form-body .content .active-pane').children().length > 0) {

				list.forEach(function(fieldName) {

					$('label[for=' + fieldName + ']').parent().addClass('hide-from-view');
				});

				if (!currentTeam.value) {
					// Select Sprint team
					currentTeam.value = team;
				}

				// Jira is slow and it sucks so I am literally doing this three times to make sure
				// all DOM elements are hidden. Come at me, bro!
				count++;

				if (count > 3) {

					clearInterval(int);
				}
			}

		}, 300);
	}

	// Event listener
	$('body').on('click', '#create_link, #stqc_show, #create-subtask, #edit-issue, .issueaction-edit-issue', function() {
		configureForm();
	});

	$('body').on('click', '#project-suggestions', function() {
		console.log('flicked..............');
		$(document).ajaxSuccess(function() {
			console.log('ajaxSuccess fired');
			configureForm();
		});
		setTimeout(function(){
			console.log('excecuting.....');
			//configureForm();
		}, 3000);
	});

	// Append N/A and Yes buttons to header
	$('body').on('click', '#action_id_781', function() {

		let
				int,
				markup = '<span class="jiraway-selects">' +
										'Mark select inputs as: &nbsp;' +
										'<button class="jiraway-na">N/A</button>' +
										'&nbsp;' +
										'<button class="jiraway-yes">Yes</button>' +
									'</span>';

		int = setInterval(function() {

			if ($('.jira-dialog-content').length > 0) {

				$('.jira-dialog-heading').append(markup);

				if ($('.jiraway-selects').length > 0) {

					clearInterval(int);
				}
			}
		}, 300);
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
