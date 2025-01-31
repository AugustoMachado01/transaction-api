"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const child_process_1 = require("child_process");
process.env.NODE_ENV = 'test';
// Carrega as variáveis do banco de testes
(0, dotenv_1.config)({ path: '.env.test' });
console.log('🧪 Usando DATABASE_URL:', process.env.DATABASE_URL);
try {
    console.log('🚀 Resetando o banco de testes...');
    (0, child_process_1.execSync)('npx prisma migrate reset --force', { stdio: 'inherit' });
}
catch (error) {
    console.error('❌ Erro ao resetar o banco de testes', error);
    process.exit(1);
}
