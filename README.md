# Firebase Functions Backend

Este proyecto contiene funciones de backend para Firebase Functions escritas en TypeScript.

## Scripts principales

- `npm install` — Instala las dependencias.
- `npm run build` — Compila el código TypeScript (si tienes script de build).
- `firebase deploy --only functions` — Despliega las funciones a Firebase.

## Estructura

- `src/` — Código fuente de las funciones y servicios.
- `package.json` — Dependencias y scripts del proyecto.

## Notas

## Environments

Para variables de entorno sensibles, utiliza un archivo `.env` en la raíz de la carpeta `functions`.
El archivo `.env.sample` sirve como plantilla y contiene las variables necesarias:

```
JWT_DURATION=
JWT_SECRET=
```

Copia `.env.sample` como `.env` y completa los valores según tu entorno local o de producción.

- Asegúrate de tener configurado el CLI de Firebase y acceso a tu proyecto.
- Las funciones usan Firestore y Express.
- Para agregar nuevas funciones, crea archivos en `src/` y expórtalas en `src/index.ts`.

---

> Proyecto generado y configurado para desarrollo rápido con Firebase Functions y TypeScript.
