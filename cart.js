// Add product to cart by ID
function addToCart(productId) {
    fetch('add_to_cart.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: productId })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        console.log(`Added to cart: ${data.product.name}`);
        loadCart(); // refresh the cart UI
      } else {
        console.error('Add failed:', data.message);
      }
    })
    .catch(error => console.error('Fetch error:', error));
  }
  
  // Load and display cart from backend
  function loadCart() {
    fetch('get_cart.php')
      .then(response => response.json())
      .then(cartItems => {
        displayCart(cartItems);
      })
      .catch(error => console.error('Load cart error:', error));
  }
  
  // Render cart items to the page
  function displayCart(cartItems) {
    const cartList = document.getElementById('cart-list');
    const totalBox = document.getElementById('total');
    cartList.innerHTML = '';
    let total = 0;
  
    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
  
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.onclick = () => removeFromCart(item.product_id);
  
      li.appendChild(removeBtn);
      cartList.appendChild(li);
  
      total += item.price * item.quantity;
    });
  
    totalBox.textContent = `Total: $${total.toFixed(2)}`;
  }
  
  // Remove an item from the cart
  function removeFromCart(productId) {
    fetch('remove_item.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: productId })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Item removed:', data);
      loadCart();
    })
    .catch(error => console.error('Remove error:', error));
  }
  
  // Clear the entire cart
  function clearCart() {
    fetch('clear_cart.php', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        console.log('Cart cleared:', data);
        loadCart();
      })
      .catch(error => console.error('Clear cart error:', error));
  }
  
  // Load cart on page load
  document.addEventListener('DOMContentLoaded', loadCart);
  