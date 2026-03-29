document.addEventListener('DOMContentLoaded', () => {

  // Supongamos que tienes esta estructura de datos para mapear los productos y sus imágenes por color
  const productImagesByColor = {
    'Camillas Cuadradas': {
      'Negro': 'img/camilla1.jpg',
      'Azul': 'img/camilla3.jpg',
      'Verde': '',
      'Blanco': 'img/camilla4.jpg',
      'Gris': 'img/camilla6.jpg',
      'Rosa': '',

    },
    'Camillas Rombo': {
      'Negro': '',
      'Azul': '',
      'Verde': 'img/camilla5.jpg',
      'Blanco': '',
      'Gris': '',
      'Rosa': 'img/camilla7.jpg',

    }
  };

// Generar un identificador único para la sesión del usuario
const userSessionId = getSessionId();

const cart = JSON.parse(localStorage.getItem(`cart-${userSessionId}`)) || [];


  document.addEventListener('change', (event) => {
    if (event.target.classList.contains('color-select')) {
      const index = event.target.getAttribute('data-index');
      const color = event.target.value;
      const product = cart[index];
      const newImageSrc = productImagesByColor[product.name][color];
  
      const cartItemEl = event.target.closest('.cart-item');
      const colorNotAvailableMsgEl = cartItemEl.querySelector('.color-not-available-msg');
  
      if (!newImageSrc) {
        if (colorNotAvailableMsgEl) {
          colorNotAvailableMsgEl.textContent = 'Este color no está disponible para este producto.';
        } else {
          const msgEl = document.createElement('p');
          msgEl.classList.add('color-not-available-msg');
          msgEl.textContent = 'Este color no está disponible para este producto.';
          msgEl.style.color = 'red'; // Agrega tu estilo aquí
          cartItemEl.appendChild(msgEl);
        }
      } else {
        if (colorNotAvailableMsgEl) {
          cartItemEl.removeChild(colorNotAvailableMsgEl);
        }
        product.imageSrc = newImageSrc;
        cartItemEl.querySelector('.cart-item-image').src = newImageSrc;
        product.color = color;
        saveCart();
      }
    }
  });

  function saveCart() {
    localStorage.setItem(`cart-${userSessionId}`, JSON.stringify(cart));
    updateCartCount(); // Actualizar el contador cada vez que se guarde el carrito
  }


  updateCartCount();

  document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('product-add')) {
      const productItem = event.target.closest('.product-item');
      const productName = productItem.querySelector('.product-name').textContent;
      const productPrice = parseFloat(productItem.querySelector('.product-price').textContent.replace('$', ''));
      const productImageSrc = productItem.querySelector('.product-image').src;

      const existingProductIndex = cart.findIndex(item => item.name === productName);
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
      } else {
        cart.push({ name: productName, price: productPrice, imageSrc: productImageSrc, quantity: 1 });
      }

      saveCart();
      updateCartCount();
      alert(`${productName} ha sido agregado al carrito.`);
    }
  });

  function calcularTotal() {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  }

  function getSessionId() {
    let sessionId = localStorage.getItem('userSessionId');
    if (!sessionId) {
      sessionId = generateUniqueId();
      localStorage.setItem('userSessionId', sessionId);
    }
    return sessionId;
  }

  function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = cartCount;
  }
  

  document.querySelector('.nav-icon .icon-link').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelectorAll('section').forEach(section => section.style.display = 'none');
    showCart();
  });

  function showCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    
    // Verificar si el carrito está vacío y actualizar la visibilidad del mensaje
    if (cart.length === 0) {
      document.getElementById('cart-empty-message').style.display = 'block';
  } else {
      document.getElementById('cart-empty-message').style.display = 'none';
  }
    
    cart.forEach((product, index) => {
      const cartItemEl = document.createElement('div');
      cartItemEl.classList.add('cart-item');
      cartItemEl.innerHTML = `
        <img class="cart-item-image" src="${product.imageSrc}" alt="${product.name}">
        <div class="cart-item-info">
          <h3 class="cart-item-name">${product.name}</h3>
          <p class="cart-item-price">$${product.price.toFixed(2)}</p>
          <select class="color-select" data-index="${index}">
            <option value="Negro">Negro</option>
            <option value="Azul">Azul</option>
            <option value="Verde">Verde</option>
            <option value="Blanco">Blanco</option>
            <option value="Gris">Gris</option>
            <option value="Rosa">Rosa</option>
          </select>
          <input type="number" class="quantity-input" value="${product.quantity}" min="1" data-index="${index}">
          <button class="remove-item" data-index="${index}">Eliminar</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItemEl);
      
      // Asegúrate de configurar el selector en el color actual del producto, si está disponible
      if(product.color) {
        cartItemEl.querySelector('.color-select').value = product.color;
      }
    });
  
    document.getElementById('total-price').textContent = calcularTotal();
    document.getElementById('product-detail').style.display = 'block';
  
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        cart.splice(index, 1);
        saveCart();
        updateCartCount(); // Actualizar el contador del carrito
        showCart();
      });
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', function() {
        const index = parseInt(this.getAttribute('data-index'));
        if (this.value <= 0) {
          cart.splice(index, 1); // Eliminar el producto si la cantidad es 0 o menos
        } else {
          cart[index].quantity = parseInt(this.value);
        }
        saveCart();
        updateCartCount(); // Actualizar el contador del carrito
        document.getElementById('total-price').textContent = calcularTotal();
        showCart();
      });
    });
  }

  document.querySelector('.nav-link[href="#products-section"]').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarSeccionProductos();
  });

  document.querySelector('.nav-link[href="#"]').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarSeccionInicial();
  });

  document.querySelector('.back-to-products').addEventListener('click', function() {
    // Comprobar si el carrito está vacío
    if (cart.length === 0) {
        // Mostrar un mensaje de error y evitar la navegación a la sección de pago
        document.getElementById('cart-empty-message').style.display = 'block';
    } else {
        // Si el carrito no está vacío, ocultar el mensaje de error y mostrar la sección de pago
        document.getElementById('cart-empty-message').style.display = 'none';
        showPaymentSection();
    }
});



function showPaymentSection() {
  // Ocultar todas las secciones innecesarias
  ocultarTodasLasSecciones();
  // Mostrar la sección de opciones de pago
  document.getElementById('payment-options-section').style.display = 'block';
}
});


document.getElementById('pay-with-stripe').addEventListener('click', (event) => {
  // Ocultar secciones innecesarias y mostrar el formulario de Stripe.
  ocultarTodasLasSecciones();
  mostrarFormularioStripe();

  // Lógica para manejar la presentación del formulario Stripe y la tokenización de los datos de la tarjeta.
  // Suponiendo que ya has inicializado Stripe con tu llave pública como stripeInstance.
  var stripe = Stripe('pk_test_51P5LEfHJXANqOK2KYGoTDNdpcpuHSw76bNTyVepUrg0hLBkaKBsRkN4fL6Rk8vM3eZgyzBLhhd1KqRF0sdIxwZfL00MqCoEPD6');
  var elements = stripe.elements();

  var style = {
    base: {
      fontSize: '16px',
      color: '#32325d',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  var card = elements.create('card', { style: style });
  card.mount('#card-element');

  card.addEventListener('change', function(event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  var form = document.getElementById('payment-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    var cardholderName = document.getElementById('cardholder-name').value;
    if (!cardholderName) {
      document.getElementById('card-errors').textContent = 'Por favor, ingrese el nombre del titular de la tarjeta.';
      return;
    }

    stripe.createToken(card, {name: cardholderName}).then(function(result) {
      if (result.error) {
        // Informa al usuario si hubo un error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Envía el token a tu servidor.
        stripeTokenHandler(result.token);
      }
    });
  });
});

document.getElementById('pay-with-mercadopago').addEventListener('click', (event) => {
  // Asegúrate de tener el ID de preferencia correcto configurado en esta URL
  window.location.href = "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=tu_id_de_preferencia";
});


function mostrarFormularioStripe() {
  // Mostrar la sección del formulario Stripe
  document.getElementById('payment-options-section').style.display = 'block';
  document.getElementById('stripe-form-section').style.display = 'block';
}

function stripeTokenHandler(token) {
  // Inserta el token ID en el formulario para que se envíe al servidor
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Envía el formulario
  form.submit();
}


  

  function mostrarSeccionProductos() {
    ocultarTodasLasSecciones();
    document.querySelector('.products-section').style.display = 'block';
    
  }

  function mostrarSeccionInicial() {
    ocultarTodasLasSecciones();
    document.querySelector('.hero-section').style.display = 'block';
  }

  function ocultarTodasLasSecciones() {
    document.querySelectorAll('section').forEach(section => {
      section.style.display = 'none';
    });
  }


