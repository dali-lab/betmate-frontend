// change require to es6 import style
import $ from 'jquery';
import './style.scss';

// recursive function to display a count on the screen for seconds spent on site
function displayCount(num) {
	// eslint-disable-next-line no-tabs
	setTimeout(() => {
		// display text on screen and increment count
		$('#main').text(`You've been on this page for ${num} seconds.`);

		// make recursive call
		displayCount(num + 1);
	}, 1000);
}

displayCount(1);
