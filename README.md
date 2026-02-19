# **🎫 Sistema de Vendas de Ingressos**

Aplicação de Vendas de Ingressos (Tickets) desenvolvida em Java utilizando o *framework* **Spring Boot**, **Docker** e arquitetura de **microsserviços**. Desenvolvido na discplina de **CSI607 - Sistemas Web II**.

## Tecnologias Utilizadas
- Java 17.x
- Spring Boot 3.5.8
- Spring Web
- Spring JPA
- React.js
- Docker
- PostgreSQL

## Estrutura de Microsserviços
```bash         
└── tickets/
    ├── users/          
    ├── sales/       
    ├── gateway/           
    └── nameserver/             
```

## Endpoints da Aplicação
> Base URLs:
```
  Users Service: http://localhost:3000
  Events & Sales Service: http://localhost:4000
```
### 🎟️ Event
```http request
POST   /events
GET    /events
GET    /events/{id}
PUT    /events/{id}
DELETE /events/{id}
```

### 🛍️ Sales
```http request
POST   /sales
GET    /sales
GET    /sales/{id}
PUT    /sales/{id}      # Atualizar status
DELETE /sales/{id}
```

### 👤 Users
```http request
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

