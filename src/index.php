<?php
$uri = $_SERVER['REQUEST_URI'];
$re = '/\/[a-z]{2}\/parks\/([a-z0-9-]*)\//m';
preg_match_all( $re, $uri, $matches, PREG_SET_ORDER, 0 );

$data = false;

if ( ! empty( $matches ) ) {
	$slug = $matches[0][1];
	$file = dirname( __FILE__ ) . "/ssr-cache/{$slug}.json";
	if ( file_exists( $file ) && filemtime( $file ) <= time() + 60 * 60 * 8 ) {
		$data_raw = file_get_contents( $file );
	} else {
		$url = "https://skateparkguide.ch/wp-json/wp/v2/parks/?slug={$slug}";
		$ch = curl_init();
		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
		curl_setopt( $ch, CURLOPT_URL, $url );
		curl_setopt( $ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)' );
		$data_raw = curl_exec( $ch );
		curl_close( $ch );
		@mkdir( 'ssr-cache' );
		file_put_contents( $file, $data_raw );
	}

	$data = json_decode( $data_raw, true );
	if ( $data ) {
		$park = $data[0];
	}
}
?>
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<title>
		<?php echo ( $data ? $park['title']['rendered'] . ' 💗 Skatepark.guide' : '<%= htmlWebpackPlugin.options.title %>' ); ?>
	</title>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<meta name="robots" content="noindex, nofollow">
	<meta name="description" content="<?php echo ( $data ? htmlspecialchars( strip_tags( $park['content']['rendered'] ) ) : '' ); ?>">

	<meta property="og:image" content="<?php echo ( $data ? htmlspecialchars( strip_tags( $park['head-image']['3x2']['sizes']['page']['url'] ) ) : '' ); ?>">
	<meta property="og:image:width" content="<?php echo ( $data ? htmlspecialchars( strip_tags( $park['head-image']['3x2']['sizes']['page']['width'] ) ) : '' ); ?>">
	<meta property="og:image:height" content="<?php echo ( $data ? htmlspecialchars( strip_tags( $park['head-image']['3x2']['sizes']['page']['height'] ) ) : '' ); ?>">

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:image" content="<?php echo ( $data ? htmlspecialchars( strip_tags( $park['head-image']['3x2']['sizes']['page']['url'] ) ) : '' ); ?>">

	<style id="loading-screen">
		.loading-body {
			position: fixed;
			z-index: -1;
			bottom: 0;
			right: 0;
			left: 0;
			top: 0;
			background-color: #f3f3f3;
		}

		.loading-body__icon {
			width: 50vmin;
			position: absolute;
			left: 50%;
			top: 50%;
			margin: -25vmin 0 0 -25vmin;
		}
	</style>
	<script id="loadFonts">
		function loadFont(t, e, n) {
			var a = navigator.userAgent;
			if (window.addEventListener && (!a.match(/(Android (2|3|4.0|4.1|4.2|4.3))|(Opera (Mini|Mobi))/) || a.match(/Chrome/))) {
				var o = {};
				try {
					o = localStorage || {}
				} catch (t) {
				}
				var r = t, i = r + "url", s = r + "css", d = o[i], c = o[s], l = document.createElement("style");
				if (l.rel = "stylesheet", document.head.appendChild(l), !c || d !== e && d !== n) {
					var u = n && function () {
						if (!window.FontFace) return !1;
						var t = new FontFace("t", 'url("data:application/font-woff2,") format("woff2")', {});
						return t.load(), "loading" === t.status
					}() ? n : e, f = new XMLHttpRequest;
					f.open("GET", u), f.onload = function () {
						f.status >= 200 && f.status < 400 && (o[i] = u, o[s] = l.textContent = f.responseText)
					}, f.send()
				} else l.textContent = c
			}
		}

		loadFont('FontCairo-1.0', '/assets/fonts/fonts-woff.css', '/assets/fonts/fonts-woff2.css');
	</script>
	<!-- Matomo -->
	<script type="text/javascript">
		var _paq = _paq || [];
		/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
		_paq.push(["setCookieDomain", "*.skatepark.guide"]);
		_paq.push(["setDoNotTrack", true]);
		_paq.push(['trackPageView']);
		_paq.push(['enableLinkTracking']);
		(function () {
			var u = "https://analytics.sayhello.agency/";
			_paq.push(['setTrackerUrl', u + 'piwik.php']);
			_paq.push(['setSiteId', '5']);
			var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
			g.type = 'text/javascript'; g.async = true; g.defer = true; g.src = u + 'piwik.js'; s.parentNode.insertBefore(g, s);
		})();
	</script>
	<!-- End Matomo Code -->
</head>

