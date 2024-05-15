<?php
$file_path = $_POST['filepath']; 

if (file_exists($file_path)) {
    unlink($file_path);
    echo "File deleted successfully";
} else {
    echo "File not found";
}

exit;
?>
