import {maps} from "./settings";

const callbackName = 'gmapsCallback';
let initialized = !!window.google;
let resolveInitPromise;
let rejectInitPromise;

const initPromise = new Promise((resolve, reject) => {
	resolveInitPromise = resolve;
	rejectInitPromise = reject;
});

export default function init() {
	if (initialized) return initPromise;

	const head = document.querySelector('head');
	const script = document.createElement('script');

	initialized = true;
	window[callbackName] = () => resolveInitPromise(window.google);
	script.async = true;
	script.defer = true;
	script.src = `https://maps.googleapis.com/maps/api/js?key=${maps.key}&callback=${callbackName}`;
	script.onerror = rejectInitPromise;
	head.appendChild(script);
	/**
	 * Prevent roboto from loading
	 */
	const insertBefore = head.insertBefore;
	head.insertBefore = function (newElement, referenceElement) {
		if (
			newElement.href &&
			newElement.href.indexOf(
				'https://fonts.googleapis.com/css?family=Roboto'
			) === 0
		) {
			return;
		}
		insertBefore.call(head, newElement, referenceElement);
	};

	return initPromise;
}