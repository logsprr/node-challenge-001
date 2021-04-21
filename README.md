# Jungle Devs - Node Challenge #001 By Gabriel

## Description

**Challenge goal**: The purpose of this challenge is to show my skills using Node Js App with Typescript Language.

**Target level**: This development was made by a Medium Software Engineer.

## Routes

- Login API: `/api/login`
- Sign-up API: `/api/sign-up`
- Administrator restricted APIs:
  - CRUD `/api/admin/authors`
  - CRUD `/api/admin/articles`
- List article endpoint `/api/articles?category=:slug`

```json
[
  {
    "author": {
      "name": "Author Name",
      "picture": "https://picture.url"
    },
    "category": "Category",
    "title": "Article title",
    "summary": "This is a summary of the article"
  },
  ...
]
```

- Article detail endpoint `/api/articles/:id` with different responses for anonymous and logged users:

  **Anonymous**

  ```json
  {
    "author": {
      "name": "Author Name",
      "picture": "https://picture.url"
    },
    "category": "Category",
    "title": "Article title",
    "summary": "This is a summary of the article",
    "firstParagraph": "<p>This is the first paragraph of this article</p>"
  }
  ```

  **Logged user**

  ```json
  {
    "author": {
      "name": "Author Name",
      "picture": "https://picture.url"
    },
    "category": "Category",
    "title": "Article title",
    "summary": "This is a summary of the article",
    "firstParagraph": "<p>This is the first paragraph of this article</p>",
    "body": "<div><p>Second paragraph</p><p>Third paragraph</p></div>"
  }
  ```

## Instructions to Run

- Database: `docker-compose up` will start the PostgreSQL DB, and is necessary to install [Docker](https://docs.docker.com/engine/install/).
- To run as `production` or `development`, if need to edit a .env in `root` directory(look the env keys correctly).
- `yarn dev` is configured to start the `index.ts` using ts-node and nodemon in `development mode`.
- `yarn production` is configured to start the `dist/index.ts` using a node in `production mode`.

## Env Var's

- `KEYCHALLENGE` = The key is used for jsonwebtoken.
- `NODE_ENV` = The env of App.
- `DB_HOST` = The host of your database.
- `DB_USER` = The user of your database.
- `DB_PASSWORD` = The passord of your database.
- `DB_NAME` = The name of your database.
- `DB_PORT` = The port of your database.
