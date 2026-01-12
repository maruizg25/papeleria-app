# Manual de Usuario - Papelería App

## Sistema de Punto de Venta para Papelería

---

## Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [Acceso al Sistema](#2-acceso-al-sistema)
3. [Navegación Principal](#3-navegación-principal)
4. [Dashboard - Panel Principal](#4-dashboard---panel-principal)
5. [Punto de Venta (POS)](#5-punto-de-venta-pos)
6. [Gestión de Inventario](#6-gestión-de-inventario)
7. [Gestión de Clientes](#7-gestión-de-clientes)
8. [Historial de Ventas](#8-historial-de-ventas)
9. [Recibos y Tickets](#9-recibos-y-tickets)
10. [Preguntas Frecuentes](#10-preguntas-frecuentes)

---

## 1. Introducción

### ¿Qué es Papelería App?

Papelería App es un sistema de punto de venta diseñado específicamente para papelerías. Le permite:

- Realizar ventas de manera rápida y sencilla
- Administrar su inventario de productos
- Gestionar información de sus clientes
- Consultar el historial de todas sus ventas
- Ver estadísticas diarias de su negocio
- Generar e imprimir recibos de compra

### Requisitos

- Computadora con navegador web actualizado (Chrome, Firefox, Edge o Safari)
- Conexión a internet
- Credenciales de acceso (correo electrónico y contraseña)

---

## 2. Acceso al Sistema

### Iniciar Sesión

1. Abra su navegador web
2. Ingrese la dirección del sistema
3. Verá la pantalla de inicio de sesión:

   ![Pantalla de Login]

4. Ingrese su **Correo electrónico**
5. Ingrese su **Contraseña** (mínimo 6 caracteres)
6. Haga clic en el botón **"Ingresar"**

### Cerrar Sesión

1. Haga clic en el icono de menú en la esquina superior
2. Seleccione la opción **"Cerrar Sesión"**
3. Será redirigido a la pantalla de inicio de sesión

> **Importante:** Siempre cierre sesión cuando termine de usar el sistema, especialmente si comparte la computadora con otras personas.

---

## 3. Navegación Principal

Una vez que inicie sesión, verá el menú principal en el lado izquierdo de la pantalla. Este menú le permite acceder a todas las funciones del sistema:

| Icono | Opción | Descripción |
|-------|--------|-------------|
| 📊 | **Dashboard** | Panel principal con estadísticas del día |
| 📦 | **Inventario** | Administrar productos (agregar, editar, eliminar) |
| 💳 | **Ventas** | Punto de venta para realizar ventas |
| 👥 | **Clientes** | Administrar información de clientes |
| ⏱️ | **Historial** | Ver todas las ventas realizadas |

Para navegar, simplemente haga clic en cualquier opción del menú.

---

## 4. Dashboard - Panel Principal

El Dashboard es la primera pantalla que verá al iniciar sesión. Muestra un resumen de las actividades del día.

### Información que muestra:

#### Tarjetas de Resumen

1. **Total Vendido Hoy**
   - Muestra el monto total en dinero de todas las ventas del día
   - Formato: $0.00

2. **Ventas Realizadas**
   - Número de transacciones (ventas) completadas hoy
   - Ejemplo: Si vendió a 5 clientes diferentes, mostrará "5"

#### Top 5 Productos Vendidos

- Lista de los 5 productos que más se han vendido hoy
- Muestra el nombre del producto y la cantidad vendida
- Le ayuda a identificar qué productos son los más populares

> **Nota:** Las estadísticas se actualizan automáticamente cada vez que entra al Dashboard.

---

## 5. Punto de Venta (POS)

El Punto de Venta es donde realizará las ventas a sus clientes. Para acceder, haga clic en **"Ventas"** en el menú lateral.

### Paso 1: Buscar y Agregar Productos

1. En el campo de búsqueda escriba el **nombre** o **código (SKU)** del producto
2. Aparecerá una lista de sugerencias mientras escribe
3. Haga clic en el producto deseado para agregarlo al carrito
4. El producto se agregará con cantidad 1

### Paso 2: Ajustar Cantidades

En el carrito de compras puede:

- **Aumentar cantidad:** Haga clic en el botón **"+"**
- **Disminuir cantidad:** Haga clic en el botón **"-"**
- **Eliminar producto:** Haga clic en el icono de **basura** 🗑️

### Paso 3: Seleccionar Cliente (Opcional)

Por defecto, la venta se registra como **"Consumidor Final"**. Si desea asociar la venta a un cliente específico:

1. Haga clic en el botón **"Cambiar Cliente"**
2. Escriba el nombre del cliente en el campo de búsqueda
3. Seleccione el cliente de la lista
4. El nombre del cliente aparecerá en la sección del carrito

### Paso 4: Revisar el Total

El sistema calcula automáticamente:

- **Subtotal:** Precio de cada producto × cantidad
- **IVA (12%):** Se calcula automáticamente sobre el subtotal
- **Total General:** Subtotal + IVA

### Paso 5: Finalizar la Venta

1. Revise que todos los productos y cantidades sean correctos
2. Haga clic en el botón **"Finalizar Venta"**
3. Se abrirá la ventana de pago

### Paso 6: Registrar el Pago

En la ventana de pago:

1. **Seleccione el método de pago:**
   - **Efectivo:** Pago en dinero en efectivo
   - **Tarjeta:** Pago con tarjeta de crédito/débito
   - **Transferencia:** Pago por transferencia bancaria

2. **Ingrese el monto recibido:**
   - Para efectivo: Ingrese la cantidad que el cliente le entrega
   - El sistema calculará el **cambio** automáticamente

3. **Referencia (opcional):**
   - Para pagos con tarjeta o transferencia, puede ingresar un número de referencia

4. Haga clic en **"Confirmar Pago"**

### Después de la Venta

- La venta se registra automáticamente
- Se abrirá la pantalla del recibo
- Puede imprimir el recibo para el cliente
- El inventario se actualiza automáticamente

---

## 6. Gestión de Inventario

Para administrar sus productos, haga clic en **"Inventario"** en el menú lateral.

### Ver Lista de Productos

Verá una tabla con todos sus productos que incluye:

| Columna | Descripción |
|---------|-------------|
| SKU | Código único del producto |
| Nombre | Nombre del producto |
| Precio | Precio de venta al público |
| Costo | Precio que usted pagó por el producto |
| Acciones | Botones para editar o eliminar |

### Agregar Nuevo Producto

1. Haga clic en el botón **"+ Agregar Producto"**
2. Complete el formulario:

   | Campo | Obligatorio | Descripción |
   |-------|-------------|-------------|
   | Nombre | ✅ Sí | Nombre del producto |
   | SKU | No | Código único (se puede generar automático) |
   | Categoría | No | Tipo de producto (ej: "Útiles escolares") |
   | Unidad | ✅ Sí | Unidad de medida (ej: "Pieza", "Paquete") |
   | Precio | ✅ Sí | Precio de venta al público |
   | Costo | ✅ Sí | Lo que usted pagó por el producto |

3. Haga clic en **"Guardar"**

### Editar un Producto

1. Encuentre el producto en la lista
2. Haga clic en el icono de **lápiz** ✏️
3. Modifique los campos necesarios
4. Haga clic en **"Guardar"**

### Eliminar un Producto

1. Encuentre el producto en la lista
2. Haga clic en el icono de **basura** 🗑️
3. Confirme la eliminación en el cuadro de diálogo

> **Advertencia:** Eliminar un producto es permanente. Asegúrese de que realmente desea eliminar el producto antes de confirmar.

---

## 7. Gestión de Clientes

Para administrar la información de sus clientes, haga clic en **"Clientes"** en el menú lateral.

### Ver Lista de Clientes

Verá una tabla con todos sus clientes registrados.

### Agregar Nuevo Cliente

1. Haga clic en el botón **"+ Agregar Cliente"**
2. Complete el formulario:

   | Campo | Obligatorio | Descripción |
   |-------|-------------|-------------|
   | Nombre | ✅ Sí | Nombre completo del cliente |
   | Nro. Documento | ✅ Sí | Cédula o RUC del cliente |
   | Email | No | Correo electrónico |
   | Teléfono | No | Número de teléfono |
   | Dirección | No | Dirección del cliente |

3. Haga clic en **"Guardar"**

### Editar un Cliente

1. Encuentre el cliente en la lista
2. Haga clic en el icono de **lápiz** ✏️
3. Modifique los campos necesarios
4. Haga clic en **"Guardar"**

### Eliminar un Cliente

1. Encuentre el cliente en la lista
2. Haga clic en el icono de **basura** 🗑️
3. Confirme la eliminación

### Cliente "Consumidor Final"

El sistema incluye un cliente especial llamado **"Consumidor Final"** que se usa automáticamente cuando no se especifica un cliente. Este cliente no se puede eliminar.

---

## 8. Historial de Ventas

Para ver todas las ventas realizadas, haga clic en **"Historial"** en el menú lateral.

### Información de la Tabla

| Columna | Descripción |
|---------|-------------|
| No. Venta | Número único de la transacción |
| Fecha | Fecha en que se realizó la venta |
| Cliente | Nombre del cliente (o "Consumidor Final") |
| Total | Monto total de la venta |
| Estado Pago | Estado del pago (Pagado, Pendiente) |
| Acciones | Ver el recibo de la venta |

### Buscar Ventas

Use el campo de búsqueda para filtrar ventas por:
- Número de venta
- Nombre del cliente
- Monto total

### Ver Recibo de una Venta

1. Encuentre la venta en la lista
2. Haga clic en el icono de **recibo** 🧾
3. Se abrirá el recibo completo de esa venta

### Ordenar Resultados

Haga clic en el encabezado de cualquier columna para ordenar:
- Clic una vez: Orden ascendente (A-Z, menor a mayor)
- Clic dos veces: Orden descendente (Z-A, mayor a menor)

### Paginación

En la parte inferior de la tabla puede:
- Cambiar cuántos registros ver por página (10, 25, 100)
- Navegar entre páginas usando las flechas

---

## 9. Recibos y Tickets

### Ver un Recibo

El recibo muestra toda la información de una venta:

```
┌─────────────────────────────────┐
│         PAPELERÍA APP           │
│        Recibo No. [###]         │
├─────────────────────────────────┤
│ Fecha: DD/MM/AAAA HH:MM         │
│ Estado: PAGADO                  │
│                                 │
│ CLIENTE                         │
│ Nombre: [Nombre del cliente]    │
│ Doc: [Número de documento]      │
├─────────────────────────────────┤
│ PRODUCTOS                       │
│                                 │
│ 2 x Lápiz #2                    │
│                          $1.00  │
│ 1 x Cuaderno 100 hojas          │
│                          $2.50  │
├─────────────────────────────────┤
│ Subtotal:              $3.50    │
│ IVA (12%):             $0.42    │
│ ───────────────────────────     │
│ TOTAL:                 $3.92    │
└─────────────────────────────────┘
```

### Imprimir Recibo

1. Abra el recibo que desea imprimir
2. Haga clic en el botón de **impresora** 🖨️ (botón flotante)
3. Se abrirá la ventana de impresión de su navegador
4. Seleccione su impresora
5. Haga clic en **"Imprimir"**

> **Consejo:** Si usa una impresora de tickets (térmica), asegúrese de configurar el tamaño de papel correcto en las opciones de impresión.

---

## 10. Preguntas Frecuentes

### Acceso y Seguridad

**P: ¿Qué hago si olvidé mi contraseña?**
R: Contacte al administrador del sistema para que le asigne una nueva contraseña.

**P: ¿Puedo cambiar mi contraseña?**
R: Esta función debe ser solicitada al administrador del sistema.

**P: ¿Por qué me pide iniciar sesión nuevamente?**
R: Por seguridad, la sesión expira después de un período de inactividad. Simplemente inicie sesión nuevamente.

### Ventas

**P: ¿Cómo cancelo una venta que ya empecé?**
R: Simplemente elimine todos los productos del carrito usando el icono de basura, o recargue la página.

**P: ¿Puedo modificar una venta ya completada?**
R: No, las ventas confirmadas no se pueden modificar. Si hubo un error, consulte con el administrador.

**P: ¿Qué pasa si ingreso un monto de pago menor al total?**
R: El sistema no le permitirá confirmar el pago. Debe ingresar un monto igual o mayor al total.

**P: ¿Cómo registro una devolución?**
R: Actualmente el sistema no maneja devoluciones automáticas. Consulte con el administrador para estos casos.

### Inventario

**P: ¿Se actualiza el inventario automáticamente con las ventas?**
R: Sí, cada vez que se completa una venta, las cantidades vendidas se descuentan del inventario.

**P: ¿Puedo ver el stock disponible de cada producto?**
R: Esta información puede consultarse en la sección de Inventario.

**P: ¿Cómo agrego más unidades de un producto existente?**
R: Edite el producto y ajuste la cantidad en stock.

### Clientes

**P: ¿Es obligatorio registrar al cliente en cada venta?**
R: No, si no selecciona un cliente, la venta se registra automáticamente como "Consumidor Final".

**P: ¿Puedo buscar un cliente por número de documento?**
R: Actualmente la búsqueda es por nombre. Puede usar el número de documento como parte del nombre para facilitar la búsqueda.

### Impresión

**P: ¿Qué tipo de impresora necesito?**
R: Puede usar cualquier impresora. Para tickets, se recomienda una impresora térmica de 80mm.

**P: El recibo no se imprime correctamente, ¿qué hago?**
R: Verifique la configuración de su impresora y el tamaño de papel. Intente usar la opción "Ajustar a página" en las opciones de impresión.

### Otros

**P: ¿Puedo usar el sistema desde mi celular?**
R: El sistema está optimizado para computadoras. Puede funcionar en tablets, pero no se recomienda para uso diario.

**P: ¿Los datos están seguros?**
R: Sí, todos los datos se almacenan de forma segura en la nube con encriptación.

**P: ¿Qué pasa si se va el internet durante una venta?**
R: La venta no se completará. Espere a que regrese la conexión e intente nuevamente. Los productos en el carrito se perderán si cierra la página.

---

## Glosario de Términos

| Término | Significado |
|---------|-------------|
| **SKU** | Código único que identifica a un producto |
| **IVA** | Impuesto al Valor Agregado (12%) |
| **POS** | Point of Sale (Punto de Venta) |
| **Consumidor Final** | Cliente genérico para ventas sin cliente específico |
| **Dashboard** | Panel principal con resumen de información |
| **Sucursal** | Ubicación física del negocio |

---

## Soporte Técnico

Si tiene problemas técnicos con el sistema:

1. Verifique su conexión a internet
2. Intente recargar la página (F5 o Ctrl+R)
3. Cierre sesión e inicie sesión nuevamente
4. Si el problema persiste, contacte al administrador del sistema

---

**Versión del Manual:** 1.0
**Última actualización:** Enero 2026
**Sistema:** Papelería App v1.0
