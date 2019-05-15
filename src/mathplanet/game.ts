import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { MenuScene } from "./scenes/menu-scene";

const config: GameConfig = {
  title: "MathPlanet",
  url: "https://github.com/Rupank/MathPlanetPhaser.git",
  version: "1.0",
  width: window.innerWidth,
  height: window.innerHeight,
  // zoom: 0.6,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, MenuScene],
  // input: {
  //   keyboard: true
  // },
  backgroundColor: "#000000",
  render: { pixelArt: false, antialias: true }
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
