import Phaser from "phaser";
import ReferenceScene from "./scenes/ReferenceScene";
import DungeonScene from "./scenes/DungeonScene";
import InfoScene from "./scenes/InfoScene";
import JoyStickScene from "./scenes/JoystickTestScene";
import Demo from "./scenes/Demo";


const game = new Phaser.Game({
  type: Phaser.WEBGL,
  // TODO: OnResize
  width: window.innerWidth,
  height: window.innerHeight,
  render: { pixelArt: true },
  physics: { default: "arcade", arcade: { debug: false, gravity: { y: 0 } } },
  scene: [Demo, JoyStickScene,DungeonScene, InfoScene, ReferenceScene,]
});

function setUpHotReload() {
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept(() => {});
    // @ts-ignore
    module.hot.dispose(() => {
      window.location.reload();
    });
  }
}

setUpHotReload();

window.addEventListener("resize", () => {
  game.resize(window.innerWidth, window.innerHeight);
});
