export default function (image, ratio, biggestSize = false) {
	if (image === null || typeof image[ratio] === 'undefined') {
		return '';
	}

	const bemBlock = 'lazyimage';
	const img = image[ratio];
	let biggestWidth = 0;
	let biggestHeight = 0;
	if (biggestSize && biggestSize in img['sizes']) {
		biggestWidth = img['sizes'][biggestSize]['width'];
		biggestHeight = img['sizes'][biggestSize]['height'];
	} else {
		biggestSize = false;
	}
	const sizes = {};
	Object.keys(img['sizes']).forEach((size) => {
		if (!biggestSize && img['sizes'][size]['width'] >= biggestWidth) {
			biggestWidth = img['sizes'][size]['width'];
			biggestHeight = img['sizes'][size]['height'];
		}
		sizes[img['sizes'][size]['width']] = img['sizes'][size]['url'];
	});

	const sizesArray = [];
	Object.keys(sizes).forEach((size) => {
		sizesArray.push(`${sizes[size]} ${size}w`);
	});

	return `<figure class="${bemBlock}">
		<img class="${bemBlock}__preview" src="${img.placeholder}"/>
		<img width="${biggestWidth}" height="${biggestHeight}" class="${bemBlock}__image ${bemBlock}__image--lazyload" data-sizes="auto" src="${img.placeholder}" data-srcset="${sizesArray.join(', ')}" />
	</figure>`;
	/*
	<figure class="lazyimage front-slider__element is-selected">
		<img class="lazyimage__preview" src="http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-80x53-q90.jpg">
		<img width="1500" height="1000" alt="" title="Young_Chefs_1500px" class="lazyimage__image lazyautosizes lazyimage__image--lazyloaded" data-sizes="auto" src="http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-80x53-q90.jpg" data-srcset="http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px.jpg 1500w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-1200x800.jpg 1200w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-640x426.jpg 640w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-320x213.jpg 320w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-160x106.jpg 160w" sizes="840px" srcset="http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px.jpg 1500w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-1200x800.jpg 1200w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-640x426.jpg 640w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-320x213.jpg 320w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-160x106.jpg 160w"><noscript><img width='1500' height='1000' alt='' title='Young_Chefs_1500px' src='http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px.jpg' srcset='http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px.jpg 1500w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-1200x800.jpg 1200w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-640x426.jpg 640w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-320x213.jpg 320w, http://lifestyle.vzug.hello/wp-content/uploads/sites/2/2018/03/Young_Chefs_1500px-160x106.jpg 160w'/></noscript></figure>	 */
};