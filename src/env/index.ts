import { config } from 'dotenv'
import { z } from 'zod'

config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
})
// if (process.env.NODE_ENV === 'development') {
//   config({ path: '.env' })
// }

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('invalid environment variables!', _env.error.format())

  throw new Error('invalid environment variables.')
}

export const env = _env.data
