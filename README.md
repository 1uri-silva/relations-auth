# Relations Auth

___

Exemplo para criação, autenticação e cadastro de usuários e produtos.

> Criar usuário com os tipos de BUYER e VENDOR
> Autenticar o usuário com JWT em rotas separadas
> Somente o usuário com permissão de VENDOR poderá criar produtos

- POST /new/user ->  { username, password, type }
- POST /vendor/user/auth ->  { username, password }
- POST /buyer/user/auth ->  { username, password }
- POST /buyer/user/auth ->  { productName, price }


## Execute

`bash
  npm prisma migrate dev
  npm start:dev
`