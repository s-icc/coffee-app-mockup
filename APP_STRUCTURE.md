# Arquitectura de la aplicación · Marea Café

## Propósito

Marea Café es un prototipo mobile-first para una cafetería. Organiza tres tareas frecuentes en una experiencia de navegación corta: elegir una bebida, crear un pedido Pick & Go y registrar una visita en tienda.

## Mapa de pantallas

| Ruta | Responsabilidad | Contenido principal |
| --- | --- | --- |
| `/` | Inicio | Promoción, check-in QR, recomendaciones y progreso de olas. |
| `/menu/` | Explorar catálogo | Lista completa de bebidas y filtros visuales por categoría. |
| `/bebidas/` | Recompra | Favorita, historial breve y recomendaciones personales. |
| `/carrito/` | Pedido Pick & Go | Resumen de productos, sucursal y confirmación. |
| `/perfil/` | Cuenta | Identidad de cliente, progreso de recompensas y ajustes. |

La barra inferior enlaza las cuatro áreas de exploración. El botón central abre el carrito, porque iniciar o continuar un pedido es la acción principal de la app.

## Estructura del código

```text
src/
├── components/
│   ├── AppHeader.astro       # Marca, navegación de regreso y contador del carrito
│   ├── BottomNav.astro       # Navegación principal y CTA Pick & Go
│   ├── ProductCard.astro     # Presentación y acción de agregar un producto
│   └── VisitCheckIn.astro    # Check-in, credencial QR y éxito de la visita
├── data/
│   └── MenuItem.ts           # Modelo del producto y catálogo inicial
├── layouts/
│   └── Layout.astro          # Documento HTML, metadatos e importación de estilos globales
├── pages/                    # Rutas Astro de cada tab y del carrito
└── styles/
    └── app.css               # Tokens implementados, responsive y estados animados

public/
├── brand-mark.svg            # Marca de Marea Café
├── coffee-hero.svg           # Ilustración de la promoción
└── visit-qr.svg              # Credencial de visita para mostrador
```

## Componentes compartidos

### `AppHeader`

Es el encabezado sticky de cada ruta. En la vista principal muestra la marca; en pantallas secundarias muestra un regreso y el nombre del área. El icono de carrito lee el número de productos desde `localStorage` al cargar.

### `BottomNav`

Es la navegación fija de móvil. Recibe la sección activa para aplicar su estado visual. Incluye el CTA Pick & Go al centro y se reutiliza en todas las rutas.

### `ProductCard`

Recibe una instancia de `MenuItem` y muestra su arte, nombre, detalle y precio. Al agregar un producto:

1. Guarda una representación del artículo en `localStorage`.
2. Actualiza los contadores de carrito visibles.
3. Muestra la respuesta visual del botón y el rebote del carrito.

### `VisitCheckIn`

Agrupa el flujo de visita. La tarjeta abre una capa modal que contiene el QR, una guía de uso y una confirmación animada de recompensa. El QR es una credencial visual de demostración; la validación real se conectaría a un lector o API de tienda.

## Modelo de catálogo

`MenuItem` define el contrato común de una bebida. Sus propiedades son:

| Campo | Uso |
| --- | --- |
| `name` | Nombre visible de la bebida. |
| `image` / `icon` | Recursos de representación. |
| `category` | Agrupación para filtros y menú. |
| `coffeeType` | Perfil de preparación o sabor. |
| `price` | Precio en MXN. |
| `size` | Tamaño de la bebida. |
| `description` | Texto disponible para futuras vistas de detalle. |
| `tone` | Variante visual de la tarjeta. |

El getter `detail` combina `coffeeType` y `size` para las tarjetas. Agregar una bebida al catálogo no requiere cambiar sus consumidores: basta con crear una instancia de `MenuItem` en `menuItems`.

## Flujos de usuario

### Explorar y pedir

```text
Inicio o Menú → seleccionar “+” → carrito local se actualiza
→ contador y CTA se animan → Carrito → confirmar pedido
```

El carrito usa `localStorage` con la clave `marea-cart`; funciona como estado de demostración entre las distintas rutas del mismo navegador. La confirmación actual vacía ese estado y no procesa un pago real.

### Registrar visita

```text
Inicio → “Mostrar QR” / tarjeta de visita → QR en pantalla
→ cliente lo muestra al mostrador → mensaje “Nueva ola registrada”
```

La animación de escaneo y el mensaje de éxito explican la transición. En producción, el mostrador debería validar el token QR y devolver el balance de olas actualizado.

### Recompra

```text
Navegación “Bebidas” → favorita o recientes → “+” → carrito
```

Esta ruta reduce pasos para clientes recurrentes y reutiliza la misma tarjeta y el mismo modelo de catálogo.

## Estado y límites del prototipo

- El catálogo es local y estático.
- Carrito y contador se persisten en el navegador con `localStorage`.
- Visitas, olas, pagos, disponibilidad y tiempos de preparación son información de demostración.
- No hay autenticación ni backend. Una integración posterior debería reemplazar el almacenamiento local por una API y validar el QR con un token de un solo uso.

## Comportamiento responsive y accesible

- La interfaz parte de 320 px; desde 600 px se encierra en un marco de 430 px para conservar el patrón móvil.
- Header sticky y navegación inferior fija mantienen contexto y acciones al alcance.
- Los controles de icono incluyen etiquetas accesibles y el diálogo QR usa semántica modal.
- La hoja QR y los microestados respetan `prefers-reduced-motion` para reducir movimiento cuando el sistema lo solicita.
