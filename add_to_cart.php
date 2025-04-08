<?php
session_start();
header('Content-Type: application/json');

$conn = new mysqli("http://gourmet-gala.great-site.net/menu2.html", "if0_38690033", "GG71711717", "if0_38690033_mycart");
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB connection failed"]));
}

$data = json_decode(file_get_contents("php://input"), true);
$product_id = intval($data['id']);
$session_id = session_id();

// Get product info
$stmt = $conn->prepare("SELECT name, price FROM products WHERE id = ?");
$stmt->bind_param("i", $product_id);
$stmt->execute();
$result = $stmt->get_result();
$product = $result->fetch_assoc();

if (!$product) {
    echo json_encode(["status" => "error", "message" => "Product not found"]);
    exit;
}

// Insert or update cart
$stmt = $conn->prepare("
    INSERT INTO cart_items (session_id, product_id, quantity)
    VALUES (?, ?, 1)
    ON DUPLICATE KEY UPDATE quantity = quantity + 1
");
$stmt->bind_param("si", $session_id, $product_id);
$stmt->execute();

echo json_encode(["status" => "success", "product" => $product]);
?>
