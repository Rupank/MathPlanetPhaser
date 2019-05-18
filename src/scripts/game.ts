import 'phaser'
import PreloadScene from './scenes/preloadScene'
import MenuScene from './scenes/MenuScene';

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config: GameConfig = {
  title: "MathPlanet",
  url: "https://github.com/Rupank/MathPlanetPhaser.git",
  version: "1.0",
  backgroundColor: '#000000',
  scale: {
    parent: 'mathplanet',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  type: Phaser.AUTO,
  scene: [PreloadScene, MenuScene]
  // physics: {
  //   default: 'arcade',
  //   arcade: {
  //     debug: false,
  //     gravity: { y: 400 }
  //   }
  // }
}

window.addEventListener('load', () => {
  let game = new Phaser.Game(config)
})
//
