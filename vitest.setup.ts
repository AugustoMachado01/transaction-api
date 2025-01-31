import { config } from 'dotenv'
import { execSync } from 'child_process'

process.env.NODE_ENV = 'test'

// Carrega as variáveis do banco de testes
config({ path: '.env.test' })

console.log('🧪 Usando DATABASE_URL:', process.env.DATABASE_URL)

try {
  console.log('🚀 Resetando o banco de testes...')
  execSync('npx prisma migrate reset --force', { stdio: 'inherit' })
} catch (error) {
  console.error('❌ Erro ao resetar o banco de testes', error)
  process.exit(1)
}
