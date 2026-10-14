# YouTube Focus

![Mapa semántico de YouTube Focus](docs/semantic-map-es.svg)

[**English version**](README.en.md) · [Editar el mapa en tldraw](https://www.tldraw.com/f/8TxYBVnt8KjFjoVAIynuH)

> **Estado:** iteración 001 de v0.1.0. Base de la extensión preparada para instalar localmente; pendiente de verificación manual en Chrome. El filtrado todavía no está disponible.

YouTube puede ser una biblioteca increíble para aprender. El problema es que, cuando entras a buscar algo concreto, las recomendaciones compiten por tu atención. **YouTube Focus** nace de esa molestia: quiero poder decidir qué contenido aparece, sin depender de lo que una plataforma considere interesante para mí.

La idea no es prohibir el entretenimiento. Es tener herramientas para elegir cuándo verlo y cuándo dejarlo fuera.

## Qué queremos probar primero

La **v0.1.0** será un prototipo técnico, no un producto terminado. Empezaremos por comprobar que Chrome puede detectar y ocultar contenido sin romper la navegación de YouTube.

| Parte | Alcance previsto |
| --- | --- |
| Dónde actúa | Página principal, recomendaciones laterales y accesos a Shorts. |
| Cómo filtra | Reglas manuales para palabras, canales y videos; listas permitidas y bloqueadas. |
| Qué hace | Oculta los elementos que coinciden con las reglas. |
| Control | Interruptor para activar o desactivar el filtrado. |
| Seguimiento | Tiempo de reproducción en pestañas visibles y cantidad de elementos ocultados. |
| Datos | Configuración y métricas guardadas localmente. |

Por ahora **no** filtraremos resultados de búsqueda ni bloquearemos la reproducción de enlaces abiertos directamente. Tampoco habrá contraseñas, modos estrictos, temporizadores, panel avanzado ni IA en esta etapa.

## Instalación local en Chrome

1. Descarga y descomprime el repositorio, o clónalo en tu equipo.
2. Abre `chrome://extensions` en Chrome.
3. Activa **Modo de desarrollador**.
4. Pulsa **Cargar descomprimida** y selecciona la carpeta `extension/`, no la raíz del repositorio.
5. Abre el menú de extensiones de la barra de herramientas y selecciona **YouTube Focus**. Puedes fijarla para acceder al popup directamente.

El popup debe mostrar **YouTube Focus**, **Versión 0.1.0**, **Prototipo inicial** y **El filtrado todavía no está disponible.** Esta base no solicita permisos ni modifica YouTube.

Comprueba que Chrome carga la extensión sin errores y que el popup se ve completo, sin texto cortado ni barras de desplazamiento. Después de modificar los archivos, pulsa el botón de recarga de la extensión en `chrome://extensions` y vuelve a abrir el popup.

## Cómo lo construiremos

Lo desarrollaremos por pasos pequeños, con algo que comprobar después de cada cambio. Primero una extensión que Chrome reconozca; luego detección de videos, filtros, configuración y medición. Prefiero diez cambios que pueda explicar a una aplicación enorme que solo parezca terminada.

El plan más detallado, las decisiones pendientes y los criterios de aceptación están en [**docs/PLAN.es.md**](docs/PLAN.es.md). La [versión inglesa](docs/PLAN.en.md) se mantiene junto a esta.

## Qué viene más adelante

Quiero incorporar modos de uso, sesiones con temporizador y restricciones que no puedan saltarse desde la interfaz antes de que termine una sesión estricta. A largo plazo, también me interesa explorar un modelo ligero que clasifique videos a partir de títulos, descripciones y otros metadatos.

Nada de esto está implementado todavía. Una contraseña dentro de una extensión tampoco puede impedir por completo que alguien la desinstale; conviene dejarlo claro desde ahora.

## Mapas semánticos

Esta será una costumbre en mis repositorios: abrir el README y entender el proyecto con un vistazo. Los mapas se pueden editar en [tldraw (ES)](https://www.tldraw.com/f/8TxYBVnt8KjFjoVAIynuH) y [tldraw (EN)](https://www.tldraw.com/f/fRVXQaUH8dlvHUsC28i1D). Las imágenes del encabezado son versiones estáticas para GitHub.

---

Hecho por [Owen Anampa Hurtado](https://github.com/VicWaltzO). Proyecto personal en desarrollo.
