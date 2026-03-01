# Mobile Tests - Appium

Projeto de automação de testes mobile utilizando **Appium** com **WebdriverIO** e relatórios **Allure Reports**.

## Tecnologias

| Ferramenta | Finalidade |
|------------|------------|
| Appium 2.x | Framework de automação mobile |
| WebdriverIO 8.x | Test runner e integração com Appium |
| UiAutomator2 | Driver Android para Appium |
| TypeScript | Linguagem dos testes |
| Mocha | Framework de testes |
| Allure Reports | Relatórios detalhados |
| GitHub Actions | CI/CD com emulador Android |

## Estrutura do Projeto

```
mobile-tests-appium/
├── .github/workflows/ci.yml     # Pipeline CI/CD
├── tests/
│   ├── specs/
│   │   ├── login.spec.ts        # Tarefa 1: Login + Navegação
│   │   └── form.spec.ts         # Tarefa 2: Formulário + Envio
│   └── screenobjects/
│       ├── AppScreen.ts          # Classe base (Screen Object)
│       ├── LoginScreen.ts        # Tela de Login/Cadastro
│       ├── HomeScreen.ts         # Tela Home
│       ├── FormsScreen.ts        # Tela de Formulários
│       ├── SwipeScreen.ts        # Tela de Swipe
│       └── components/
│           └── TabBar.ts         # Componente de navegação
├── apps/                         # APK do app de demonstração
├── scripts/
│   └── download-app.js           # Script para baixar o APK
├── wdio.conf.ts                  # Configuração WebdriverIO + Appium
├── package.json
├── tsconfig.json
└── README.md
```

## Cenários de Teste

### Tarefa 1: Login, Navegação e Validação (`login.spec.ts`)

| Cenário | Severidade | Descrição |
|---------|-----------|-----------|
| Login com credenciais válidas | Blocker | Preenche email e senha, verifica mensagem de sucesso |
| Login com email inválido | Critical | Tenta login com email em formato inválido |
| Login com senha curta | Critical | Tenta login com senha abaixo do mínimo |
| Login com campos vazios | Normal | Tenta login sem preencher os campos |
| Navegação para tela Home | Normal | Navega e valida exibição da Home |
| Navegação para tela Swipe | Normal | Navega e valida exibição do Swipe |
| Navegação sequencial entre telas | Normal | Percorre Home → Login → Swipe → Home |
| Navegação pós-login | Blocker | Login + navegação validando cada tela |

### Tarefa 2: Formulário e Envio de Dados (`form.spec.ts`)

| Cenário | Severidade | Descrição |
|---------|-----------|-----------|
| Preencher campo de texto | Blocker | Digita texto e valida resultado exibido |
| Caracteres especiais no input | Normal | Verifica aceitação de caracteres especiais |
| Alternar switch | Normal | Toggle ON/OFF e valida estado |
| Selecionar opção no dropdown | Normal | Abre dropdown e seleciona item |
| Clicar botão Active | Normal | Interage com botão e valida resposta |
| Formulário completo | Blocker | Preenche todos os campos e valida |
| Cadastro com dados válidos | Blocker | Sign Up com email, senha e confirmação |
| Cadastro com senhas diferentes | Critical | Verifica erro quando senhas não coincidem |
| Cadastro com email inválido | Normal | Verifica validação de formato de email |
| Cadastro com senha fraca | Normal | Verifica validação de senha curta |

## Pré-requisitos

- **Node.js** 18+ ([download](https://nodejs.org/))
- **Java JDK** 11+ ([download](https://adoptium.net/))
- **Android SDK** com emulador configurado
- **Android Studio** (recomendado) ou Android SDK Command Line Tools

### Configurar Android SDK

```bash
# Variáveis de ambiente necessárias
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

### Criar emulador Android

```bash
sdkmanager "system-images;android-30;google_apis;x86_64"
avdmanager create avd -n Pixel_5_API_30 -k "system-images;android-30;google_apis;x86_64" -d pixel_5
```

## Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Baixar o app de demonstração
npm run download:app

# 3. O driver UiAutomator2 é instalado automaticamente via postinstall
```

## Executar Testes

```bash
# Iniciar o emulador Android (em outro terminal)
emulator -avd Pixel_5_API_30

# Executar todos os testes
npm run test:android

# Executar apenas testes de login
npm run test:android:login

# Executar apenas testes de formulário
npm run test:android:form
```

## Allure Reports

```bash
# Gerar e abrir relatório
npm run allure:report

# Ou separadamente:
npm run allure:generate  # Gera o relatório
npm run allure:open      # Abre no navegador
```

### Estrutura do Relatório Allure

```
Epic: Mobile
├── Feature: Login
│   ├── Story: Login Válido
│   └── Story: Login Inválido
├── Feature: Navegação
│   ├── Story: Navegação Home
│   ├── Story: Navegação Swipe
│   ├── Story: Navegação Sequencial
│   └── Story: Navegação Pós-Login
├── Feature: Formulário
│   ├── Story: Input de Texto
│   ├── Story: Switch
│   ├── Story: Dropdown
│   ├── Story: Botão
│   └── Story: Formulário Completo
└── Feature: Cadastro
    ├── Story: Cadastro Válido
    └── Story: Cadastro Inválido
```

## CI/CD

O pipeline GitHub Actions executa automaticamente a cada push na branch `main`:

1. Configura Node.js, Java e Android SDK
2. Inicia emulador Android (API 30, Pixel 5)
3. Baixa o APK de demonstração
4. Executa todos os testes com Appium
5. Gera o Allure Report
6. Publica no GitHub Pages

### Variáveis de Ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `DEVICE_NAME` | `emulator-5554` | Nome do dispositivo/emulador |
| `PLATFORM_VERSION` | `13` | Versão do Android |
| `APP_PATH` | `./apps/wdio-demo-app.apk` | Caminho do APK |

## App de Demonstração

Este projeto utiliza o [WebdriverIO Native Demo App](https://github.com/webdriverio/native-demo-app), um aplicativo React Native de demonstração com:

- Tela de Login e Cadastro
- Formulários com inputs, switches e dropdowns
- Navegação por tabs
- Funcionalidades de swipe e drag

## Padrões Utilizados

- **Screen Object Model**: Abstração das telas do app em classes TypeScript
- **Component Pattern**: Componentes reutilizáveis (TabBar)
- **Accessibility ID Selectors**: Locators nativos via accessibility IDs (`~selector`)
- **Allure Annotations**: Epic/Feature/Story para organização hierárquica
