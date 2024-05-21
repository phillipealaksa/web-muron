<?php
$data = json_decode(file_get_contents('php://input'), true);
$directory = $data['directory'];

if (is_dir($directory)) {
    $files = scandir($directory);

    $files = array_diff($files, array('.', '..'));

    echo json_encode($files);
}


exit;
?>
