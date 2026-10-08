import additionalRecipes from './additional-recipes.json';
export type Category = 'snacks' | 'desayunos' | 'comidas' | 'cenas';
export type Recipe = {
  id: string; category: Category; name: string; description: string;
  minutes: number; servings: number; tags: string[]; ingredients: string[]; highlights: string;
  steps: { title: string; text: string }[]; tip: string;
};
export const categories: { id: Category; name: string; subtitle: string }[] = [
  { id: 'snacks', name: 'Snacks', subtitle: 'Un pequeño gusto entre comidas.' },
  { id: 'desayunos', name: 'Desayunos', subtitle: 'Empieza el día con algo bueno.' },
  { id: 'comidas', name: 'Comidas', subtitle: 'Una pausa para nutrirte.' },
  { id: 'cenas', name: 'Cenas', subtitle: 'Termina tu día con calma.' },
];
const initialRecipes: Recipe[] = [
  {
    id: 'hummus-limon', highlights: 'Garbanzos · limón · verduras frescas', category: 'snacks', name: 'Hummus de limón con crudités',
    description: 'Cremoso, fresco y con un toque de limón. El compañero perfecto de tus verduras favoritas.',
    minutes: 10, servings: 2, tags: ['Vegetal', 'Sin cocción'],
    ingredients: ['1 taza de garbanzos cocidos, escurridos y enjuagados', '1 cucharada de tahini (pasta de ajonjolí)', '2 cucharadas de jugo de limón', '1 cucharadita de aceite de oliva', '½ diente de ajo pequeño', '2–4 cucharadas de agua fría', '¼ de cucharadita de comino molido', '1 pizca de sal, al gusto', '1 zanahoria mediana', '½ pepino', '½ pimiento rojo'],
    steps: [
      { title: 'Prepara las verduras', text: 'Lava el pepino y el pimiento. Pela la zanahoria si lo prefieres y retira las semillas del pimiento. Corta todo en bastones de tamaño similar para que sea fácil tomar el hummus con ellos.' },
      { title: 'Procesa la base', text: 'Coloca en una licuadora o procesador los garbanzos, el tahini, el jugo de limón, el ajo, el aceite, el comino y la sal. Añade 2 cucharadas de agua fría y procesa durante 1 minuto.' },
      { title: 'Ajusta la textura', text: 'Apaga el aparato y baja la mezcla de las paredes con una espátula. Procesa nuevamente y añade el resto del agua, una cucharada a la vez, hasta obtener una crema suave. Prueba y ajusta el limón o la sal.' },
      { title: 'Sirve y disfruta', text: 'Reparte el hummus en dos recipientes y acompáñalo con los bastones de verduras. Si lo preparas con anticipación, guarda el hummus y las verduras por separado en recipientes cerrados en el refrigerador.' },
    ], tip: '¿No tienes tahini? Sustitúyelo por una cucharada de yogur natural sin azúcar; la versión dejará de ser vegetal. Usa garbanzos de lata para hacerlo en pocos minutos.',
  },
  {
    id: 'avena-manzana', highlights: 'Avena · manzana · canela · nueces', category: 'desayunos', name: 'Avena cremosa con manzana y canela',
    description: 'Un desayuno cálido y reconfortante, con la dulzura natural de la manzana y el crujiente de las nueces.',
    minutes: 15, servings: 1, tags: ['Vegetariano', 'Una sola olla'],
    ingredients: ['½ taza de hojuelas de avena tradicionales', '¾ de taza de leche o bebida de soya sin azúcar', '¼ de taza de agua', '1 manzana pequeña', '½ cucharadita de canela molida', '1 cucharada de nueces picadas', '1 cucharadita de semillas de chía', '1 pizca de sal'],
    steps: [
      { title: 'Corta la manzana', text: 'Lava la manzana, retira el corazón y córtala en cubos pequeños de aproximadamente 1 cm. Puedes conservar la cáscara. Reserva una cuarta parte para servir al final.' },
      { title: 'Cocina la avena', text: 'En una olla pequeña coloca la avena, la leche, el agua, la mayor parte de la manzana, la canela y la sal. Calienta a fuego medio hasta que empiece a burbujear suavemente.' },
      { title: 'Consigue una textura cremosa', text: 'Baja el fuego y cocina de 7 a 10 minutos, removiendo con frecuencia para evitar que se pegue. La avena estará lista cuando esté suave y la manzana tierna. Si queda demasiado espesa, añade un poco de agua o leche.' },
      { title: 'Añade los toppings', text: 'Apaga el fuego y deja reposar 1 minuto. Sirve en un tazón y agrega la manzana reservada, las nueces y la chía. Mezcla antes de comer para distribuir las semillas.' },
    ], tip: 'Para una textura aún más suave, ralla la manzana antes de cocinarla. Puedes cambiar las nueces por semillas de calabaza.',
  },
  {
    id: 'bowl-quinoa', highlights: 'Quinoa · garbanzos · aguacate', category: 'comidas', name: 'Bowl de quinoa, garbanzos y aguacate',
    description: 'Color, textura y un aderezo sencillo. Un bowl completo que también puedes llevar contigo.',
    minutes: 25, servings: 2, tags: ['Vegetal', 'Para llevar'],
    ingredients: ['½ taza de quinoa cruda', '1 taza de agua', '1 taza de garbanzos cocidos y escurridos', '1 taza de tomates cherry', '½ pepino', '1 aguacate pequeño', '2 tazas de espinaca lavada y desinfectada', '1 cucharada de aceite de oliva', '2 cucharadas de jugo de limón', '¼ de cucharadita de comino', 'Sal y pimienta al gusto'],
    steps: [
      { title: 'Enjuaga y cocina la quinoa', text: 'Coloca la quinoa en un colador fino y enjuágala bajo agua corriente. Pásala a una olla con 1 taza de agua. Lleva a ebullición, tapa y baja el fuego. Cocina de 12 a 15 minutos, hasta que absorba el agua.' },
      { title: 'Deja reposar y prepara los vegetales', text: 'Retira la olla del fuego y deja reposar la quinoa tapada durante 5 minutos. Después sepárala suavemente con un tenedor. Mientras tanto, lava y corta los tomates por la mitad y el pepino en cubos. Corta el aguacate justo antes de servir.' },
      { title: 'Mezcla el aderezo', text: 'En un recipiente pequeño bate con un tenedor el aceite de oliva, el jugo de limón, el comino, una pizca de sal y pimienta. Prueba y ajusta a tu gusto.' },
      { title: 'Arma los bowls', text: 'Distribuye la espinaca y la quinoa en dos tazones. Agrega los garbanzos, el tomate, el pepino y el aguacate. Vierte el aderezo y mezcla suavemente. Se puede comer tibio o frío.' },
    ], tip: 'Para llevar, guarda el aderezo aparte y añade el aguacate al momento de comer. Puedes sustituir la quinoa por arroz integral previamente cocido.',
  },
  {
    id: 'tacos-champinones', highlights: 'Champiñones · frijoles · maíz', category: 'cenas', name: 'Tacos de champiñones y frijoles',
    description: 'Una cena sencilla con champiñones dorados, frijoles suaves y todo el sabor de lo hecho en casa.',
    minutes: 20, servings: 2, tags: ['Vegetal', 'Fácil de preparar'],
    ingredients: ['4 tortillas de maíz pequeñas', '250 g de champiñones', '1 taza de frijoles negros cocidos y escurridos', '¼ de cebolla blanca', '1 diente de ajo', '1 cucharadita de aceite de oliva', '¼ de cucharadita de comino', '½ aguacate', '2 cucharadas de cilantro lavado y desinfectado', '1 limón', 'Sal y pimienta al gusto'],
    steps: [
      { title: 'Prepara el relleno', text: 'Limpia los champiñones con un paño húmedo o enjuágalos brevemente y sécalos bien. Córtalos en láminas. Pica finamente la cebolla y el ajo.' },
      { title: 'Dora los champiñones', text: 'Calienta el aceite en una sartén amplia a fuego medio alto. Añade la cebolla y cocina 2 minutos. Incorpora los champiñones en una capa lo más uniforme posible y deja cocinar 3 minutos sin mover. Remueve y cocina otros 3 minutos hasta que estén dorados y se evapore el líquido.' },
      { title: 'Incorpora los frijoles', text: 'Añade el ajo y el comino; remueve durante 30 segundos. Agrega los frijoles y 2 cucharadas de agua. Cocina de 2 a 3 minutos a fuego medio, hasta que todo esté caliente. Ajusta la sal y la pimienta.' },
      { title: 'Calienta y arma los tacos', text: 'Calienta las tortillas en un comal unos 30 segundos por lado, hasta que sean flexibles. Reparte el relleno entre las cuatro tortillas. Termina con aguacate en rebanadas, cilantro y jugo de limón al gusto. Sirve enseguida.' },
    ], tip: 'Dale espacio a los champiñones en la sartén: si se amontonan, se cocerán al vapor. Si tu sartén es pequeña, dóralos en dos tandas.',
  },
];

export const recipes: Recipe[] = [...initialRecipes, ...(additionalRecipes as Recipe[])];
