<?php
session_start();
header('Content-Type: application/json');

$conn = new mysqli("sqlXXX.epizy.com", "epiz_12345678", "your_password", "epiz_12345678_mycart");
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);
$product_id = intval($data['id']);
$session_id = session_id();

$stmt = $conn->prepare("DELETE FROM cart_items WHERE session_id = ? AND product_id = ?");
$stmt->bind_param("si", $session_id, $product_id);
$stmt->execute();

echo json_encode(["status" => "success", "message" => "Item removed"]);
?>
