import { app } from './app'
import { env } from './env'

app.listen(
  { port: env.PORT, host: '0.0.0.0' },
  (err: Error | null, address: string) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Servidor rodando em ${address}`)
  },
)
