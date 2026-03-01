class TabBar {
    private async openTab(tabName: string): Promise<void> {
        const tab = await $(`~${tabName}`);
        await tab.waitForExist({ timeout: 15000 });
        await tab.click();
        await driver.pause(1000);
    }

    async openHome(): Promise<void> {
        await this.openTab('Home');
    }

    async openWebview(): Promise<void> {
        await this.openTab('Webview');
    }

    async openLogin(): Promise<void> {
        await this.openTab('Login');
    }

    async openForms(): Promise<void> {
        await this.openTab('Forms');
    }

    async openSwipe(): Promise<void> {
        await this.openTab('Swipe');
    }

    async openDrag(): Promise<void> {
        await this.openTab('Drag');
    }
}

export default new TabBar();
