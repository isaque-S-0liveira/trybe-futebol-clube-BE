# Trybe Futebol Clube

<details>
  <summary>Preview</summary>
  <div style="display:flex; justify-content:center;  align-items:center; width="100%">
  <img src="Preview/front-example.png" alt="page3" width="100%" height="500"/>
  </div>
</details>
    
## Contexto
O TFC é um site informativo sobre partidas e classificações de futebol!

 O projeto é um site informativo sobre um campeonato de futebol que contém classificações e tabelas de jogos. O front-end fornece as informações que são enviadas ao back-end por meio de uma API e posteriormente armazenadas no banco de dados. Fui responsável pelo desenvolvimento de todo o back-end e banco de dados, enquanto o front-end foi desenvolvido pela equipe Trybe.

## Diagrama de entidade e relacionamento
<details>
  <summary>Ver diagrama</summary>

  <img src="Preview/diagrama-er-TFC.png" alt="page3" width="100%" height="500"/>
</details>

## EndPoints
<details>
  <summary>Teams</summary>
  
  - /teams rota do tipo `GET` com resposta com um `json` contendo o retorno no seguinte modelo:
  
```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  ...
]
```
  
- /teams/:id rota do tipo `GET` que retorna um time específico no seguinte formato:
  
```json
{
  "id": 5,
  "teamName": "Cruzeiro"
}
```
</details>

<details>
  <summary>Users</summary>
<details>
  <summary>/login POST</summary>
  
 - /login com o body no seguinte formato:
  
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
 - Se o login foi feito com sucesso, o resultado retornado deverá ser similar ao exibido abaixo, com um status http `200`:

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
    }
    ```
<details>
  <summary>Casos de erro no login</summary>
  - Se o login não tiver o campo "email", o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:

  ```json
    { "message": "All fields must be filled" }
  ```

  - Se o login não tiver o campo "password", o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:

    ```json
    { "message": "All fields must be filled" }
    ```

- Se o login tiver o "email" **inválido** ou a "senha" **inválida**, o resultado retornado será similar ao exibido abaixo, com um status http `401`:

  ```json
    { "message": "Invalid email or password" }
  ```

</details>
</details>

  <details>
  <summary>/login/role GET</summary>
    
  - recebe um `header` com parâmetro `authorization`, onde ficará armazenado o token gerado no login;

  - Caso o token não seja informado, é retornado o status `401` e a seguinte mensagem:

  ```json
  { "message": "Token not found" }
  ```

  - Caso o token informado não seja válido, é retornado o status `401` e a seguinte mensagem:

  ```json
  { "message": "Token must be a valid token" }
  ```

  A resposta é o status `200` com um `objeto` contendo a `role` do *user*:
  ```json
    { "role": "admin" }
  ```

  </details>

</details>

<details>
  <summary>Matches</summary>
  <details>
    <summary>/matches GET</summary>
    
  -  Retorna uma lista de partidas. Exemplo de retorno:
    
  ```json
    [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      }
    ]
  ```
  </details>

  <details>
  <summary>/matches POST</summary>
    
  - O usuário precisa ter um role de administrador para salvar uma nova partida.
    
  - O corpo da requisição tem o seguinte formato:

  ```json
  {
    "homeTeamId": 16, // O valor deve ser o id do time
    "awayTeamId": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
  }
  ```
</details>

<details>
  <summary>/matches/:id PATCH</summary>
  
  - O usuário precisa ter um role de administrador para salvar uma nova partida.
    
  - Altera o resultado de uma partida.
  
  - O body da requisição tem o seguinte formato:
  
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```
</details>


</details>




