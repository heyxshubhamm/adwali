<?php
/* adwali dynamic sitemap: rebuilt on every request from what is actually on the server.
   Add or update a page folder and the sitemap updates itself, no manual edits. */
header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: public, max-age=3600');

$base    = 'https://www.adwali.com';
$root    = __DIR__;
$exclude = ['404', 'thank-you', 'api', 'assets', '_next', 'cgi-bin'];

$hubs    = ['services','industries','work','blog','about','contact','pricing','process','free-audit','free-tools'];
$legal   = ['privacy','terms','cookie-policy'];
$locations = ['jaipur','delhi','mumbai'];

function tier($slug, $hubs, $legal, $locations) {
  if (in_array($slug, $hubs))      return ['0.9', 'weekly'];
  if (in_array($slug, $legal))     return ['0.3', 'yearly'];
  if (in_array($slug, $locations)) return ['0.8', 'monthly'];
  if (strpos($slug, 'industry-') === 0) return ['0.7', 'monthly'];
  if (strpos($slug, 'case-') === 0)     return ['0.7', 'monthly'];
  return ['0.8', 'monthly'];
}

$urls = [];
$urls[] = [$base . '/', filemtime($root . '/index.html'), '1.0', 'weekly'];

$dirs = scandir($root);
sort($dirs);
foreach ($dirs as $d) {
  if ($d[0] === '.' || in_array($d, $exclude)) continue;
  $idx = $root . '/' . $d . '/index.html';
  if (is_dir($root . '/' . $d) && is_file($idx)) {
    list($pri, $freq) = tier($d, $hubs, $legal, $locations);
    $urls[] = [$base . '/' . $d . '/', filemtime($idx), $pri, $freq];
  }
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $u) {
  printf("  <url><loc>%s</loc><lastmod>%s</lastmod><changefreq>%s</changefreq><priority>%s</priority></url>\n",
    htmlspecialchars($u[0], ENT_XML1), date('c', $u[1]), $u[3], $u[2]);
}
echo '</urlset>' . "\n";
