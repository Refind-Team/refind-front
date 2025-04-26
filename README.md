# 🔍 ReFind Frontend - Sistema de Itens Perdidos e Encontrados (Frontend)

## 📋 Visão Geral

ReFind Frontend é a interface web responsiva do sistema de gestão de itens perdidos e encontrados. Desenvolvida como uma Single Page Application (SPA) em React, ela se conecta ao backend via API REST para oferecer uma experiência fluida e eficiente.

## 🛠️ Tecnologias Utilizadas

- **Framework**: React + Vite
- **Estilização**: Tailwind CSS
- **Gerenciamento de Rotas**: React Router DOM
- **HTTP Client**: Axios
- **Formulários**: React Hook Form + React IMask
- **Manipulação de Datas**: date-fns
- **Iconografia**: Lucide React

## 📚 Documentação

- Gerenciamento de estado de autenticação via Context API
- Integração com serviços de autenticação, categorias e itens

## 📁 Estrutura de Pastas

```
refind-front/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── pages/
│   │   ├── services/
│   │   └── hooks/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── validation/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🏗️ Arquitetura do Sistema

A aplicação segue uma arquitetura baseada em componentes, hooks e serviços:

- **Components**: Interfaces reutilizáveis (ItemCard, DeleteModal, EditModal, etc.)
- **Services**: Camada de comunicação com a API (Axios)
- **Hooks**: Regras de negócio locais e controle de estado personalizado
- **Context**: Gerenciamento global de autenticação

## 💾 Integração com Backend

A aplicação consome a API do backend ReFind, utilizando autenticação JWT para operações seguras.

## ✨ Funcionalidades Principais

### 📦 Gerenciamento de Itens
- Registro de itens perdidos ou encontrados
- Listagem e filtragem por categorias
- Atualização e exclusão de itens via modais

### 🏷️ Gerenciamento de Categorias
- Seleção dinâmica de categorias na criação de itens

### 🔐 Autenticação e Autorização
- Registro, login e esqueci minha senha
- Manutenção do token de sessão via Context API

### 👥 Perfil do Usuário
- Visualização e edição de informações de perfil

## ⚙️ Configuração do Ambiente

### Pré-requisitos
- Node.js
- npm ou yarn

### Variáveis de Ambiente

Crie um arquivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

### 🐛 Execução

```bash
# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Build de produção
npm run build

# Visualização do build
npm run preview
```

Acesse `http://localhost:5173`

## 👨‍💼 Como Contribuir

1. Fork este repositório
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: minha nova feature'`)
4. Push para sua branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto **ainda não possui** uma licença formal.
