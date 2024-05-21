<?php

$upload_dir = $_POST["uploadDir"];
$return_dir = $_POST["returnDir"];



if (isset($_FILES["Input"]) && $_FILES["Input"]["error"] == UPLOAD_ERR_OK) {
    $target_dir = $_SERVER['DOCUMENT_ROOT'] . "/web muron" . $upload_dir;
    if(is_dir($target_dir) === false)
{
    mkdir($target_dir, 0777, true);
}
    $target_file = $target_dir . basename($_FILES["Input"]["name"]);
    if (!move_uploaded_file($_FILES["Input"]["tmp_name"], $target_file)) {
        echo "Sorry, there was an error uploading your file.";
    }
} else {
    echo "Error: Please select a file to upload.";
}

header("Location: " . $return_dir);

exit;
?>
