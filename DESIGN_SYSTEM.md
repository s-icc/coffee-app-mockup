# Sistema de diseño · Marea Café

## Idea visual

Marea Café toma el lenguaje editorial, luminoso y cálido de las referencias, sin reutilizar marcas ni recursos de terceros. La experiencia se concentra en una pantalla móvil: verde bosque, papel crema y una acentuación terracota evocan una cafetería de especialidad cercana.

## Tokens

| Uso | Token visual | Valor |
| --- | --- | --- |
| Fondo principal | Crema | `#FFFDF9` |
| Superficie suave | Arena | `#F1ECE2` |
| Marca / acciones | Verde bosque | `#173D31` |
| Éxito / navegación | Verde hoja | `#1E7656` |
| Acento | Terracota | `#BA7140` |
| Texto secundario | Salvia gris | `#829089` |
| Radio destacado | Tarjetas hero | `28px` |
| Radio estándar | Tarjetas y controles | `14–22px` |

## Tipografía

- **Titulares:** `Georgia, serif`; expresiva, suave y editorial.
- **Interfaz y cuerpo:** `Avenir Next`, con fallback `Avenir` / `Trebuchet MS` / sans-serif.
- Las etiquetas se construyen con mayúsculas, peso 900 y tracking amplio para conservar jerarquía incluso a 8–10 px.

## Componentes

- **Hero promocional:** color de marca, composición asimétrica y arte de bebida SVG.
- **Tarjeta de visita:** acción de check-in clara y retroalimentación inmediata.
- **Producto:** miniatura cromática, detalle de precio y botón de suma de 31 px.
- **Pick & Go:** botón flotante central y hoja inferior con resumen del pedido.
- **Navegación:** fija al final de la pantalla; las zonas táctiles son de al menos 42 px.

## Accesibilidad y movimiento

- Hay etiquetas `aria-label` en controles de icono y un estado `role="status"` para confirmaciones.
- Los contrastes de texto principal usan verde profundo sobre crema.
- `prefers-reduced-motion` elimina transiciones no esenciales.

## Responsive

La base está diseñada desde 320 px. Desde 600 px, la app se presenta dentro de un marco de 430 px, manteniendo el patrón de uso móvil sin transformar los flujos en una interfaz de escritorio densa.
