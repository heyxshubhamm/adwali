<?php
/* adwali lead endpoint: mails the enquiry + keeps a CSV backup. */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }

/* Honeypot: bots fill hidden fields, humans never see them. */
if (!empty($_POST['company_site'])) { echo '{"ok":true}'; exit; }

function fld($k, $max = 500) {
  $v = isset($_POST[$k]) ? trim((string)$_POST[$k]) : '';
  $v = str_replace(["\r", "\n"], ' ', $v);           /* header-injection guard */
  $v = strip_tags($v);
  return strlen($v) > $max ? substr($v, 0, $max) : $v;
}

$name    = fld('name', 120);
$email   = fld('email', 160);
$phone   = fld('phone', 40);
$website = fld('website', 200);
$message = strip_tags(trim($_POST['message'] ?? ''));
if (strlen($message) > 3000) { $message = substr($message, 0, 3000); }
$page    = fld('page', 200);

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(422); echo '{"ok":false,"error":"invalid"}'; exit;
}

$when = date('Y-m-d H:i:s');
$ip   = $_SERVER['REMOTE_ADDR'] ?? '';

/* CSV backup first, so no lead is ever lost even if mail fails. */
$dir = __DIR__ . '/leads';
if (!is_dir($dir)) { @mkdir($dir, 0755, true); }
$fp = @fopen($dir . '/leads.csv', 'a');
if ($fp) {
  @fputcsv($fp, [$when, $name, $email, $phone, $website, $message, $page, $ip]);
  @fclose($fp);
}

$to      = 'hello@adwali.com';
$subject = 'New enquiry from adwali.com: ' . $name;
$body    = "New enquiry from adwali.com\n"
         . "----------------------------------------\n"
         . "Name:    $name\n"
         . "Email:   $email\n"
         . "Phone:   $phone\n"
         . "Website: $website\n"
         . "Page:    $page\n"
         . "Time:    $when\n"
         . "----------------------------------------\n\n"
         . ($message !== '' ? $message : '(no message)') . "\n";
$headers = "From: adwali website <no-reply@adwali.com>\r\n"
         . "Reply-To: $name <$email>\r\n"
         . "X-Mailer: adwali-site\r\n"
         . "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to, $subject, $body, $headers);

/* Plain form posts (no JS) get sent to the thank-you page instead of raw JSON. */
$accept = $_SERVER['HTTP_ACCEPT'] ?? '';
if (strpos($accept, 'text/html') !== false && strpos($accept, 'application/json') === false) {
  header('Location: /thank-you/', true, 303); exit;
}

echo json_encode(['ok' => true, 'mailed' => (bool)$sent]);
