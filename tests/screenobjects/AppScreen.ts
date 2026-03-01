export default class AppScreen {
    private readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    async waitForIsShown(isShown = true): Promise<boolean | void> {
        const elem = await $(this.selector);
        return elem.waitForDisplayed({
            timeout: 15000,
            reverse: !isShown,
        });
    }

    async isDisplayed(): Promise<boolean> {
        const elem = await $(this.selector);
        return elem.isDisplayed();
    }
}
