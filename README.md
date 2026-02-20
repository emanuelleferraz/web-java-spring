# **🎫 Sistema de Vendas de Ingressos**

Aplicação de Vendas de Ingressos (Tickets) desenvolvida em Java utilizando o *framework* **Spring Boot**, **Docker** e arquitetura de **microsserviços**. Desenvolvido na discplina de **CSI607 - Sistemas Web II**.

## 🛠️ Tecnologias Utilizadas
- Java 17.x
- Spring Boot 3.5.8
- Spring Web
- Spring JPA
- React.js
- Docker
- PostgreSQL

## 🏗️ Arquitetura de Microsserviços
O ecossistema é composto por 4 serviços principais:
- **Users Service**: Gestão de usuários e autenticação.
- **Sales Service**: Regras de negócio para eventos e vendas de ingressos.
- **Gateway (Spring Cloud Gateway)**: Ponto único de entrada, roteamento e segurança.
- **Nameserver (Eureka)**: Descoberta de serviços para comunicação inter-serviços.

## 🔗 Endpoints da Aplicação
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

## 🚀 Como Executar
1. Certifique-se de ter o **Docker** e **Java** instalado.
2. Na raiz do projeto, execute:
   ```bash
   docker-compose up --build
3. Os seguintes serviços estarão disponíveis, inicialize-os:
- Nameserver
- Users
- Sales
- Gateway
4. O frontend está disponível em:
```http request
http://localhost:5173
```
5. O nameserver está disponível em:
```http request
http://localhost:8761
```
6. API Gateway:
```http request
http://localhost:8080/api
```

