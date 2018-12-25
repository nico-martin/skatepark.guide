import { rejects } from "assert";

export default () => {
	return new Promise((resolve, reject) => {
		if (!"serviceWorker" in navigator) {
			reject();
			return;
		}

		navigator.serviceWorker
			.register("/service-worker.js")
			.then(reg => {
				reg.onupdatefound = function () {
					var installingWorker = reg.installing;
					installingWorker.onstatechange = function () {
						switch (installingWorker.state) {
							case "installed":
								resolve(navigator.serviceWorker.controller);
								break;

							case "redundant":
								//console.error('The installing service worker became redundant.');
								break;
						}
					};
				};
			})
			.catch(registrationError => {
				console.log("SW registration failed: ", registrationError);
				reject();
			});
	});
}