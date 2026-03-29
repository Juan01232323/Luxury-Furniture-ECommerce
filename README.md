# 🛋️ Luxury Furniture E-commerce: Full Stack Developer

Este proyecto es una plataforma de comercio electrónico de alta gama desarrollada para una empresa de muebles de lujo. El sistema destaca por una arquitectura **Single Page Application (SPA)** y un motor de gestión de estado construido íntegramente con **JavaScript nativo (ES6+)**, eliminando la dependencia de frameworks externos y optimizando el rendimiento.

---

## 📂 Estructura del Proyecto

Basado en la organización de archivos del repositorio:

- 📁 **JavaScript/**: Contiene la lógica central del negocio, gestión de carrito y ruteo SPA (ej. `ProductoImagen.js`).
- 📁 **img/**: Repositorio de recursos visuales y fotografías de los productos de lujo.
- 📄 **estilos.css**: Hoja de estilos personalizada para una interfaz de usuario premium y responsive.
- 📄 **index.html**: Estructura principal y punto de entrada de la aplicación.

---

## 🚀 Funcionalidades Clave

- **Arquitectura SPA:** Navegación fluida entre secciones (Inicio, Productos, Carrito) sin recarga de página.
- **Gestión de Estado Persistente:** Carrito de compras vinculado a sesiones únicas mediante `localStorage`.
- **Lógica de Producto Dinámica:** Cambio automático de imágenes y validación de disponibilidad según el color seleccionado.
- **Checkout Seguro:** Integración con pasarelas de pago de **Stripe** y **PayPal**.
- **Diseño Responsive:** Total adaptabilidad a dispositivos móviles y escritorio.

---

## 🛠️ Implementación Técnica (Highlights)

He diseñado el sistema enfocándome en dos pilares fundamentales de JavaScript:

### 1. Gestión del Carrito y Persistencia de Datos

Este bloque maneja la creación de sesiones únicas, guardado en `localStorage`, cálculo de totales y la actualización dinámica de productos según los colores seleccionados.

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

### 2. Arquitectura de Navegación SPA (Nativo)

Gestión de la experiencia de usuario (UX) mediante la manipulación del DOM y desplazamientos suaves (Smooth Scrolling), controlando la visibilidad de las secciones de forma reactiva.

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

## 🛠️ Stack Tecnológico

| Componente      | Tecnología                                      |
|----------------|------------------------------------------------|
| Frontend       | HTML5, CSS3, JavaScript (ES6+)                 |
| Arquitectura   | Vanilla JS Single Page Application (SPA)       |
| Persistencia   | Web Storage API (LocalStorage)                 |
| Pagos          | Stripe API & PayPal SDK                        |
| Hosting        | AwardSpace                                     |

---

## 🚀 Instalación y Despliegue

### Clonar el repositorio

```bash
git clone https://github.com
```

### Configuración

- Añadir las API Keys de Stripe y PayPal en los archivos JavaScript.

### Ejecución

- Abrir `index.html` en cualquier navegador  
**o**
- Subir los archivos a un hosting como AwardSpace.

---

## 📬 Contacto

Desarrollado por **Juan – Full Stack Developer**  

Enfoque en crear experiencias web eficientes y soluciones de negocio reales mediante el uso avanzado de JavaScript.


<img width="1919" height="824" alt="image" src="https://github.com/user-attachments/assets/a70cf259-68f1-49a3-ad06-87e1e2eda4bd" />

<img width="1919" height="824" alt="image" src="https://github.com/user-attachments/assets/ee8030c4-e404-43b9-bddd-49599a950e2c" />
