# Savia

Prototipo de recetario saludable con Next.js App Router, TypeScript, Tailwind CSS y Figtree autoalojada. Cuatro recetas: una por categoría. Una fotografía generada por receta, optimizada en WebP.

## Desarrollo

```sh
npm install
npm run dev
```

Abre http://127.0.0.1:3000. `npm run build` produce una exportación estática en `out/`. `npm run typecheck` verifica TypeScript.

## Firebase

El SDK y el inicializador de Firestore están en `lib/firebase.ts`. Copia `.env.example` a `.env.local` y completa los valores de tu propia app web de Firebase. No se usan credenciales de otros proyectos. La vista de diseño usa los cuatro ejemplos de `lib/recipes.ts`; todavía no lee ni escribe recetas en Firestore. Las recetas guardadas se conservan localmente en el navegador.

La colección de 100 recetas queda pendiente de aprobar el diseño. Los ingredientes se muestran como una lista de texto dentro de la vista completa de cada receta.

Referencias de implementación: [Next.js](https://nextjs.org/docs/app/getting-started/installation) y [Firebase](https://firebase.google.com/docs/web/setup).

## Imágenes

Imágenes creadas con la herramienta integrada `image_gen`: hummus con crudités, avena con manzana, bowl de quinoa y tacos de champiñones. Los originales están en `output/imagegen/`; las versiones para la página, en `public/images/recipes/`. El conjunto completo de prompts y rutas está en `output/imagegen/prompts.json`.
