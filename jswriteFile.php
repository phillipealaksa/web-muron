<?php
$data = json_decode(file_get_contents('php://input'), true);
$content = $data['content'];
$filePath = $data['filePath'];

if (file_put_contents($filePath, $content) === false) {
    die("Failed to write content to file: $filePath");
}

exit;
?>