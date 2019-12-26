import Phaser from "phaser";
import Graphics from "../assets/Graphics";
import FOVLayer from "../entities/FOVLayer";
import Player from "../entities/Player";
import Map from "../entities/Map";

import transparentLight01 from "../../assets/ui/transparentLight/transparentLight01.png";
import transparentLight03 from "../../assets/ui/transparentLight/transparentLight03.png";
import transparentLight04 from "../../assets/ui/transparentLight/transparentLight04.png";
import transparentLight08 from "../../assets/ui/transparentLight/transparentLight08.png";
import JoyStickScene, { VirtualJoystickKeys } from "./JoyStickScene";

const worldTileHeight = 81;
const worldTileWidth = 81;

export default class DungeonScene extends Phaser.Scene {
  lastX: number;
  lastY: number;
  player: Player | null;
  fov: FOVLayer | null;
  tilemap: Phaser.Tilemaps.Tilemap | null;
  cameraResizeNeeded: boolean;
  text:any|null;
  clickCountText:any|null;
  joyStickCursorKeys:VirtualJoystickKeys;
  joyStickScene:JoyStickScene;
  preload(): void {
    this.load.image(Graphics.environment.name, Graphics.environment.file);
    this.load.image(Graphics.util.name, Graphics.util.file);
    this.load.spritesheet(Graphics.player.name, Graphics.player.file, {
      frameHeight: Graphics.player.height,
      frameWidth: Graphics.player.width
    });
    this.load.image('up_joystickpad',transparentLight01);
    this.load.image('left_joystickpad',transparentLight03);
    this.load.image('right_joystickpad',transparentLight04);
    this.load.image('down_joystickpad',transparentLight08);
  }



  constructor() {
    super("DungeonScene");
    this.lastX = -1;
    this.lastY = -1;
    this.player = null;
    this.fov = null;
    this.tilemap = null;
    this.cameraResizeNeeded = false;
  }

  create(): void {
    const map = new Map(worldTileWidth, worldTileHeight, this);
    this.tilemap = map.tilemap;

    this.fov = new FOVLayer(map);

    Object.values(Graphics.player.animations).forEach(anim => {
      if (!this.anims.get(anim.name)) {
        this.anims.create({
          key: anim.name,
          frames: this.anims.generateFrameNumbers(Graphics.player.name, anim),
          frameRate: anim.frameRate,
          repeat: anim.repeat ? -1 : 0
        });
      }
    });

    this.player = new Player(
      this.tilemap.tileToWorldX(map.startingX),
      this.tilemap.tileToWorldY(map.startingY),
      this
    );

    this.cameras.main.setRoundPixels(true);
    this.cameras.main.setZoom(3);
    this.cameras.main.setBounds(
      0,
      0,
      map.width * Graphics.environment.width,
      map.height * Graphics.environment.height
    );
    this.cameras.main.startFollow(this.player.sprite);

    this.physics.add.collider(this.player.sprite, map.wallLayer);
    let clickCount = 0;
    this.clickCountText = this.add.text(100, 200, '');
    let container = this.add.container(0,0);
    container.setScrollFactor(0,0);
     
    const upPadButton = this.add.image(-40,-76,'up_joystickpad')
    .setInteractive()
    .on('pointerdown', () => this.updateClickCountText(++clickCount) )
    .on('pointerover', (e:any) => {console.log(e)} )
    .on('pointerout', (e:any) => {console.log(e)} );
    
    const leftPadButton = this.add.image(-80,-30,'left_joystickpad')
    .setInteractive()
    .on('pointerdown', () => this.updateClickCountText(++clickCount) )
    .on('pointerover', (e:any) => {console.log(e)} )
    .on('pointerout', (e:any) => {console.log(e)} );
    
    const rightPadButton = this.add.image(0,-30,'right_joystickpad')
    .setInteractive()
    .on('pointerdown', () => this.updateClickCountText(++clickCount) )
    .on('pointerover', (e:any) => {console.log(e)} )
    .on('pointerout', (e:any) => {console.log(e)} );

    const downPadButton = this.add.image(-40,14,'down_joystickpad')
    .setInteractive()
    .on('pointerdown', () => this.updateClickCountText(++clickCount) )
    .on('pointerover', (e:any) => {console.log(e)} )
    .on('pointerout', (e:any) => {console.log(e)} );

    container.add([upPadButton,downPadButton,leftPadButton,rightPadButton]);

    

    window.addEventListener("resize", () => {
      this.cameraResizeNeeded = true;
    });

    this.input.keyboard.on("keydown_R", () => {
      this.scene.stop("InfoScene");
      this.scene.start("ReferenceScene");
    });
    this.input.keyboard.on("keydown_J",()=>{
      this.scene.stop("InfoScene");
      this.scene.start("JoyStickTestScene");
    });

    this.scene.run("InfoScene");
    this.scene.run("JoyStickTestScene");
    this.joyStickScene= this.scene.manager.getScene('JoyStickTestScene') as JoyStickScene;
    

  }

  update(time: number, delta: number) {
    this.joyStickCursorKeys = this.joyStickScene.getCursorKeys();
    this.player!.update(time,this.joyStickCursorKeys);
    const camera = this.cameras.main;

    if (this.cameraResizeNeeded) {
      // Do this here rather than the resize callback as it limits
      // how much we'll slow down the game
      camera.setSize(window.innerWidth, window.innerHeight);
      this.cameraResizeNeeded = false;
    }

    const player = new Phaser.Math.Vector2({
      x: this.tilemap!.worldToTileX(this.player!.sprite.body.x),
      y: this.tilemap!.worldToTileY(this.player!.sprite.body.y)
    });

    const bounds = new Phaser.Geom.Rectangle(
      this.tilemap!.worldToTileX(camera.worldView.x) - 1,
      this.tilemap!.worldToTileY(camera.worldView.y) - 1,
      this.tilemap!.worldToTileX(camera.worldView.width) + 2,
      this.tilemap!.worldToTileX(camera.worldView.height) + 2
    );

    this.fov!.update(player, bounds, delta);
  }

  updateClickCountText(clickCount:any) {
    this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
  }
}
