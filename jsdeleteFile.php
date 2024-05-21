<?php
$data = json_decode(file_get_contents('php://input'), true);
$path = $data['path']; 
$type = $data['type'];

if ($type == "file" && file_exists($path)) {
    unlink($path);
    echo json_encode("deleted successfully");
} elseif ($type == "dir" && is_dir($path)) {
    $files = glob($path . '/*'); 
    foreach($files as $file){ 
      if(is_file($file)) {
        unlink($file); 
      }
    }
    rmdir($path);
} else {
    echo json_encode("Error: File or directory does not exist.");
}

exit;
?>
