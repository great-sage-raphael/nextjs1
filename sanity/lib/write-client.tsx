import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId ,token} from '../env'

export const writeclient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
    token,
})
