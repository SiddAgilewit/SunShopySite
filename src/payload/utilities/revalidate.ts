import type { Payload } from 'payload'

export const revalidate = async (args: {
  collection: string
  slug: string
  payload: Payload
}): Promise<void> => {
  const { collection, slug, payload } = args

  try {
    const res = await fetch(
<<<<<<< HEAD
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/revalidate?secret=${process.env.REVALIDATION_KEY}&collection=${collection}&slug=${slug}`,
=======
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/revalidate?secret=${process.env.REVALIDATION_KEY}&collection=${collection}&slug=${slug}`,
>>>>>>> 2ad312393c380ac1bebb34b2fed6d8ee7538bde1
    )

    if (res.ok) {
      payload.logger.info(`Revalidated page '${slug}' in collection '${collection}'`)
    } else {
      payload.logger.error(
        `Error revalidating page '${slug}' in collection '${collection}': ${res}`,
      )
    }
  } catch (err: unknown) {
    payload.logger.error(
      `Error hitting revalidate route for page '${slug}' in collection '${collection}': ${err}`,
    )
  }
}
