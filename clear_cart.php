<?php
session_start();
header('Content-Type: application/json');

$conn = new mysqli("sqlXXX.epizy.com", "epiz_12345678", "your_password", "epiz_12345678_mycart");
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB connection failed"]));
}

$session_id = session_id();

$stmt = $conn->prepare("DELETE FROM cart_items WHERE session_id = ?");
$stmt->bind_param("s", $session_id);
$stmt->execute();

echo json_encode(["status" => "success", "message" => "Cart cleared"]);
?>
