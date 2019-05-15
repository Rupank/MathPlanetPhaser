import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { MenuScene } from "./scenes/menu-scene";

const config: GameConfig = {
  title: "MathPlanet",
  url: "https://github.com/Rupank/MathPlanetPhaser.git",
  version: "1.0",
  scale: {
    parent: 'game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  // zoom: 0.6,
  type: Phaser.AUTO,
  scene: [BootScene, MenuScene],
  // input: {
  //   keyboard: true
  // },
  backgroundColor: "#000000"
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }

  preload(): void {
    this.boot;
  }
}

window.addEventListener("load", () => {
  var game = new Game(config);
});
