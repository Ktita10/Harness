# Especificación de Rediseño: Páginas de Servicio (`SERVICES_SPEC.md`)

## 1. Filosofía y Dirección de Arte

El objetivo de este rediseño es alinear las 4 páginas internas de servicio (`landing-pages`, `tiendanube`, `tienda-online`, `software-a-medida`) con el lenguaje visual de la Home[cite: 4, 13], posicionando a **HARNESS** como una firma de diseño e ingeniería de alto nivel y alejándola por completo de los clichés de agencias *entry-level*.

### Reglas Estrictas de Exclusión (Qué NO hacer)
* **Cero micro-carteles o *badges* decorativos:** Prohibido el uso de píldoras flotantes, etiquetas de estado falsas (`ONLINE`, `SYS.READY`) o adornos que ensucien la composición.
* **Cero métricas de vanidad o jerga defensiva:** Eliminada cualquier mención a puntajes de *Lighthouse*, "código propio", "sin plantillas", "95+ velocidad" o promesas genéricas de vendedor. Una firma consolidada demuestra su estándar a través de la sobriedad de su arquitectura y la claridad comercial de su propuesta.
* **Cero ilustraciones tipo *blueprint* o consolas simuladas:** Sin tarjetas decorativas que imiten pantallas o paneles falsos a un costado del Hero[cite: 12]. El peso visual recae 100% en la tipografía, la grilla, el espacio negativo y la jerarquía cromática.
* **Cero fondos grises corporativos con cajas blancas flotantes:** Se elimina el esquema actual de secciones blancas/grises divididas por líneas horizontales con tarjetas de sombra suave[cite: 12].

---

## 2. Arquitectura Cromática en Dos Actos

Para replicar exactamente el recorrido narrativo y visual de la Home[cite: 13], toda página de servicio se divide en dos únicos bloques atmosféricos continuos:

| Acto | Secciones que agrupa | Fondo y Atmósfera | Propósito |
| :--- | :--- | :--- | :--- |
| **Acto I: Inmersión** | 1. Hero Editorial<br>2. Alcance del Servicio<br>3. Modelos de Inversión | **Obsidiana (`#0A0A0A`)** con un único `<TopoBackground sticky={true} />` continuo de principio a fin[cite: 3]. | Presentar el problema que resuelve el servicio, su alcance estructural y las modalidades de contratación dentro de una atmósfera sobria y envolvente. |
| **Acto II: Cierre** | 4. Metodología (5 fases)<br>5. Preguntas del Servicio<br>6. CTA con Cubo 3D | **Cortina Crema (`#F2EEE6`)** que sube sobre el Acto I (`rounded-t-[3rem]`) y se funde mediante un **gradiente cálido progresivo** con la tarjeta **Naranja (`#FF5A00`)** del CTA[cite: 1, 2, 12]. | Despejar dudas operativas y conducir al cierre comercial sin cortes bruscos de color[cite: 8, 12]. |

---

## 3. Estructura Detallada por Sección

### 3.1. Hero (Editorial y Centrado en la Propuesta de Valor)
Se elimina el layout partido con el *mockup* decorativo a la derecha[cite: 12]. El Hero pasa a tener una composición tipográfica de gran escala sobre el lienzo topográfico oscuro (`#0A0A0A`)[cite: 3].

* **Navegación superior mínima:** Un enlace limpio de retorno (`← SERVICIOS`) en tipografía *monospace* sobria, sin bordes ni contenedores.
* **Titular principal (`H1`):** Tipografía *Display* masiva en blanco (`#FFFFFF`)[cite: 2, 4] combinada con *Instrument Serif Italic* en naranja (`#FF5A00`)[cite: 1, 2] para el concepto central del servicio. Ocupa hasta 9 columnas de ancho para imponer presencia inmediata.
* **Bajada comercial:** Un único párrafo conciso en gris neutro (`#A1A1AA`), enfocado en el impacto de negocio y el problema real que resuelve la solución, alineado en una grilla inferior junto a la acción principal.
* **Acción:** Un único botón principal sobrio (`bg-[#FF5A00] text-[#0D0D0D]` con transición a `#F2EEE6`) acompañado de un ancla secundaria de texto limpio hacia las modalidades de trabajo.

---

### 3.2. Alcance del Servicio ("Qué Incluye")
Sigue corriendo sobre el mismo `<TopoBackground />` del Hero (sin cambio de color de fondo ni líneas divisorias)[cite: 3].

* **Encabezado de sección:** Alineado a la izquierda, combinando `font-display` en blanco y `font-serif italic` en naranja (`QUÉ INCLUYE EL SERVICIO`)[cite: 4, 12].
* **Grilla Arquitectónica (2x2 en Desktop):** En lugar de tarjetas blancas con íconos naranjas[cite: 12], se presenta una matriz de 4 bloques oscuros translúcidos (`bg-[#111114]/85 backdrop-blur-md`) con bordes finos de `1px` (`border-white/10 hover:border-[#FF5A00]/60`).
* **Contenido de cada bloque:**
  * Numeración sobria en el margen superior (`01` a `04`) en tipografía *Display* de bajo contraste que se enciende en naranja al interactuar.
  * Título del entregable o pilar funcional en mayúsculas (`font-display`).
  * Descripción directa de cómo ese pilar impacta en la operación o las ventas del cliente.

