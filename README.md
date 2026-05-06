# 🛋️ Luxury Furniture E-commerce: Full Stack Developer

This project is a high-end e-commerce platform developed for a luxury furniture company. The system features a **Single Page Application (SPA)** architecture and a state management engine built entirely with **native JavaScript (ES6+)**, eliminating dependencies on external frameworks and optimizing performance.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![SPA](https://img.shields.io/badge/SPA-Single--Page--App-blue?style=for-the-badge)
---



## 📂 Project Structure

Based on the repository's file organization:

- 📁 **JavaScript/**: Contains the core business logic, cart management, and SPA routing (e.g., `ProductoImagen.js`).
- 📁 **img/**: Repository for visual assets and high-quality photography of luxury products.
- 📄 **estilos.css**: Custom stylesheet for a premium and responsive user interface.
- 📄 **index.html**: Main structure and entry point of the application.

---

## 🚀 Key Features

- **SPA Architecture:** Seamless navigation between sections (Home, Products, Cart) without page reloads.
- **Persistent State Management:** Shopping cart linked to unique sessions using `localStorage`.
- **Dynamic Product Logic:** Automatic image switching and availability validation based on the selected color.
- **Secure Checkout:** Integration with **Stripe** payment gateways.
- **Responsive Design:** Full adaptability to mobile and desktop devices.

---

## 🛠️ Technical Implementation (Highlights)

I designed the system focusing on two fundamental pillars of JavaScript:

### 1. Cart Management and Data Persistence

This block handles the creation of unique sessions, saving to `localStorage`, total calculations, and dynamic product updates based on selected colors.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const productImagesByColor = {
    'Camillas Cuadradas': {
      'Negro': 'img/camilla1.jpg',
      'Azul': 'img/camilla3.jpg',
      'Blanco': 'img/camilla4.jpg',
      'Gris': 'img/camilla6.jpg'
    },
    'Camillas Rombo': {
      'Verde': 'img/camilla5.jpg',
      'Rosa': 'img/camilla7.jpg'
    }
  };

  const userSessionId = getSessionId();
  const cart = JSON.parse(localStorage.getItem(`cart-${userSessionId}`)) || [];

  document.addEventListener('change', (event) => {
    if (event.target.classList.contains('color-select')) {
      const index = event.target.getAttribute('data-index');
      const color = event.target.value;
      const product = cart[index];
      const newImageSrc = productImagesByColor[product.name][color];
  
      const cartItemEl = event.target.closest('.cart-item');
      if (newImageSrc) {
        product.imageSrc = newImageSrc;
        cartItemEl.querySelector('.cart-item-image').src = newImageSrc;
        product.color = color;
        saveCart();
      }
    }
  });

  function saveCart() {
    localStorage.setItem(`cart-${userSessionId}`, JSON.stringify(cart));
    updateCartCount();
  }

  function getSessionId() {
    let sessionId = localStorage.getItem('userSessionId');
    if (!sessionId) {
      sessionId = '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userSessionId', sessionId);
    }
    return sessionId;
  }
});
```

---

### 2. SPA Navigation Architecture (Native)

User Experience (UX) management through DOM manipulation and smooth scrolling, reactively controlling the visibility of sections.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const inicioLink = document.querySelector('.nav-link[href="#"]');
    const productosLink = document.querySelector('.nav-link[href="#products-section"]');
    const cartIconLink = document.querySelector('.nav-icon .icon-link');
    const productsSection = document.getElementById('products-section');
    const productDetailSection = document.getElementById('product-detail');

    productosLink.addEventListener('click', function(event) {
        event.preventDefault();
        if (productsSection.style.display === 'none' || !productsSection.style.display) {
            productsSection.style.display = 'block';
            window.scrollTo({
              top: productsSection.offsetTop,
              behavior: 'smooth'
            });
        } else {
            productsSection.style.display = 'none';
        }
    });
  
    inicioLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = window.location.origin + window.location.pathname;
    });
  
    function ocultarTodasLasSecciones() {
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });
    }
});
```

---

## 🛠️ Tech Stack



| Component | Technology |
|----------------|------------------------------------------------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Architecture | Vanilla JS Single Page Application (SPA) |
| Persistence | Web Storage API (LocalStorage) |
| Payments | Stripe API |
| Hosting | AwardSpace |

---

## 🚀 Installation and Deployment

### Clone the repository

```bash
git clone https://github.com
```

### Configuration

- Add your Stripe API Keys in the JavaScript files.

### Execution

- Open `index.html` in any browser
**or**
- Upload the files to a hosting provider like AwardSpace.

---

## 📬 Contact

Developed by **Juan – Full Stack Developer**

Focused on creating efficient web experiences and real business solutions through advanced JavaScript usage.


<img width="1919" height="824" alt="image" src="https://github.com/user-attachments/assets/a70cf259-68f1-49a3-ad06-87e1e2eda4bd" />

<img width="1919" height="824" alt="image" src="https://github.com/user-attachments/assets/ee8030c4-e404-43b9-bddd-49599a950e2c" />

<img width="1919" height="828" alt="image" src="https://github.com/user-attachments/assets/97055820-412e-4007-871b-b97028ef2e22" />

<img width="1919" height="823" alt="image" src="https://github.com/user-attachments/assets/df1695d8-de74-4554-a62e-c0d42295329e" />


<img width="1919" height="824" alt="image" src="https://github.com/user-attachments/assets/54ba83ca-0726-4bd3-8b8c-f5b906412472" />

