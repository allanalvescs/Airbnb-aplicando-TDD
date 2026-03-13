# Sistema de Reservas de Propriedades - TDD

Sistema de reservas de propriedades inspirado em plataformas como Airbnb, desenvolvido aplicando práticas de **Test-Driven Development (TDD)** e **Clean Architecture**.

## 📋 Sobre o Projeto

Este projeto implementa um sistema que permite aos usuários:

- **Reservar propriedades** para períodos específicos
- **Cancelar reservas** com políticas de reembolso diferenciadas
- **Validar disponibilidade** de propriedades
- **Calcular preços** com descontos automáticos para estadias longas

### Funcionalidades Principais

#### 🏠 Realizar Reservas
- Reserva de propriedades para períodos específicos
- Validação de disponibilidade da propriedade
- Validação do número de hóspedes (máximo definido por propriedade)
- Cálculo automático do preço total
- **Desconto de 10%** para reservas de 7 ou mais noites
- Bloqueio automático da propriedade no período reservado

#### ❌ Cancelar Reservas
Políticas de reembolso baseadas na antecedência do cancelamento:
- **Mais de 7 dias antes do check-in**: Reembolso total (100%)
- **Entre 1 e 7 dias antes do check-in**: Reembolso parcial (50%)
- **Menos de 1 dia antes do check-in**: Sem reembolso (0%)

#### ✅ Validações
- Número de hóspedes deve ser maior que zero
- Número de hóspedes não pode exceder a capacidade máxima
- Propriedade deve estar disponível no período solicitado
- Impedimento de cancelamento de reservas já canceladas

## 🏗️ Arquitetura

O projeto segue os princípios de **Clean Architecture** com separação em camadas:

```
src/
├── domain/              # Regras de negócio
│   ├── entities/        # Entidades do domínio (User, Property, Booking)
│   ├── value_objects/   # Objetos de valor (DateRange)
│   ├── repositories/    # Interfaces dos repositórios
│   └── cancelation/     # Regras de cancelamento e reembolso
├── application/         # Casos de uso
│   ├── service/         # Serviços de aplicação
│   └── dtos/           # Data Transfer Objects
└── infrastructure/      # Detalhes de implementação
    ├── persistence/     # Entidades TypeORM e mappers
    ├── repositories/    # Implementações dos repositórios
    └── web/            # Controllers e rotas HTTP
```

## 🛠️ Tecnologias Utilizadas

- **TypeScript** - Linguagem principal
- **Jest** - Framework de testes
- **TypeORM** - ORM para persistência de dados
- **SQLite** - Banco de dados (para testes e desenvolvimento)
- **Express** - Framework web
- **Supertest** - Testes de integração HTTP
- **UUID** - Geração de identificadores únicos

## 📦 Pré-requisitos

- **Node.js** >= 16.x
- **npm** ou **yarn**

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd TDD
```

2. Instale as dependências:
```bash
npm install
```

## 🧪 Executando os Testes

O projeto possui três tipos de testes:

### Todos os Testes
```bash
npm test
```

### Testes Unitários (Entidades e Value Objects)
```bash
# Testes de entidades do domínio
npm test src/domain/entities

# Testes de objetos de valor
npm test src/domain/value_objects

# Exemplo: testar apenas a entidade Booking
npm test src/domain/entities/booking.test.ts
```

### Testes de Serviço (Application Layer)
```bash
# Todos os serviços
npm test src/application/service

# Serviço específico
npm test src/application/service/booking_service.test.ts
npm test src/application/service/property_service.test.ts
npm test src/application/service/user_service.test.ts
```

### Testes de Repositório (Integração com TypeORM)
```bash
# Todos os repositórios
npm test src/infrastructure/repositories

# Repositório específico
npm test src/infrastructure/repositories/booking/typeorm_booking_repository.test.ts
npm test src/infrastructure/repositories/property/typeorm_property_repository.test.ts
npm test src/infrastructure/repositories/user/typeorm_user_repository.test.ts
```

### Testes E2E (End-to-End)
```bash
# Todos os testes E2E
npm test src/infrastructure/web

# Controller específico
npm test src/infrastructure/web/booking_controller_e2e.test.ts
npm test src/infrastructure/web/property_controller_e2e.test.ts
npm test src/infrastructure/web/user_controller_e2e.test.ts
```

### Executar um Teste Específico
```bash
# Por nome do teste
npm test -- -t "deve criar uma propriedade com sucesso"

# Por arquivo e nome do teste
npm test src/infrastructure/web/property_controller_e2e.test.ts -t "deve criar uma propriedade com sucesso"
```

### Executar Testes em Modo Watch
```bash
npm test -- --watch
```

### Executar Testes com Cobertura
```bash
npm test -- --coverage
```

## 📝 Convenções de Teste

### Nomenclatura
- Arquivos de teste: `*.test.ts`
- Padrão de descrição: `deve [ação] [contexto]`

### Exemplos de Testes
```typescript
// ✅ Bom
it('deve criar uma reserva com sucesso')
it('deve lançar erro quando propriedade não está disponível')
it('deve aplicar desconto de 10% para reservas de 7 noites ou mais')

// ❌ Evitar
it('test booking')
it('should work')
```

### Estrutura dos Testes
- **Arrange**: Preparar dados e mocks
- **Act**: Executar a ação
- **Assert**: Verificar o resultado

## 🔧 Configurações

### Jest (jest.config.js)
```javascript
{
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"]
}
```

### TypeScript (tsconfig.json)
Configuração otimizada para Node.js com decorators habilitados para TypeORM.

## 🐛 Debug de Testes

### No VS Code
1. Instale a extensão **Jest** ou **Jest Runner**
2. Clique no botão ▶️ ao lado de cada teste
3. Use o botão 🐛 para debug com breakpoints

### Por Linha de Comando
```bash
# Com node inspector
node --inspect-brk node_modules/.bin/jest --runInBand [arquivo-de-teste]
```

## 📚 Estrutura de Entidades

### User (Usuário)
- `id`: string (UUID)
- `name`: string
- `email`: string

### Property (Propriedade)
- `id`: string (UUID)
- `title`: string
- `description`: string
- `maxGuests`: number
- `basePricePerNight`: number
- `bookings`: Booking[]

### Booking (Reserva)
- `id`: string (UUID)
- `property`: Property
- `guest`: User
- `dateRange`: DateRange
- `guestCount`: number
- `totalPrice`: number
- `status`: 'CONFIRMED' | 'CANCELLED'

## 🤝 Contribuindo

Este projeto foi desenvolvido com foco em aprendizado de TDD. Sinta-se livre para:
- Adicionar novos casos de teste
- Melhorar a cobertura de testes
- Refatorar código mantendo os testes verdes
- Adicionar novas funcionalidades seguindo TDD

## 📄 Licença

ISC

---

**Desenvolvido aplicando Test-Driven Development (TDD)** 🧪
