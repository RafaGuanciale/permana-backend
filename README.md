# aromatik-backend
Back-end do Aromatik
# Permana — Backend

## Sobre o projeto

**Permana** é uma aplicação web voltada para quem coleciona e se relaciona com perfumaria. A ideia nasceu de uma dor pessoal: como amante de perfumes, senti falta de uma forma de entender minha própria coleção, o que ela diz sobre mim e o que ainda falta nela.
O Permana ("o que permanece") é a resposta a essa necessidade, transformada em produto.

Este repositório contém a **API própria** do projeto, construída em Node.js/Express, responsável por autenticação, gestão de usuários, catálogo de perfumes, coleção pessoal do usuário e integração com dados de clima.

---

## Links

- **API (Render):** https://permana-backend.onrender.com
- **Frontend (Vercel):** https://permana-frontend.vercel.app/
- **Repositório do frontend:** https://github.com/RafaGuanciale/permana-frontend
- **Repositório do backend:** https://github.com/RafaGuanciale/permana-backend

---

## Funcionalidades

- **Cadastro de usuário** — criação de conta com nome, username, e-mail e senha
- **Login com JWT** — autenticação com token assinado (`HS256`, expiração de 7 dias)
- **Rotas protegidas** — middleware de autenticação valida o token em todas as rotas privadas
- **Perfil do usuário** — consulta (`/users/me`), atualização de dados e de avatar
- **Exclusão de conta** — remoção do usuário mediante reconfirmação de senha, com exclusão em cascata da coleção associada
- **Catálogo de perfumes** — listagem com busca por nome/marca e filtro de populares
- **Coleção pessoal** — adição, remoção e listagem dos perfumes da coleção do usuário, com dados do perfume populados via `.populate()`
- **Clima do dia** — integração com a WeatherAPI, traduzindo condição e período (dia/noite) para português
- **Validação de payloads** — Celebrate + Joi em todas as rotas que recebem dados do cliente
- **Tratamento centralizado de erros** — middleware único que mapeia erros do Mongoose, do Celebrate e de autenticação para respostas HTTP consistentes

---

## Rotas da API

### Auth

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| POST | `/auth/login` | — | Autentica o usuário e retorna o token JWT |

### Users

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| POST | `/users` | — | Cria um novo usuário |
| GET | `/users/me` | Sim | Retorna os dados do usuário autenticado |
| PATCH | `/users/me` | Sim | Atualiza nome do usuário |
| PATCH | `/users/me/avatar` | Sim | Atualiza o avatar do usuário |
| DELETE | `/users/me` | Sim | Exclui a conta (requer confirmação de senha) |

### Perfumes

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| GET | `/perfumes` | Sim | Lista perfumes populares, ou busca por nome/marca via `?search=` |

### Collection

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| GET | `/collection/me` | Sim | Lista a coleção do usuário autenticado |
| POST | `/collection` | Sim | Adiciona um perfume à coleção |
| DELETE | `/collection/:perfumeId` | Sim | Remove um perfume da coleção |

### Weather

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| GET | `/weather` | Sim | Retorna a condição climática atual a partir de `lat`/`lon` |

---

## Segurança

### Autenticação e senha

Senhas são armazenadas com hash via `bcryptjs` (cross-environment compatível) e nunca retornadas nas respostas da API — o campo `password` tem `select: false` no schema e só é buscado explicitamente onde necessário (login, exclusão de conta).

### Autorização e IDOR

Todas as rotas privadas passam pelo `authMiddleware`, que valida o JWT e injeta `req.user` na requisição. As operações sobre dados do próprio usuário (perfil, coleção, exclusão de conta) usam sempre o `_id` extraído do token — nunca um ID vindo do corpo ou dos parâmetros da requisição — o que evita ataques de IDOR (Insecure Direct Object Reference).

### Anti-enumeração

O login retorna a mesma mensagem genérica ("Usuário ou senha inválidos") tanto para e-mail inexistente quanto para senha incorreta, evitando que a resposta da API revele se um e-mail está cadastrado.

### Validação de entrada

Todas as rotas que recebem dados do cliente usam **Celebrate + Joi** como middleware antes do controller, rejeitando payloads inválidos antes que cheguem à lógica de negócio.

### Headers HTTP

`helmet` está habilitado globalmente para configurar headers HTTP de segurança.

### CORS

Configurado com allowlist explícita de origens (`localhost` em desenvolvimento e o domínio do frontend em produção), em vez de aceitar qualquer origem.

### LGPD

A exclusão de conta remove também os documentos de coleção associados ao usuário (`collectionModel.deleteMany`), evitando dados órfãos.

---

## Tecnologias e técnicas utilizadas

- **Node.js / Express** — servidor e definição de rotas
- **MongoDB / Mongoose** — modelagem de dados e persistência
- **JWT (jsonwebtoken)** — autenticação stateless
- **bcryptjs** — hash de senhas
- **Celebrate + Joi** — validação de schema nas rotas
- **Helmet** — hardening de headers HTTP
- **CORS** — controle de origens permitidas
- **Winston / express-winston** — logging estruturado de requisições e erros
- **dotenv** — gestão de variáveis de ambiente
- **ESLint (Airbnb base)** — padronização de código

### Estrutura e boas práticas

- Arquitetura em camadas: `routes` → `middleware` (auth/validação) → `controllers` → `models`
- Middleware de erro centralizado, mapeando erros do Mongoose (`ValidationError`, `CastError`, `DocumentNotFoundError`), do Celebrate e de duplicidade (código 11000) para respostas HTTP consistentes
- Separação de dados de UI e dados analíticos no schema de perfume (`mainFamily`/`mainOccasion`/`mainClimate` para exibição; `families[]`/`occasions[]`/`olfactoryProfile` para lógica de recomendação)

---

## Variáveis de ambiente

```
MONGO_URI=       # string de conexão do MongoDB Atlas
PORT=            # porta em que o servidor vai rodar
JWT_SECRET=      # segredo usado para assinar os tokens JWT
WEATHER_API_KEY= # chave de API da WeatherAPI
```

---

## Autor

Rafael Guanciale Nacarato
