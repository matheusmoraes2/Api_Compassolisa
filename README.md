<h1 align="center">
      <a href="#" alt="Compassolisa"> Compassolisa💻</a>
</h1>




## Sobre o Projeto 

<h3 align="center">
  API para aluguel de carros, esta API permite que você faça o cadastro de vários carros, podendo fazer especificações de modelo, cor, acessorios e etc. Também é possivel 
  cadastrar pessoas registrando seu nome, cpf, email e etc.
</h3>




## Como usar a API ❓

### Pré-requisitos 
> Para usar esta API é preciso instalar as seguintes ferramentas:
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com)
> Para editar o código eu recomendo: 
- [VSCode](https://code.visualstudio.com/)
> Para testar as rotas você pode usar:
- [Postman](https://www.postman.com)


### 👨‍💻 Rodando o Back End (servidor)

```bash
# Clone este repositório
 git clone https://github.com/matheusmoraes2/Api_Compassolisa.git

# Acesse a pasta do projeto 
 cd API_Compassolisa

# crie um arquivo .env seguindo o modelo do arquivo .env.exemplo e preencha os campos

# Instale as dependências
 npm i

# Execute a aplicação 
 npm run start

# O servidor iniciará na porta: 3000 
```


### 📝 Rotas do projeto:
> Rotas de carros: `localhost:3000/api/v1/car`

> Rotas de pessoas: `localhost:3000/api/v1/people`

> Rota de login: `localhost:3000/api/v1/authenticate`

### 🚗 ROTAS DE CARROS
### REQUEST - (POST)
> Para cadastrar carros.

> POST - `localhost:3000/api/v1/car`

Exemplo de body:
```json
{

    "modelo": "GM S10 2.8",
    "cor": "branco",
    "ano": "2021",
    "acessorios": [
    { "descricao": "Ar-condicionado" },
    { "descricao": "Dir. Hidráulica" },
    { "descricao": "Cabine Dupla" },
    { "descricao": "Tração 4x4" },
    { "descricao": "4 portas" },
    { "descricao": "Diesel" },
    { "descricao": "Air bag" },
    { "descricao": "ABS" }
    ],
    "quantidadePassageiros": 5
    
}
```


### REQUEST - (GET)

> Para listar todos os carros.

> GET - `localhost:3000/api/v1/car`

Exemplo de query:
```json

{

    "modelo": "GM S10 2.8",
    "cor": "branco",
    "acessorio": "4 portas",
    "ano": "2020",
    "quantidadePassageiros": 5

}

```


### REQUEST - (PUT)

> Para atualizar um carro.

> PUT - `localhost:3000/api/v1/car/:id`

Exemplo de body:
```json
{
 
    "modelo": "GM S10 2.8",
    "cor": "branco",
    "acessorios": [
    { "descricao": "Ar-condicionado" },
    { "descricao": "Dir. Hidráulica" }
    ]
}
```


### REQUEST - (DELETE)

> Para deletar um carro .

> DELETE - ` localhost:3000/api/v1/car/:id`


### REQUEST - (GET)

> Para Buscar um carro por id

> GET - `localhost:3000/api/v1/car/:id`

Exemplo de retorno:
```json
{
 
    "_id": "61f014ee47702afdee414f78",
    "modelo": "GM S10 2.8",
    "cor": "branco",
    "ano": "2021",
    "acessorios": [
        {
            "descricao": "Ar-condicionado"
        },
        {
            "descricao": "Dir. Hidráulica"
        },
        {
            "descricao": "Cabine Dupla"
        },
        {
            "descricao": "Tração 4x4"
        },
        {
            "descricao": "4 portas"
        },
        {
            "descricao": "Diesel"
        },
        {
            "descricao": "Air bag"
        },
        {
            "descricao": "ABS"
        }
    ],
    "quantidadePassageiros": 5

}
```

### 🧍‍♀️🧍 ROTAS DE PESSOAS
### REQUEST - (POST) 
> Para cadastrar uma pessoa.

> POST - ` localhost:3000/api/v1/people`

Exemplo de body:
```json

{

"nome": "joaozinho ciclano",
"cpf": "131.147.860-49",
"data_nascimento": "03/03/2021",
"email": "joazinho@email.com",
"senha": "123456",
"habilitado": "sim"

}

```


### REQUEST - (GET) 
> Para listar todas as pessoas.

> GET - `localhost:3000/api/v1/people`

- Todos os campos podem ser usados em buscas por query.


### REQUEST - (PUT)
> Para atualizar um registro de pessoa.

> PUT - `localhost:3000/api/v1/people/:id`

Exemplo de body:
```json

{

"nome": "matheus moraes",
"habilitado": "não"

}

```


### REQUEST - (DELETE)

> Para deletar um registro de pessoa.

> DELETE - `localhost:3000/api/v1/people/:id`


### REQUEST - (GET)

> Para buscar uma pessoa por id.

> GET - `localhost:3000/api/v1/people/:id`

Exemplo de retorno:
```json

{

    "_id": "61f2b8c5bee11d93722be472",
    "nome": "joaozinho ciclano",
    "cpf": "131.147.860-49",
    "data_nascimento": "03/03/2000",
    "email": "joazinho@email.com",
    "senha": "123456",
    "habilitado": "sim"
}

```
### 🏷 ROTA DE LOGIN
### REQUEST - (POST)

> Para fazer login e receber um token JWT.

> POST - `localhost:3000/api/v1/authenticate`

Exemplo de body:
```json

{

    "email": "joazinho@email.com",
    "senha": "123456"
    
}

```

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Postman](https://pt-br.reactjs.org/)
- [MongoDB](https://www.mongodb.com)
- [mongoose](https://mongoosejs.com)
- [express](http://expressjs.com/)


# 🧙 Agradecimentos

<table>
    <tr>
        <td><a href="" >Felipe Silva</td>
        <td><a href="" >Bruna Santos</td>
        <td><a href="" >Thais Nicodemus</td>
    </tr>
    <tr>
        <td><a href="" >Diego Bueno</td>
        <td><a href="" >Gabriel Missio</td>
        <td><a href="" >Giovanni Hoffmann</td>
    </tr>
</table>


