export default class Background {
    private bgImage: Phaser.GameObjects.Sprite;
    private bgTop: Phaser.GameObjects.TileSprite;
    private bgMid: Phaser.GameObjects.TileSprite;
    constructor(scene: Phaser.Scene) {
        this.addBG(scene);
    }

    addBG(scene): void {
        this.bgImage = scene.add.sprite(0, 0, "bg");
        this.bgImage.setOrigin(0, 0);
        this.bgTop = scene.add.tileSprite(0, 0, 1280, 720, "starLayer");
        this.bgTop.setOrigin(0, 0);
        this.bgMid = scene.add.tileSprite(0, 0, 1280, 720, "starLayer");
        this.bgMid.setFlipX(true);
        this.bgMid.setOrigin(0, 0);
    }

    update(): void {
        this.bgMid.tilePositionX += 0.5;
        this.bgTop.tilePositionX -= 0.9;
    }
}
