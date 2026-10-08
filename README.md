# Recetas Vive Bien

Prototipo de recetario saludable con Next.js App Router, TypeScript, Tailwind CSS y Figtree autoalojada. 50 recetas: 13 desayunos, 13 comidas, 12 cenas y 12 snacks. Una fotografía generada por receta, optimizada en WebP.

## Desarrollo

```sh
npm install
npm run dev
```

Abre http://127.0.0.1:3000. `npm run build` produce una exportación estática en `out/`. `npm run typecheck` verifica TypeScript.

## Firebase

El SDK y el inicializador de Firestore están en `lib/firebase.ts`. Copia `.env.example` a `.env.local` y completa los valores de tu propia app web de Firebase. No se usan credenciales de otros proyectos. La vista de diseño usa el catálogo de `lib/recipes.ts` y `lib/additional-recipes.json`; todavía no lee ni escribe recetas en Firestore. Las recetas guardadas se conservan localmente en el navegador.

Los ingredientes se muestran como una lista de texto dentro de la vista completa de cada receta.

Referencias de implementación: [Next.js](https://nextjs.org/docs/app/getting-started/installation) y [Firebase](https://firebase.google.com/docs/web/setup).

## Imágenes

Imágenes creadas con la herramienta integrada `image_gen`: hummus con crudités, avena con manzana, bowl de quinoa y tacos de champiñones. Los originales están en `output/imagegen/`; las versiones para la página, en `public/images/recipes/`. El conjunto completo de prompts y rutas está en `output/imagegen/prompts.json`.

Las 46 recetas nuevas y sus imágenes tienen prompts individuales en `output/imagegen/prompts-50.json`. Los originales nuevos se guardan localmente, fuera del historial Git; las imágenes WebP sí forman parte del sitio publicado. Las recetas son propuestas originales y los tiempos son estimados. Referencia de temperaturas de cocción: [FoodSafety.gov](https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures).
