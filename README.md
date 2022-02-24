<h1 align="center">
      <a href="#" alt="Compassolisa"> Compassolisa💻</a>
</h1>


## Sobre o Projeto 

<h3 align="center">
  API para aluguel de carros, esta API permite que você faça o cadastro de vários carros, podendo fazer especificações de modelo, cor, acessorios e etc. Também é possivel 
  cadastrar pessoas registrando seu nome, cpf, email e Locadoras registrando seu endereço, nome e CNPJ.
</h3>

## Índice
<!--ts-->
   * [Sobre o Projeto](#sobre-o-projeto)
   * [Como usar a API ❓](#como-usar-a-api-)
   * [👨‍💻 Rodando o Back End (servidor)](#-rodando-o-back-end-servidor)
   * [📝 Rotas do projeto](#-rotas-do-projeto)
   * [🚗 ROTAS DE CARROS](#-rotas-de-carros)
   * [🧍‍♀️🧍 ROTAS DE PESSOAS](#%EF%B8%8F-rotas-de-pessoas)
   * [🏷 ROTA DE LOGIN](#-rota-de-login)
   * [👨‍💼 ROTA DE LOCADORA](#-rota-de-locadora)
   * [🌐 Deploy](#-deploy)
   * [🛠 Tecnologias](#-tecnologias)
   * [🧙 Agradecimentos](#-agradecimentos)
<!--te-->


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
 onde o DB_PORT é a porta, DB_PATHDB é o caminho do seu banco de dados e SECRET é a chave de criptografia 

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

>Rota de locadora: `localhost:3000/api/v1/rental`

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
### REQUEST - (PATCH)

> Para atualizar um acessorio especifico .

> PATCH - ` localhost:3000/api/v1/car/:id/acessorios/:idAcessorio`
Exemplo de body:
```json
{
    "descricao": "4 portas"
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
### 👨‍💼 ROTA DE LOCADORA
### REQUEST - (POST)
> Para cadastrar uma locadora.

> POST - ` localhost:3000/api/v1/rental`

Exemplo de body:
```json

{
"nome": "Localiza Rent a Car",
"cnpj": "16.670.085/0001-55",
"atividades": "Aluguel de Carros E Gestão de Frotas",
"endereco": [
{
"cep": "96200-200",
"number":"1234",
"isFilial": false
},
{
"cep": "96200-500",
"number":"5678",
"complemento": "Muro A",
"isFilial": true
}
]
}

```
### REQUEST - (GET) 
> Para listar todas as locadoras.

> GET - `localhost:3000/api/v1/rental`

- Todos os campos podem ser usados em buscas por query.

### REQUEST - (PUT)
> Para atualizar um registro de locadora.

> PUT - `localhost:3000/api/v1/rental/:id`

- Todos os campos podem ser atualizados

### REQUEST - (DELETE)

> Para deletar um registro de locadora.

> DELETE - `localhost:3000/api/v1/rental/:id`


### REQUEST - (GET)

> Para buscar uma locadora por id.

> GET - `localhost:3000/api/v1/rental/:id`
Exemplo de retorno:
```json

{

   "_id": "620fc4febd69c4741992d016",
    "nome": "Teste Locadora de carros",
    "cnpj": "16.670.985/5501-55",
    "atividades": "Aluguel de Carros E Gestão de Frotas",
    "endereco": [
        {
            "cep": "50640-430",
            "number": "5258",
            "isFilial": false,
            "logradouro": "Rua Tumiritinga",
            "bairro": "Torrões",
            "localidade": "Recife",
            "uf": "PE",
            "_id": "620fc4febd69c4741992d017"
        },
        {
            "cep": "96200-200",
            "number": "5258",
            "isFilial": true,
            "logradouro": "Rua General Canabarro",
            "bairro": "Centro",
            "localidade": "Rio Grande",
            "uf": "RS",
            "_id": "620fc4febd69c4741992d018"
        }
    ],
}

```

### 🌐 Deploy
 > O deploy foi feito utilizando o heroku para a hospedagem da aplicação.
 - Link para o site da aplicação: `https://compassolisa-matheus.herokuapp.com/api/v1/swagger-docs/`
  
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


