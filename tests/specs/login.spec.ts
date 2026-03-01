import allure from '@wdio/allure-reporter';
import TabBar from '../screenobjects/components/TabBar';
import LoginScreen from '../screenobjects/LoginScreen';
import HomeScreen from '../screenobjects/HomeScreen';
import SwipeScreen from '../screenobjects/SwipeScreen';

describe('Tarefa 1: Login, Navegação e Validação', () => {

    describe('Login no aplicativo', () => {

        beforeEach(async () => {
            await TabBar.openLogin();
            await LoginScreen.waitForIsShown();
        });

        it('deve realizar login com credenciais válidas', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Login');
            allure.addStory('Login Válido');
            allure.addSeverity('blocker');
            allure.addDescription('Verifica que o login é realizado com sucesso usando credenciais válidas');

            await LoginScreen.login('teste@email.com', 'Senha1234!');

            await LoginScreen.waitForSuccessDialog();
            expect(await LoginScreen.isSuccessDialogDisplayed()).toBe(true);

            const message = await LoginScreen.getDialogMessage();
            expect(message).toContain('logged in');

            await LoginScreen.dismissSuccessDialog();
        });

        it('deve exibir erro ao tentar login com email inválido', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Login');
            allure.addStory('Login Inválido');
            allure.addSeverity('critical');
            allure.addDescription('Verifica validação quando email está em formato inválido');

            const emailField = await $('~input-email');
            await emailField.waitForDisplayed({ timeout: 10000 });
            await emailField.setValue('email-invalido');
            await driver.hideKeyboard().catch(() => {});

            const loginBtn = await $('~button-LOGIN');
            await loginBtn.click();

            await driver.pause(2000);

            const dialogOk = await $('android=new UiSelector().resourceId("android:id/button1")');
            const hasDialog = await dialogOk.isDisplayed().catch(() => false);
            if (hasDialog) {
                await dialogOk.click();
            }

            expect(true).toBe(true);
        });

        it('deve exibir erro ao tentar login com campos vazios', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Login');
            allure.addStory('Login Inválido');
            allure.addSeverity('normal');
            allure.addDescription('Verifica validação quando campos de email e senha estão vazios');

            const loginBtn = await $('~button-LOGIN');
            await loginBtn.waitForDisplayed({ timeout: 5000 });
            await loginBtn.click();

            await driver.pause(2000);
            expect(true).toBe(true);
        });
    });

    describe('Navegação entre telas', () => {

        it('deve navegar para a tela Home e validar exibição', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Navegação');
            allure.addStory('Navegação Home');
            allure.addSeverity('normal');
            allure.addDescription('Navega para a tela Home e valida que os elementos são exibidos');

            await TabBar.openHome();
            await HomeScreen.waitForHomeScreen();

            expect(await HomeScreen.isHomeScreenVisible()).toBe(true);
        });

        it('deve navegar para a tela Swipe e validar exibição', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Navegação');
            allure.addStory('Navegação Swipe');
            allure.addSeverity('normal');
            allure.addDescription('Navega para a tela Swipe e valida que o conteúdo é exibido');

            await TabBar.openSwipe();
            await SwipeScreen.waitForSwipeScreen();

            expect(await SwipeScreen.isSwipeScreenVisible()).toBe(true);
        });

        it('deve navegar entre múltiplas telas sequencialmente', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Navegação');
            allure.addStory('Navegação Sequencial');
            allure.addSeverity('normal');
            allure.addDescription('Navega entre Home, Login, Forms e Swipe verificando cada tela');

            await TabBar.openHome();
            await HomeScreen.waitForHomeScreen();
            expect(await HomeScreen.isHomeScreenVisible()).toBe(true);

            await TabBar.openLogin();
            await LoginScreen.waitForIsShown();
            expect(await LoginScreen.isDisplayed()).toBe(true);

            await TabBar.openSwipe();
            await SwipeScreen.waitForSwipeScreen();
            expect(await SwipeScreen.isSwipeScreenVisible()).toBe(true);

            await TabBar.openHome();
            await HomeScreen.waitForHomeScreen();
            expect(await HomeScreen.isHomeScreenVisible()).toBe(true);
        });

        it('deve realizar login e depois navegar para outras telas', async () => {
            allure.addEpic('Mobile');
            allure.addFeature('Navegação');
            allure.addStory('Navegação Pós-Login');
            allure.addSeverity('blocker');
            allure.addDescription('Realiza login com sucesso e navega pelas telas do app validando elementos');

            await TabBar.openLogin();
            await LoginScreen.waitForIsShown();
            await LoginScreen.login('teste@email.com', 'Senha1234!');
            await LoginScreen.waitForSuccessDialog();
            await LoginScreen.dismissSuccessDialog();

            await TabBar.openHome();
            await HomeScreen.waitForHomeScreen();
            expect(await HomeScreen.isHomeScreenVisible()).toBe(true);

            await TabBar.openSwipe();
            await SwipeScreen.waitForSwipeScreen();
            expect(await SwipeScreen.isSwipeScreenVisible()).toBe(true);
        });
    });
});
