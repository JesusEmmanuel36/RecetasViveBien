import type { Metadata } from 'next';
import '@fontsource-variable/figtree';
import './globals.css';

export const metadata: Metadata = {
  title: 'Savia — comer bien, vivir bonito',
  description: 'Recetas saludables, ingredientes cotidianos y preparaciones paso a paso. Encuentra tu próximo desayuno, comida, cena o snack.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
