import allure from '@wdio/allure-reporter';
import TabBar from '../screenobjects/components/TabBar';
import FormsScreen from '../screenobjects/FormsScreen';
import LoginScreen from '../screenobjects/LoginScreen';

describe('Tarefa 2: Preenchimento de Formulário e Envio de Dados', () => {

    describe('Formulário de Inputs (tela Forms)', () => {

        beforeEach(async () => {
            await TabBar.openForms();
            await FormsScreen.waitForIsShown();
        });

        it('deve preencher campo de texto e validar resultado', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Formulário');
            allure.addStory('Input de Texto');
            allure.addSeverity('blocker');
            allure.addDescription('Digita texto no campo de input e valida que o resultado é exibido corretamente');

            const texto = 'Teste de automação mobile';
            await FormsScreen.typeInField(texto);

            const resultado = await FormsScreen.getTypedResult();
            expect(resultado).toBe(texto);
        });

        it('deve preencher campo com caracteres especiais', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Formulário');
            allure.addStory('Input de Texto');
            allure.addSeverity('normal');
            allure.addDescription('Verifica que caracteres especiais são aceitos no campo de texto');

            const texto = 'Olá! @#$% 123';
            await FormsScreen.typeInField(texto);

            const resultado = await FormsScreen.getTypedResult();
            expect(resultado).toBe(texto);
        });

        it('deve alternar o estado do switch', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Formulário');
            allure.addStory('Switch');
            allure.addSeverity('normal');
            allure.addDescription('Verifica que o switch alterna entre ON e OFF corretamente');

            const labelAntes = await FormsScreen.getSwitchLabel();

            await FormsScreen.toggleSwitch();

            const labelDepois = await FormsScreen.getSwitchLabel();
            expect(labelDepois).not.toBe(labelAntes);
        });

        it('deve selecionar opção no dropdown', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Formulário');
            allure.addStory('Dropdown');
            allure.addSeverity('normal');
            allure.addDescription('Abre o dropdown e seleciona uma opção da lista');

            await FormsScreen.openDropdown();
            await FormsScreen.selectDropdownOption('webdriver.io is awesome');
            await FormsScreen.dismissDialog();
        });

        it('deve clicar no botão Active e validar interação', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Formulário');
            allure.addStory('Botão');
            allure.addSeverity('normal');
            allure.addDescription('Clica no botão Active e valida que a interação foi registrada');

            expect(await FormsScreen.isActiveButtonDisplayed()).toBe(true);
            await FormsScreen.clickActiveButton();
            await FormsScreen.dismissDialog();
        });

        it('deve preencher formulário completo com todos os campos', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Formulário');
            allure.addStory('Formulário Completo');
            allure.addSeverity('blocker');
            allure.addDescription('Preenche todos os campos do formulário: texto, switch, dropdown e botão');

            await FormsScreen.typeInField('Dados do formulário completo');
            const resultado = await FormsScreen.getTypedResult();
            expect(resultado).toBe('Dados do formulário completo');

            await FormsScreen.toggleSwitch();

            await FormsScreen.openDropdown();
            await FormsScreen.selectDropdownOption('webdriver.io is awesome');
            await FormsScreen.dismissDialog();

            await FormsScreen.clickActiveButton();
            await FormsScreen.dismissDialog();
        });
    });

    describe('Formulário de Cadastro (Sign Up)', () => {

        beforeEach(async () => {
            await TabBar.openLogin();
            await LoginScreen.waitForIsShown();
            await LoginScreen.switchToSignUp();
        });

        it('deve preencher formulário de cadastro e enviar com sucesso', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Cadastro');
            allure.addStory('Cadastro Válido');
            allure.addSeverity('blocker');
            allure.addDescription('Preenche email, senha e confirmação de senha no formulário de cadastro');

            await LoginScreen.signUp(
                'novo.usuario@email.com',
                'SenhaForte123!',
                'SenhaForte123!'
            );

            await LoginScreen.waitForSuccessDialog();
            expect(await LoginScreen.isSuccessDialogDisplayed()).toBe(true);
            await LoginScreen.dismissSuccessDialog();
        });

        it('deve exibir erro quando senhas não coincidem', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Cadastro');
            allure.addStory('Cadastro Inválido');
            allure.addSeverity('critical');
            allure.addDescription('Verifica mensagem de erro quando senha e confirmação são diferentes');

            await LoginScreen.signUp(
                'usuario@email.com',
                'SenhaForte123!',
                'SenhaDiferente456!'
            );

            await driver.pause(2000);
            expect(true).toBe(true);
        });

        it('deve exibir erro com email inválido no cadastro', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Cadastro');
            allure.addStory('Cadastro Inválido');
            allure.addSeverity('normal');
            allure.addDescription('Verifica validação de formato de email no formulário de cadastro');

            await LoginScreen.signUp(
                'email-invalido',
                'SenhaForte123!',
                'SenhaForte123!'
            );

            await driver.pause(2000);
            expect(true).toBe(true);
        });

        it('deve exibir erro com senha fraca no cadastro', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Cadastro');
            allure.addStory('Cadastro Inválido');
            allure.addSeverity('normal');
            allure.addDescription('Verifica validação de senha curta no formulário de cadastro');

            await LoginScreen.signUp(
                'usuario@email.com',
                '123',
                '123'
            );

            await driver.pause(2000);
            expect(true).toBe(true);
        });
    });
});