---

### 3.3. Modelos de Inversión ("Planes y Estimaciones")
Para conectar directamente con las cartas de la Home[cite: 13], las 3 opciones de contratación abandonan el fondo blanco uniforme[cite: 12] y adoptan el sistema cromático de **HARNESS** sobre el fondo oscuro:

1. **Columna 1 — Alcance Inicial / Base:**
   * **Estética:** Superficie **Obsidiana (`#121215`)**, borde `border-white/12`, texto en Crema (`#F2EEE6`).
   * **Enfoque:** Ideal para validaciones rápidas o implementaciones directas.
2. **Columna 2 — Alcance Integral (Destacado Central):**
   * **Estética:** Superficie **Crema Editorial (`#F2EEE6`)**, texto en Negro profundo (`#0D0D0D`), acentos en Naranja (`#FF5A00`). Sin carteles chillones de "MÁS ELEGIDO" pegados arriba[cite: 12]; la propia jerarquía del color crema sobre el fondo negro indica naturalmente cuál es la propuesta central.
3. **Columna 3 — Desarrollo / Evolución a Medida:**
   * **Estética:** Superficie **Grafito (`#18181C`)**, borde sutil cálido (`border-[#FF5A00]/30`), texto en Crema (`#F2EEE6`).
   * **Enfoque:** Operaciones complejas, integraciones o escalabilidad continua.

*Cada columna mantiene una lista limpia de entregables concretos (sin tildes decorativos saturados, usando trazos horizontales `—`) y un botón inferior de ancho completo.*

---

### 3.4. Transición al Acto II: Metodología ("Cómo Trabajamos")
Aquí sube la **Cortina Crema (`#F2EEE6`)** con bordes superiores redondeados (`rounded-t-[2.5rem] sm:rounded-t-[3.5rem]`) y sombra profunda hacia arriba, cerrando el ciclo oscuro.

* **Resolución del problema de la grilla actual:** En el diseño anterior quedaban 3 cajas arriba y 2 abajo con un hueco vacío[cite: 12].
* **Nuevo Layout (Secuencia Horizontal Continua de 5 Columnas):**
  * En Desktop se presenta como una fila única de 5 columnas (`lg:grid-cols-5`) separadas únicamente por líneas verticales finas (`divide-x divide-black/10`), sin cajas ni sombras individuales.
  * Cada columna muestra el número de fase en gran formato con trazo hueco (`01` a `05` con `-webkit-text-stroke: 1.5px #0D0D0D`)[cite: 2], el título de la etapa y un texto breve y directo en negro/gris oscuro.

---

### 3.5. Preguntas Específicas del Servicio
Ubicada dentro del mismo lienzo Crema (`#F2EEE6`), inmediatamente debajo de la metodología, manteniendo unidad visual con la Home:

* **Distribución asimétrica (5 columnas izquierda / 7 columnas derecha):**
  * **Izquierda:** Titular `PREGUNTAS DEL SERVICIO` en negro (`#0D0D0D`) y naranja (`#FF5A00`) con una bajada sobria[cite: 7, 12].
  * **Derecha:** Lista de acordeones interactivos. Las preguntas cerradas son limpias sobre el fondo crema (`border-b border-black/12`); la pregunta activa (`open`) se transforma en un bloque sólido **Negro (`#0D0D0D`)** con texto **Crema (`#F2EEE6`)** y botón de cierre en **Naranja (`#FF5A00`)**.

---

### 3.6. Cierre: Atmósfera Progresiva + CTA con Cubo 3D
* El final de la sección de Preguntas se funde sin bordes ni líneas divisorias con el contenedor de `#contacto`[cite: 8, 12].
* El fondo pasa gradualmente del Crema (`#F2EEE6`) a un halo cálido anaranjado (`#FFC49E → #FF8236`) que envuelve el contenedor principal al 90% de ancho donde vive el **Cubo 3D completo y sellado**, manteniendo exactamente el mismo cierre institucional que la Home[cite: 12, 13].

---

## 4. Coreografía y Animaciones (GSAP)

1. **Revelación Tipográfica Lateral:** Todos los encabezados de sección (`H1`, `H2`) y sus bajadas utilizan el mismo barrido de izquierda a derecha (`x: -60 → 0` + `clip-path`) implementado en la Home para mantener coherencia cinética.
2. **Aparición Estructural de Bloques:** Tanto los 4 bloques de *Alcance* como las 3 columnas de *Inversión* emergen desde abajo con un desfase corto (`stagger: 0.1s`, `power3.out`), sin rebotes exagerados.
3. **Efecto Cortina en el Acto II:** El bloque Crema (`#F2EEE6`) que contiene *Metodología + Preguntas* se desliza suavemente cubriendo el final del lienzo topográfico oscuro.