<body>
	<svg class="lazysizes-svgfilter">
		<filter id="ls-sharp-blur">
			<feGaussianBlur stdDeviation="10"></feGaussianBlur>
			<feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 9 0"></feColorMatrix>
			<feComposite in2="SourceGraphic" operator='in'></feComposite>
		</filter>
	</svg>
	<div id="app"></div>
	<div class="loading-body">
		<svg class="loading-body__icon" viewBox="0 0 885 885" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
		 clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414">
			<g fill-rule="nonzero">
				<path d="M442.672 364.647c-168.456 0-231.218-52.149-303.941-191.939H99.956L.344 411.544v282.149H885V411.544l-99.619-238.836h-38.768c-72.717 139.79-135.479 191.939-303.941 191.939"
				 fill="#fff" />
				<path d="M785.381 172.709h-38.769l86.62 238.836c-72.711 139.783-222.093 235.239-390.561 235.239-168.455 0-317.837-95.456-390.56-235.239l86.62-238.836H99.956L.343 411.545v282.764h884.656V411.545l-99.618-238.836z"
				 fill="#dedede" />
			</g>
			<g fill-rule="nonzero">
				<path d="M598.593 173.418c0 86.122-155.918 311.854-155.918 311.854s-155.93-225.732-155.93-311.854c0-86.116 69.815-155.918 155.93-155.918 86.109 0 155.918 69.802 155.918 155.918"
				 fill="#dedede" />
				<path class="loading-body__eye" d="M403.689 240.935l-38.978-67.515 38.978-67.515h77.968l38.978 67.515-38.978 67.515h-77.968z"
				 fill="#f3f3f3">
					<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 442.7 173.4" to="360 442.7 173.4"
					 dur="2.5s" repeatCount="indefinite" />
				</path>
			</g>
			<path d="M75.161 838.452v23.586H.344V730.576h26.679v107.876h48.138zM139.151 864.358c-13.275-.001-23.907-2.385-31.898-7.154-7.991-4.768-13.759-12.082-17.303-21.942-3.544-9.86-5.316-22.651-5.316-38.375 0-15.853 1.772-28.773 5.316-38.762 3.544-9.988 9.312-17.463 17.303-22.425 7.991-4.962 18.623-7.443 31.898-7.443 13.275 0 23.908 2.481 31.899 7.443s13.758 12.437 17.303 22.425c3.544 9.989 5.316 22.909 5.316 38.762 0 15.466-1.708 28.097-5.123 37.892-3.415 9.795-9.119 17.173-17.109 22.135-7.991 4.962-18.753 7.443-32.286 7.444zm0-23.2c6.96 0 12.405-1.449 16.336-4.349 3.931-2.9 6.702-7.54 8.313-13.92 1.611-6.379 2.417-15.047 2.417-26.002 0-10.955-.838-19.687-2.513-26.196-1.676-6.508-4.479-11.341-8.41-14.499-3.931-3.158-9.312-4.736-16.143-4.736-6.83 0-12.211 1.578-16.142 4.736-3.931 3.158-6.734 7.991-8.41 14.499-1.675 6.509-2.513 15.241-2.513 26.196 0 10.182.709 18.43 2.126 24.746 1.418 6.315 4.092 11.148 8.023 14.499 3.931 3.351 9.57 5.026 16.916 5.026zM281.439 838.259h-46.012l-5.219 23.779h-26.679l29.578-131.462h50.652l29.578 131.462h-26.678l-5.22-23.779zm-18.366-85.643h-9.28l-13.339 62.444h35.958l-13.339-62.444zM375.201 730.576c14.951 0 26.422 2.095 34.412 6.284 7.991 4.188 13.565 10.794 16.723 19.815 3.158 9.022 4.736 21.524 4.736 37.505 0 16.626-1.546 29.773-4.639 39.439-3.094 9.666-8.668 16.819-16.723 21.459-8.055 4.64-19.558 6.96-34.509 6.96H330.93V730.576h44.271zm0 108.263c8.378 0 14.597-1.676 18.656-5.027 4.06-3.351 6.702-8.152 7.927-14.403 1.224-6.25 1.836-15.176 1.836-26.775 0-10.311-.644-18.108-1.933-23.392-1.289-5.285-3.931-9.183-7.926-11.697-3.996-2.513-10.182-3.77-18.56-3.77h-17.592v85.064h17.592zM454.271 730.576h26.679v131.461h-26.679zM614.925 730.576v131.462H571.04l-32.865-108.263h-1.934v108.263h-26.679V730.576h45.045l31.706 108.263h1.933V730.576h26.679zM691.675 864.358c-13.533-.001-24.198-2.385-31.996-7.154-7.797-4.768-13.371-12.115-16.722-22.039-3.351-9.924-5.027-23.07-5.027-39.438 0-16.11 1.74-29.095 5.22-38.955 3.48-9.86 9.054-17.077 16.723-21.652 7.668-4.576 17.947-6.863 30.835-6.863 11.986 0 24.939 1.353 38.859 4.059l6.959 1.354-.773 20.685c-14.951-1.675-27.581-2.513-37.892-2.513-10.182 0-17.592 1.708-22.232 5.123-4.64 3.416-7.508 8.056-8.603 13.92-1.096 5.864-1.643 14.596-1.643 26.195 0 11.471.773 20.299 2.319 26.486 1.547 6.186 4.35 10.665 8.41 13.436 4.06 2.771 10.085 4.156 18.076 4.156 7.604 0 12.953-.257 16.046-.773v-25.519h-11.986v-23.199h38.278v68.244c-18.817 2.964-33.767 4.446-44.851 4.447zM758.179 829.946h27.839v32.092h-27.839zM807.67 829.946h27.839v32.092H807.67zM857.161 829.946H885v32.092h-27.839z"
			 fill="#dedede" fill-rule="nonzero" />
		</svg>
	</div>
</body>

</html>
