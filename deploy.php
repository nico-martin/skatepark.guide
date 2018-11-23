<?php
// Forked from https://gist.github.com/1809044
// Available from https://gist.github.com/nichtich/5290675#file-deploy-php
echo <<<EOT
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>$TITLE</title>
</head>
<body style="background-color: #000000; color: #FFFFFF; font-weight: bold; padding: 0 10px;">
<pre>
EOT;
// Check whether client is allowed to trigger an update
$allowed = false;
if ( array_key_exists( 'auth', $_GET ) && 'pwGmCuEjcBYXq6Fcs9rcUqWJ7ZvNFMn9gKhMH67x' == $_GET['auth'] ) {
	$allowed = true;
}

if ( ! $allowed ) {
	header( 'HTTP/1.1 403 Forbidden' );
	echo "<span style=\"color: #ff0000\">Sorry, no hamster - better convince your parents!</span>\n";
	echo "</pre>\n</body>\n</html>";
	exit;
}
flush();
// Actually run the update
$commands = array(
	'git pull',
);
$output   = "\n";
$log      = "####### " . date( 'Y-m-d H:i:s' ) . " #######\n";
foreach ( $commands AS $command ) {
	// Run it
	$tmp = shell_exec( "$command 2>&1" );
	// Output
	$output .= "<span style=\"color: #6BE234;\">\$</span> <span style=\"color: #729FCF;\">{$command}\n</span>";
	$output .= htmlentities( trim( $tmp ) ) . "\n";
	$log    .= "\$ $command\n" . trim( $tmp ) . "\n";
}
$log .= "\n";
file_put_contents( 'deploy-log.txt', $log, FILE_APPEND );
echo $output;
?>
</pre>
</body>
</html>