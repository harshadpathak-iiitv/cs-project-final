<?php
session_start();
header('Content-Type: application/json');

$conn = new mysqli("sqlXXX.epizy.com", "epiz_12345678", "your_password", "epiz_12345678_mycart");
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "DB connection failed"]));
}

$session_id = session_id();

$sql = "
SELECT ci.product_id, p.name, p.price, ci.quantity
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
WHERE ci.session_id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $session_id);
$stmt->execute();
$result = $stmt->get_result();

$cart = [];
while ($row = $result->fetch_assoc()) {
    $cart[] = $row;
}

echo json_encode($cart);
?>
