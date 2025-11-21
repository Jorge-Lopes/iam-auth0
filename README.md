# IAM Auth0 Demo

This project is a **server-side web application** built with **Node.js**, **Express**, **PostgreSQL**, and **Auth0**.
Its purpose is to **explore Identity & Access Management (IAM)** concepts such as authentication, authorization, role-based access control (RBAC), user profile handling, and integration with external IAM providers.

The codebase demonstrates:

* Using **Auth0** for user authentication (OIDC)
* Protecting API routes using `express-openid-connect`
* Implementing **custom RBAC** (role checks) using Auth0 user metadata
* Synchronizing roles between **Auth0** and a **PostgreSQL** database
* Testing authenticated flows using **Postman**


## Features

### Authentication

* Implemented using **Auth0** and the `express-openid-connect` SDK
* Session-based login with cookies (`appSession`)

### Authorization (RBAC)

* Middleware (`verifyRole`) ensures that only users with specific roles can access certain resources
* Roles stored in:

  * Auth0 (as Authorization Core roles)
  * PostgreSQL (`users`, `roles`, `user_roles` tables)

### Example Protected Endpoints

| Endpoint       | Method | Description                     | Requirements                  |
| -------------- | ------ | ------------------------------- | ----------------------------- |
| `/api/profile` | GET    | Returns authenticated user info | Must be logged in             |
| `/api/role`    | POST   | Assigns a role to a user        | Must be **Admin**             |
| `/api/product` | POST   | Creates a product               | Must be **User**                |
| `/api/product` | GET    | Reads product info              | Must be **User** or **Partner** |

### Database Integration

* PostgreSQL connection via `pg` and connection pooling
* Role assignment saved in relational tables

### API Testing with Postman

* Collection included (`iam.postman_collection.json`)
* Demonstrates session cookies and OAuth2 flows


## Getting Started

Follow these steps to get the project running locally and integrate it with Auth0 and PostgreSQL.


### Clone the Repository and Install Dependencies

```sh
git clone <repository-url>
cd iam
npm install
```

### Set Up Auth0

1. Log in to [Auth0 Dashboard](https://auth0.com/).
2. Create a **Regular Web Application** for this project.
3. Create a **Machine-to-Machine Application** with **Management API** access.
4. Define roles under **Auth0 Authorization Core** (e.g., `Admin`, `User`, `Partner`).
5. Create a **Rule or Action** to expose roles in the ID token:


### Set Up PostgreSQL

1. **Install PostgreSQL** locally or use a hosted database.
2. **Create a database** for the project.
3. **Create the required tables** by running:

```sql
CREATE TABLE roles (
  roleID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  auth0ID VARCHAR(255) UNIQUE,
  name VARCHAR(100)
);

CREATE TABLE users (
  userID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  auth0ID VARCHAR(255) UNIQUE,
  name VARCHAR(100),
  email VARCHAR(255)
);

CREATE TABLE user_roles (
  userID INT,
  roleID INT,
  PRIMARY KEY (userID, roleID),
  FOREIGN KEY (userID) REFERENCES users(userID),
  FOREIGN KEY (roleID) REFERENCES roles(roleID)
);
```

4. **Populate sample data**:

```sql
INSERT INTO roles (auth0ID, name)
VALUES
('<auth0 role id>', 'Admin'),
('<auth0 role id>', 'User'),
('<auth0 role id>', 'Partner');

INSERT INTO users (auth0ID, name, email)
VALUES
('<auth0 user id>', '<auth0 user name>', '<auth0 user email>');

INSERT INTO user_roles (userID, roleID)
VALUES
(1, 1);  -- Assign 'Admin' role to first authenticated user
```

### Configure Environment Variables

Create a `.env` file in the root directory. 
You can use `example.env` as a template.

**Notes:**

* `CLIENT_ID`, `ISSUER_BASE_URL`, and `AUTH0_DOMAIN` come from your Auth0 Application settings.
* `AUTH0_MGMT_TOKEN` is a Management API token used to assign roles programmatically.
* `SECRET` is a random string used to sign session cookies.


### Start the Server

```sh
npm start
```

The server will run on:

```
http://localhost:3000
```


### Authenticate

1. Visit:

```
http://localhost:3000/login
```

2. Log in using your Auth0 credentials.
3. After login, access protected routes such as:

* `/` – Landing page or welcome message
* `/api/profile` – Authenticated user profile
* `/api/product` – Role-based access endpoints


### Test API with Postman

* Import the included `postman_collection.json` into Postman.
* Update session cookie value (`appSession`)

