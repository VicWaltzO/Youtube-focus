# YouTube Focus · Plan para v0.1.0

**Estado:** especificación inicial. No se ha comenzado la implementación.

## Por qué existe

Quiero usar YouTube sin que su sistema de recomendaciones decida continuamente qué merece mi atención. No busco prohibir todo lo que no sea académico. Quiero poder definir mis propias reglas y, con el tiempo, elegir distintos niveles de restricción según lo que esté haciendo.

## Qué entra en esta primera versión

**Tecnología:** extensión para Chrome con Manifest V3, JavaScript, HTML y CSS nativos. Sin backend, cuentas, servicios externos ni modelo de IA. Pediremos solo los permisos que realmente usemos.

**Superficies:** página de inicio, barra de recomendaciones durante la reproducción y accesos/tarjetas de Shorts. Quedan fuera los resultados de búsqueda y el bloqueo de una reproducción abierta directamente.

**Filtrado:** reglas de permitir y bloquear por palabras, canales o identificadores de video. También se podrán introducir excepciones manuales. Las coincidencias ocultarán el elemento; no habrá desenfoque ni avisos que lo sustituyan.

**Control:** un interruptor para encender o apagar el filtrado. El seguimiento básico podrá seguir activo con el filtrado apagado, siempre que el usuario lo sepa.

**Seguimiento:** tiempo acumulado cuando un video se reproduce en una pestaña visible y contador de videos o tarjetas distintos ocultados. El contador debe evitar duplicados al navegar o cuando YouTube actualiza el DOM.

**Persistencia:** configuración y estadísticas locales con `chrome.storage.local`. Sin sincronización ni telemetría remota.

## Una regla importante

Cuando una autorización manual específica y un bloqueo genérico entren en conflicto, la autorización específica debería prevalecer. Para otras colisiones entre listas, probaremos y documentaremos un orden de prioridad antes de implementarlo: no conviene esconder videos relevantes por una palabra fuera de contexto.

## Iteraciones

- [ ] **001. Esqueleto:** `manifest.json`, popup mínimo e instalación sin errores.
- [ ] **002. Detección:** identificar tarjetas y zonas objetivo en YouTube.
- [ ] **003. Shorts:** ocultar accesos y tarjetas de Shorts.
- [ ] **004. Reglas:** filtrar por palabras, canales y videos.
- [ ] **005. Configuración:** permitir listas, bloqueos y excepciones persistentes.
- [ ] **006. Interruptor:** activar y desactivar sin dejar elementos ocultos.
- [ ] **007. Reproducción:** medir tiempo real en pestaña visible.
- [ ] **008. Bloqueos:** contar contenido ocultado sin duplicaciones evidentes.
- [ ] **009. Pruebas:** corregir casos comunes de navegación dinámica.

Cada iteración se probará antes de la siguiente. Los nombres no implican que haga falta un commit exactamente por línea.

## Cuándo diremos que v0.1.0 está lista

1. Chrome permite cargar la extensión descomprimida sin errores de manifiesto.
2. Al navegar por Inicio o abrir un video, el filtro identifica nuevos elementos y oculta los que coinciden con reglas activas.
3. Shorts deja de aparecer en las superficies previstas.
4. Las reglas y el estado del interruptor sobreviven al reiniciar Chrome.
5. Apagar el filtro restaura los elementos que la extensión ocultó, sin recargar cuando sea viable.
6. Se registran tiempo reproducido y elementos únicos ocultados sin contar una misma tarjeta una y otra vez.
7. La extensión no requiere una cuenta ni transmite el historial a un servidor.

## Lo que dejamos fuera, a propósito

Modos Libre/Enfoque/Estricto, contraseña, sesión rígida con temporizador, dashboard elaborado, clasificación semántica, análisis de comentarios, sincronización, bloqueo de búsquedas y bloqueo de reproducción directa. El modo Estricto futuro impedirá salir **desde la propia interfaz** hasta que termine la sesión, pero una extensión no puede impedir una desinstalación voluntaria.

## Preguntas que resolveremos al programar

- ¿Cuál es la precedencia exacta cuando coinciden varias reglas? Partiremos de excepciones manuales específicas.
- ¿Qué cuenta como un elemento único ocultado: un ID de video por página, por sesión o por día?
- ¿Cómo detectar Shorts sin afectar páginas que no controlamos?
- ¿Cómo contar correctamente la reproducción si el video se pausa, se cambia de pestaña o se abre otro video?

## Documentación visual

Mapa editable: [Español](https://www.tldraw.com/f/8TxYBVnt8KjFjoVAIynuH) · [English](https://www.tldraw.com/f/fRVXQaUH8dlvHUsC28i1D).
