import AppScreen from './AppScreen';

class SwipeScreen extends AppScreen {
    constructor() {
        super('~Swipe-screen');
    }

    get screenContainer() { return $('~Swipe-screen'); }
    get carousel() { return $('~Carousel'); }

    async waitForSwipeScreen(): Promise<void> {
        const container = await this.screenContainer;
        await container.waitForDisplayed({ timeout: 15000 });
    }

    async isSwipeScreenVisible(): Promise<boolean> {
        try {
            const container = await this.screenContainer;
            return await container.isDisplayed();
        } catch {
            return false;
        }
    }

    async swipeLeft(): Promise<void> {
        const screen = await this.screenContainer;
        const { x, y, width, height } = await screen.getSize();
        const location = await screen.getLocation();

        const startX = location.x + width * 0.8;
        const endX = location.x + width * 0.2;
        const centerY = location.y + height / 2;

        await browser.action('pointer', { parameters: { pointerType: 'touch' } })
            .move({ x: Math.round(startX), y: Math.round(centerY) })
            .down()
            .move({ x: Math.round(endX), y: Math.round(centerY), duration: 300 })
            .up()
            .perform();
    }
}

export default new SwipeScreen();