<details>
  <summary>Leaderboards (Placares)</summary>
  <details>
    <summary>/leaderboards</summary>
     ▶️ A classificação dos times, segue as seguintes regras de negócios:

    - `Classificação`: Posição na classificação;
    - `Time`: Nome do time;
    - `P`: Total de Pontos;
    - `J`: Total de Jogos;
    - `V`: Total de Vitórias;
    - `E`: Total de Empates;
    - `D`: Total de Derrotas;
    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos;
    - `SG`: Saldo total de gols;
    - `%`: Aproveitamento do time.

    <br/>

  - Para calcular o `Total de Pontos`, foi levado em consideração que:

    - O time `vitorioso`: marcará +3 pontos;
    - O time `perdedor`: marcará 0 pontos;
    - Em caso de `empate`: ambos os times marcam +1 ponto.

  - Para o campo `Aproveitamento do time (%)`, que é a porcentagem de jogos ganhos, use a seguinte fórmula: `[P / (J * 3)] * 100`, onde:

    - `P`: Total de Pontos;
    - `J`: Total de Jogos.

    Obs.: O seu resultado deverá ser limitado a `duas casas decimais`.

  - Para calcular `Saldo de Gols` use a seguinte fórmula: `GP - GC`, onde:

    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos.

  - O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no `Total de Pontos`, você deve levar em consideração os seguintes critérios para desempate:

  **Ordem para desempate**

  - 1º Total de Vitórias;
  - 2º Saldo de gols;
  - 3º Gols a favor;

**Exemplo de retorno:**

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": 86.67
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": 80
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": 73.33
  },
  ...
]
```
  </details>
  <details>
  <summary>/leaderboard/home</summary>
    
  - Retorna informações de desempenho dos times da casa
  </details>

   <details>
  <summary>/leaderboard/away</summary>
    
  - Retorna informações de desempenho dos times visitantes
  </details>
</details>

## Habilidades demonstradas:

- Docker: Utilizando Containers.
- Node.js: ORM e Autenticação.
- Programação Orientada a Objetos (POO) e SOLID.

## Tecnologias utilizadas:

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/) - É um framework de desenvolvimento web leve que oferece recursos robustos e permite uma implantação rápida. É uma boa opção para criar back-ends escalonáveis, fáceis de manter e de alto desempenho.
- [ORM Sequelize](https://sequelize.org/) - O Sequelize é um Object-Relational Mapping (ORM) para Node.js que permite a criação de modelos em JavaScript ou TypeScript para representar as tabelas de um banco de dados.
- [MySql](https://www.mysql.com/) - O MySQL é um sistema de gerenciamento de banco de dados relacional (SGBD) de código aberto e gratuito, que é usado para armazenar, organizar e recuperar dados.
- [bcryptjs](https://dev.to/mr_walkr/password-hashing-in-nodejs-using-bcryptjs-library-3j56) - Bcrypt é uma biblioteca de criptografia de senhas que foi projetada para ser usada com o Node. js, uma plataforma de desenvolvimento de aplicativos em JavaScript. Ele fornece uma maneira fácil de armazenar senhas de forma segura, usando um algoritmo de hash forte e uma técnica chamada “salting”.
- [JWT](https://jwt.io/introduction) - O JWT (JSON Web Token) é uma forma de autenticação que permite que um servidor verifique a identidade de um usuário sem precisar armazenar informações sobre ele.
- [joi](https://joi.dev/api/?v=17.13.3) - Validações em APIs
- [Chai](https://www.chaijs.com/api/bdd/) - O chai é uma biblioteca de asserção que auxilia o desenvolvimento de testes com Node.js e que pode ser combinada com qualquer framework de testes JavaScript.
- [Mocha](https://mochajs.org/) - O mocha é um framework de testes para JavaScript, isso significa que ele nos ajuda a arquitetar os nossos testes fornecendo a estrutura e interface para escrevermos e executarmos eles.
- [sinon](https://sinonjs.org/) - O Sinon é uma ferramenta que auxilia na criação e utilização dos dublês, fornecendo funções para diversos tipos de Test Doubles.

## Entre em contato:
<a href="mailto:zazac3179@gmail.com" target="_blank">
  <img align="center" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="E-mail" height="40" width="auto" />
</a>
<a href="https://www.linkedin.com/in/isaque-s-oliveira/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="isaque oliveira" height="30" width="40" /></a>
