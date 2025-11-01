const bcrypt = require('bcrypt');

async function generarPassword() {
  const passwordPlano = 'miPassword1234';
  const hash = await bcrypt.hash(passwordPlano, 10);
  console.log(hash);
}

generarPassword();
