import AppScreen from './AppScreen';

class FormsScreen extends AppScreen {
    constructor() {
        super('~text-input');
    }

    get inputText() { return $('~text-input'); }
    get inputResult() { return $('~input-text-result'); }
    get switchElement() { return $('~switch'); }
    get switchText() { return $('~switch-text'); }
    get dropdown() { return $('~Dropdown'); }
    get btnActive() { return $('~button-Active'); }
    get btnInactive() { return $('~button-Inactive'); }

    get dialogOkButton() { return $('android=new UiSelector().resourceId("android:id/button1")'); }

    async typeInField(text: string): Promise<void> {
        const input = await this.inputText;
        await input.waitForDisplayed({ timeout: 10000 });
        await input.clearValue();
        await input.setValue(text);
        await driver.hideKeyboard().catch(() => {});
    }

    async getTypedResult(): Promise<string> {
        const result = await this.inputResult;
        await result.waitForDisplayed({ timeout: 5000 });
        return result.getText();
    }

    async toggleSwitch(): Promise<void> {
        const sw = await this.switchElement;
        await sw.waitForDisplayed({ timeout: 5000 });
        await sw.click();
    }

    async getSwitchLabel(): Promise<string> {
        const text = await this.switchText;
        return text.getText();
    }

    async openDropdown(): Promise<void> {
        const dd = await this.dropdown;
        await dd.waitForDisplayed({ timeout: 5000 });
        await dd.click();
    }

    async selectDropdownOption(optionText: string): Promise<void> {
        const option = await $(`android=new UiSelector().text("${optionText}")`);
        await option.waitForDisplayed({ timeout: 5000 });
        await option.click();
    }

    async clickActiveButton(): Promise<void> {
        const btn = await this.btnActive;
        await btn.waitForDisplayed({ timeout: 5000 });
        await btn.click();
    }

    async isActiveButtonDisplayed(): Promise<boolean> {
        const btn = await this.btnActive;
        return btn.isDisplayed();
    }

    async dismissDialog(): Promise<void> {
        try {
            const okBtn = await this.dialogOkButton;
            await okBtn.waitForDisplayed({ timeout: 3000 });
            await okBtn.click();
            await driver.pause(500);
        } catch {
            // No dialog to dismiss
        }
    }
}

export default new FormsScreen();
