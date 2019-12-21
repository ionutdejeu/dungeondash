import Phaser from "phaser";
import VirtualJoyStickHUD from "../drivers/ui/VirtualJoyStickHUD";

export default class JoyStickScene extends Phaser.Scene{
    joyStick:VirtualJoyStickHUD;
    text:any;
    constructor(){
        super({key:'JoyStickTestScene'});
    }
    
    

    create():void{
        console.log('scene created');

        this.input.keyboard.on("keydown_J",()=>{
            console.log('Starting Dungeon Scene');
            this.scene.start("DungeonScene");
        });
        this.joyStick= new VirtualJoyStickHUD(this,0,0,
            this.add.circle(0, 0, 100, 0x888888),
            this.add.circle(0, 0, 50, 0xcccccc));

        this.text = this.add.text(0, 0,'test');
        //this.dumpJoyStickState();
    }

     
}