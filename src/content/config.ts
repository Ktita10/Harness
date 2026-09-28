import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    slug: z.string().optional(),
    nombre: z.string(),
    metaTitle: z.string().max(60, 'metaTitle must be 60 characters or less'),
    metaDescription: z.string().max(155, 'metaDescription must be 155 characters or less'),
    h1: z.string(),
    bajada: z.string(),
    incluye: z.array(
      z.object({
        titulo: z.string(),
        descripcion: z.string(),
      })
    ),
    planes: z.array(
      z.object({
        nombre: z.string(),
        precio: z.string(),
        incluye: z.array(z.string()),
        plazo: z.string(),
        destacado: z.boolean().optional(),
      })
    ),
    proceso: z
      .array(
        z.object({
          titulo: z.string(),
          descripcion: z.string(),
        })
      )
      .optional(),
    faqs: z.array(
      z.object({
        pregunta: z.string(),
        respuesta: z.string(),
      })
    ),
    whatsappMensaje: z.string(),
  }),
});

const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    pregunta: z.string(),
    respuesta: z.string(),
    orden: z.number().default(0),
  }),
});

export const collections = {
  services,
  faqs,
};
