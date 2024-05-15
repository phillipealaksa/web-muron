<?php

$upload_dir = $_POST["uploadDir"];
$return_dir = $_POST["returnDir"];

if (isset($_FILES["imgInput"]) && $_FILES["imgInput"]["error"] == UPLOAD_ERR_OK) {
    $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/web muron" . $upload_dir;
    $target_file = $target_dir . basename($_FILES["imgInput"]["name"]);
    if (!move_uploaded_file($_FILES["imgInput"]["tmp_name"], $target_file)) {
        echo "Sorry, there was an error uploading your file.";
    }
} else {
    echo "Error: Please select a file to upload.";
}

header("Location: " . $return_dir);

?>
