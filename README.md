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
<img src="Preview/diagrama-er-TFC.png" alt="page3" width="100%" height="500"/>

## EndPoints
<details>
  <summary>Teams GET</summary>
    - /teams com resposta com um `json` contendo o retorno no seguinte modelo:
  
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
  
- /teams/:id retorna um time específico no seguinte formato:
  
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
  <summary></summary>
</details>

## Entre em contato:
<a href="mailto:zazac3179@gmail.com" target="_blank">
  <img align="center" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="E-mail" height="40" width="auto" />
</a>
<a href="https://www.linkedin.com/in/isaque-s-oliveira/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="isaque oliveira" height="30" width="40" /></a>
