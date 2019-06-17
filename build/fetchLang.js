import fs from 'fs';
import request from 'sync-request';

const res = request('GET', 'https://skateparkguide.ch/wp-json/skateparkguide/v1/lang/de/', {
	headers: {
		'user-agent': 'example-user-agent',
	},
});

fs.writeFile('./build/tmp/de.json', res.getBody(), function (err) {
	if (err) {
		return console.log(err);
	}

	console.log('The language file was saved.');
});