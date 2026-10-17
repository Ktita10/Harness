import type { CollectionEntry } from 'astro:content';

type ServiceEntry = CollectionEntry<'services'>;

const SERVICE_ORDER = ['landing-pages', 'tiendanube', 'tienda-online', 'software-a-medida'];

export function getServiceSlug(entry: ServiceEntry): string {
  return (entry.data.slug || entry.id).replace(/\.md$/, '');
}

/**
 * Orden de los servicios compartido entre la Home (abanico de tarjetas) y las
 * páginas de detalle, para que el número `0N` de cada servicio sea el mismo en ambas.
 */
export function sortServices(services: ServiceEntry[]): ServiceEntry[] {
  return [...services].sort((a, b) => {
    const indexA = SERVICE_ORDER.indexOf(getServiceSlug(a));
    const indexB = SERVICE_ORDER.indexOf(getServiceSlug(b));
    return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? indexB : 99);
  });
}

export function getServiceNumber(services: ServiceEntry[], slug: string): string {
  const index = sortServices(services).findIndex((s) => getServiceSlug(s) === slug);
  return String(index + 1).padStart(2, '0');
}
