import AppScreen from './AppScreen';

class HomeScreen extends AppScreen {
    constructor() {
        super('~Home-screen');
    }

    get screenTitle() { return $('~Home-screen'); }

    async waitForHomeScreen(): Promise<void> {
        const title = await this.screenTitle;
        await title.waitForDisplayed({ timeout: 15000 });
    }

    async isHomeScreenVisible(): Promise<boolean> {
        try {
            const title = await this.screenTitle;
            return await title.isDisplayed();
        } catch {
            return false;
        }
    }
}

export default new HomeScreen();
