'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Bookmark, ChevronRight, Clock3, CookingPot, Leaf, Lightbulb, Moon, Search, SlidersHorizontal, Sprout, Sun, Users, X } from 'lucide-react';
import { categories, recipes, type Category, type Recipe } from '@/lib/recipes';

const icons = { snacks: Sprout, desayunos: Sun, comidas: CookingPot, cenas: Moon };
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function Home() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [selected, setSelected] = useState<Recipe | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { const value: unknown = JSON.parse(localStorage.getItem('savia-saved') || '[]'); if (Array.isArray(value)) setSaved(value.filter((id): id is string => typeof id === 'string')); } catch { /* Optional local storage. */ }
  }, []);
  useEffect(() => {
    if (selected) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = previous; };
    }
    dialog.current?.close();
  }, [selected]);

  function toggleSaved(id: string) {
    const updated = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
    setSaved(updated);
    try { localStorage.setItem('savia-saved', JSON.stringify(updated)); } catch { /* Saves remain available for this session. */ }
  }
  function openRecipe(recipe: Recipe) { setSelected(recipe); }
  const visible = recipes.filter(recipe => (filter === 'all' || recipe.category === filter) && (!savedOnly || saved.includes(recipe.id)) && normalize([recipe.name, recipe.description, ...recipe.ingredients, ...recipe.tags].join(' ')).includes(normalize(query)));

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#" aria-label="Savia, inicio"><span className="brand-icon"><Sprout size={25} strokeWidth={1.7} /></span>savia<span className="brand-dot">.</span></a>
          <nav className="header-nav" aria-label="Navegación principal"><a href="#recetas">El recetario</a><span>Simple. Rico. Natural.</span></nav>
          <button className={`saved-button ${savedOnly ? 'active' : ''}`} aria-pressed={savedOnly} onClick={() => { setSavedOnly(!savedOnly); document.getElementById('recetas')?.scrollIntoView({ behavior: 'smooth' }); }}><Bookmark size={17} fill={savedOnly ? 'currentColor' : 'none'} /><span>Mis recetas</span><span className="saved-count">{saved.length}</span></button>
        </div>
      </header>

      <main className="shell">
        <section id="recetas" className="recipe-collection" aria-label="Recetario">
          <div className="collection-top"><div><span className="eyebrow muted">TU DOSIS DE INSPIRACIÓN</span><h1>¿Qué se te antoja hoy?</h1></div><span className="recipe-total">4 recetas para empezar <span>↗</span></span></div>
          <div className="filter-bar">
            <nav className="category-tabs" aria-label="Filtrar por categoría">
              <button aria-pressed={filter === 'all'} className={filter === 'all' ? 'selected' : ''} onClick={() => setFilter('all')}><SlidersHorizontal size={16} />Todas</button>
              {categories.map(category => { const Icon = icons[category.id]; return <button key={category.id} aria-pressed={filter === category.id} className={filter === category.id ? 'selected' : ''} onClick={() => setFilter(category.id)}><Icon size={17} />{category.name}</button>; })}
            </nav>
            <label className="search-field"><Search size={18} /><span className="sr-only">Buscar por receta o ingrediente</span><input ref={search} type="search" placeholder="Busca una receta o ingrediente" value={query} onChange={event => setQuery(event.target.value)} /></label>
          </div>
          {savedOnly && <div className="saved-filter"><Bookmark size={16} /> Tus recetas guardadas <button onClick={() => setSavedOnly(false)}>Ver todas <X size={14} /></button></div>}
          <div className="sections-grid">
            {categories.map(category => {
              const matching = visible.filter(recipe => recipe.category === category.id);
              const Icon = icons[category.id];
              if (!matching.length) return null;
              return <section className={`category-section ${category.id}`} key={category.id} aria-labelledby={`heading-${category.id}`}>
                <div className="section-heading"><div className="flex items-center gap-3"><span className="category-icon"><Icon size={20} strokeWidth={1.7} /></span><div><h3 id={`heading-${category.id}`}>{category.name}</h3><p>{category.subtitle}</p></div></div><span className="section-number">01</span></div>
                {matching.map(recipe => <article key={recipe.id} className="recipe-card">
                  <button className="recipe-photo-button" onClick={() => openRecipe(recipe)} aria-label={`Ver receta: ${recipe.name}`}><Image className="recipe-photo" src={`/images/recipes/${recipe.id}.webp`} alt={recipe.name} width={1200} height={800} sizes="(max-width: 640px) 100vw, 50vw" unoptimized /></button>
                  <div className="card-top"><span className="recipe-label"><span />{recipe.category === 'snacks' ? 'PARA ESE ANTOJO' : recipe.category === 'desayunos' ? 'UN BUEN COMIENZO' : recipe.category === 'comidas' ? 'A LA HORA DE COMER' : 'EL ÚLTIMO BOCADO'}</span><button className={`bookmark ${saved.includes(recipe.id) ? 'is-saved' : ''}`} aria-label={`${saved.includes(recipe.id) ? 'Quitar de' : 'Guardar en'} mis recetas: ${recipe.name}`} aria-pressed={saved.includes(recipe.id)} onClick={() => toggleSaved(recipe.id)}><Bookmark size={19} strokeWidth={1.6} fill={saved.includes(recipe.id) ? 'currentColor' : 'none'} /></button></div>
                  <button className="title-button" onClick={() => openRecipe(recipe)}><h4>{recipe.name}</h4></button>
                  <p className="card-description">{recipe.description}</p>
                  <div className="recipe-meta"><span><Clock3 size={15} />{recipe.minutes} min</span><span><Users size={15} />{recipe.servings} {recipe.servings === 1 ? 'porción' : 'porciones'}</span><span><CookingPot size={15} />Fácil</span></div>
                  <div className="ingredient-preview"><span>LOS PROTAGONISTAS</span><p>{recipe.id === 'hummus-limon' ? 'Garbanzos · limón · verduras frescas' : recipe.id === 'avena-manzana' ? 'Avena · manzana · canela · nueces' : recipe.id === 'bowl-quinoa' ? 'Quinoa · garbanzos · aguacate' : 'Champiñones · frijoles · maíz'}</p></div>
                  <div className="card-footer"><div className="tags">{recipe.tags.map(tag => <span key={tag}>{tag}</span>)}</div><button className="view-recipe" onClick={() => openRecipe(recipe)}>Ver receta <ArrowUpRight size={18} /></button></div>
                </article>)}
              </section>;
            })}
          </div>
          {!visible.length && <div className="empty-state"><Search size={30} /><h3>{savedOnly ? 'Aquí van tus favoritas' : 'No encontramos esa receta'}</h3><p>{savedOnly ? 'Guarda una receta con el marcador para tenerla siempre a la mano.' : 'Prueba con otro ingrediente o explora todas las categorías.'}</p><button onClick={() => { setSavedOnly(false); setQuery(''); setFilter('all'); }}>Explorar el recetario <ChevronRight size={16} /></button></div>}
          <div className="closing-note"><span className="closing-icon"><Sprout size={25} strokeWidth={1.5} /></span><div><h3>Pequeños cambios. Grandes comienzos.</h3><p>Una receta a la vez, encuentra tu forma de comer mejor.</p></div><span className="closing-detail">HECHO CON CALMA Y CARIÑO</span></div>
        </section>
      </main>
      <footer className="shell site-footer"><a className="footer-brand" href="#">savia.</a><span>Comer bien, vivir bonito.</span><span>Tu recetario de todos los días <Leaf size={14} /></span></footer>

      <dialog ref={dialog} className="recipe-dialog" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}>
        {selected && <div className={`dialog-content ${selected.category}`}>
          <div className="dialog-toolbar"><span><Sprout size={18} /> EL RECETARIO SAVIA</span><button className="close-button" aria-label="Cerrar receta" onClick={() => setSelected(null)}><X size={21} /></button></div>
          <div className="dialog-heading"><span className="recipe-label">{categories.find(category => category.id === selected.category)?.name}</span><h2>{selected.name}</h2><p>{selected.description}</p><div className="dialog-meta"><div className="recipe-meta"><span><Clock3 size={16} />{selected.minutes} min</span><span><Users size={16} />{selected.servings} {selected.servings === 1 ? 'porción' : 'porciones'}</span></div><button className="dialog-save" aria-pressed={saved.includes(selected.id)} onClick={() => toggleSaved(selected.id)}><Bookmark size={16} fill={saved.includes(selected.id) ? 'currentColor' : 'none'} />{saved.includes(selected.id) ? 'Guardada' : 'Guardar receta'}</button></div></div>
          <div className="recipe-details"><section className="ingredients"><div className="detail-title"><h3>Ingredientes</h3><span>{selected.ingredients.length}</span></div><ul>{selected.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}</ul></section><section className="preparation"><h3>Manos a la cocina</h3><ol>{selected.steps.map((step, index) => <li key={step.title}><span className="step-number">{String(index + 1).padStart(2, '0')}</span><div><h4>{step.title}</h4><p>{step.text}</p></div></li>)}</ol><aside className="cooking-tip"><Lightbulb size={20} /><div><h4>Un consejo de Savia</h4><p>{selected.tip}</p></div></aside></section></div>
          <div className="dialog-bottom"><span>Disfruta el proceso y cada bocado.</span><button onClick={() => setSelected(null)}>Volver al recetario <ChevronRight size={16} /></button></div>
        </div>}
      </dialog>
    </>
  );
}
