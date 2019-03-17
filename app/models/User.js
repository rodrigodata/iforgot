/**
 * Efetuar model para Usuário, para que ele consiga logar em futuro dashboard.
 * A lógica desse arquivo, além de outras coisas, será responsável pela verificação entre hash/salt e senha informada
 * na hora de efetuar o login. Caso a hash e a senha sejam iguais, liberamos o login do usuário.
 */

// salt: {
//     type: String,
//     required: [true, 'não pode ser vazio']
// },
// hash: {
//     type: String,
//     required: [true, 'não pode ser vazio'],
//     maxlength: 1024
// }

// UserSchema.methods.verificarSenha = function() {
//     this.geradorSaltHash(
//         Array(senhaTamanho)
//             .fill(senhaDicionario)
//             .map(function(x) {
//                 return x[Math.floor(Math.random() * x.length)];
//             })
//             .join('')
//     );
// };

// /**
//  * Método responsável por criar o Salt e a Hash de senha.
//  * Usamos o Salt para gerar a hash, juntamente com a senha gerada e outras configurações.
//  */
// UserSchema.methods.geradorSaltHash = function(senha) {
//     /* Ver mais detalhes em https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback */
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto
//         .pbkdf2Sync(senha, this.salt, 10000, 512, 'sha512')
//         .toString('hex');
// };
