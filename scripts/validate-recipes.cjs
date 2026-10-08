const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { createRequire } = require('node:module');
const ts = require('typescript');
const sharp = require('sharp');

async function main() {
  const file = path.resolve('lib/recipes.ts');
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  const context = { exports: {}, require: createRequire(file) };
  vm.runInNewContext(code, context);
  const recipes = context.exports.recipes;
  assert.equal(recipes.length, 50, 'The catalog must have exactly 50 recipes.');
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  assert.equal(new Set(recipes.map(r => r.id)).size, 50, 'Duplicate recipe ids.');
  assert.equal(new Set(recipes.map(r => normalize(r.name))).size, 50, 'Duplicate recipe names.');
  const counts = { snacks: 12, desayunos: 13, comidas: 13, cenas: 12 };
  const hashes = new Set();
  for (const [category, count] of Object.entries(counts)) {
    assert.equal(recipes.filter(r => r.category === category).length, count, category);
  }
  for (const recipe of recipes) {
    assert(recipe.name && recipe.description && recipe.highlights && recipe.tip, recipe.id);
    assert(recipe.minutes > 0 && recipe.servings > 0, recipe.id);
    assert(recipe.ingredients.length >= 3 && recipe.steps.length >= 4, recipe.id);
    assert(recipe.steps.every(s => s.title && s.text.length >= 50), recipe.id);
    assert.equal(new Set(recipe.ingredients).size, recipe.ingredients.length, recipe.id);
    const image = path.resolve('public/images/recipes', `${recipe.id}.webp`);
    assert(fs.existsSync(image), `Missing image: ${recipe.id}`);
    const bytes = fs.readFileSync(image);
    const hash = crypto.createHash('sha256').update(bytes).digest('hex');
    assert(!hashes.has(hash), `Duplicate photograph: ${recipe.id}`);
    hashes.add(hash);
    const metadata = await sharp(bytes).metadata();
    assert.equal(metadata.width, 1200, recipe.id);
    assert.equal(metadata.height, 800, recipe.id);
    assert(bytes.length < 400000, `Image too large: ${recipe.id}`);
  }
  console.log('PASS: 50 unique recipes, category distribution, ingredients and steps, 50 distinct 1200×800 WebP images.');
}
main().catch(error => { console.error(error.message); process.exit(1); });
