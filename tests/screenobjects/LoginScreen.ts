import AppScreen from './AppScreen';

class LoginScreen extends AppScreen {
    constructor() {
        super('~Login-screen');
    }

    get inputEmail() { return $('~input-email'); }
    get inputPassword() { return $('~input-password'); }
    get btnLogin() { return $('~button-LOGIN'); }
    get signUpTab() { return $('~button-sign-up-container'); }

    get inputRepeatPassword() { return $('~input-repeat-password'); }
    get btnSignUp() { return $('android=new UiSelector().text("SIGN UP")'); }

    get dialogTitle() { return $('android=new UiSelector().resourceId("android:id/alertTitle")'); }
    get dialogMessage() { return $('android=new UiSelector().resourceId("android:id/message")'); }
    get dialogOkButton() { return $('android=new UiSelector().resourceId("android:id/button1")'); }

    async login(email: string, password: string): Promise<void> {
        const emailField = await this.inputEmail;
        await emailField.waitForDisplayed({ timeout: 10000 });
        await emailField.setValue(email);

        const passwordField = await this.inputPassword;
        await passwordField.setValue(password);

        await driver.hideKeyboard().catch(() => {});

        const loginBtn = await this.btnLogin;
        await loginBtn.waitForDisplayed({ timeout: 5000 });
        await loginBtn.click();
    }

    async switchToSignUp(): Promise<void> {
        const signUp = await this.signUpTab;
        await signUp.waitForDisplayed({ timeout: 10000 });
        await signUp.click();
    }

    async signUp(email: string, password: string, confirmPassword: string): Promise<void> {
        const emailField = await this.inputEmail;
        await emailField.waitForDisplayed({ timeout: 10000 });
        await emailField.setValue(email);

        const passwordField = await this.inputPassword;
        await passwordField.setValue(password);

        const repeatField = await this.inputRepeatPassword;
        await repeatField.setValue(confirmPassword);

        await driver.hideKeyboard().catch(() => {});

        const signUpBtn = await this.btnSignUp;
        await signUpBtn.waitForDisplayed({ timeout: 5000 });
        await signUpBtn.click();
    }

    async waitForSuccessDialog(): Promise<void> {
        const okBtn = await this.dialogOkButton;
        await okBtn.waitForDisplayed({ timeout: 15000 });
    }

    async dismissSuccessDialog(): Promise<void> {
        const okBtn = await this.dialogOkButton;
        if (await okBtn.isDisplayed()) {
            await okBtn.click();
        }
    }

    async isSuccessDialogDisplayed(): Promise<boolean> {
        try {
            const title = await this.dialogTitle;
            return await title.isDisplayed();
        } catch {
            return false;
        }
    }

    async getDialogMessage(): Promise<string> {
        const msg = await this.dialogMessage;
        return msg.getText();
    }
}

export default new LoginScreen();
