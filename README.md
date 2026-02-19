# **🎫 Sistema de Vendas de Ingressos**

Aplicação de Vendas de Ingressos (Tickets) desenvolvida em Java utilizando o *framework* **Spring Boot**, **Docker** e arquitetura de **microsserviços**.

## Tecnologias Utilizadas
- Java 17.x
- Spring Boot 3.5.8
- Spring Web
- Spring JPA
- React.js
- Docker

## Endpoints da Aplicação
> Base URLs:
```
  Users Service: http://localhost:3000
  Events & Sales Service: http://localhost:4000
```
### 🎟️ Event
```bash
POST   /events
GET    /events
GET    /events/{id}
PUT    /events/{id}
DELETE /events/{id}
```

### 🛍️ Sales
```bash
POST   /sales
GET    /sales
GET    /sales/{id}
PUT    /sales/{id}      # Atualizar status
DELETE /sales/{id}
```

### 👤 Users
```bash
# Users
GET    /users
GET    /users/{id}
GET    /users/name/{name}
POST   /users
PUT    /users
DELETE /users

# Credit Card Network (CCN)
GET    /ccn
POST   /ccn
```

