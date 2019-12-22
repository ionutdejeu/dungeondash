import Phaser from "phaser";



export default class VirtualJoyStickHUD extends Phaser.GameObjects.Container {
     
	zero:Phaser.Geom.Point;
	direction:Phaser.Geom.Point;
	distance:Number;
	pinAngle:number;
	isBeingDragged:boolean;
	dragger:Phaser.GameObjects.Sprite;
	constructor(scene: Phaser.Scene, 
			x: number, 
			y: number, 
			base:Phaser.GameObjects.Arc,
			thumb:Phaser.GameObjects.Arc,
			children?: Phaser.GameObjects.GameObject[]) {
        super(scene, x, y, children);
		this.zero= new Phaser.Geom.Point(0, 0);
		base.setOrigin(0.5,0.5);
		this.add(base);
		thumb.setOrigin(0.5,0.5);
		this.add(thumb);
		scene.add.existing(this);
		
		
		
		// this.active = true;
		// this.came.setTo(x, y);

		this.direction      = new Phaser.Geom.Point(0, 0);
		this.distance       = 0;
		this.pinAngle       = 0;
		this.active       = true;
		this.isBeingDragged = false;
		
		 
		/* Invisible sprite that players actually drag */
		this.dragger = this.scene.add.sprite(0, 0,'');
		this.dragger.setOrigin(0.5, 0.5);
		this.dragger.width = this.dragger.height = this.width;
		this.dragger.input.enabled = true;
		this.dragger.input.draggable = true
		//this.dragger.setInteractive(new Phaser.Geom.Circle(0,0,50),this.callback);
		 
		//this.scene.input.setDraggable(this.dragger)
		this.scene.input.on('drag', (pointer: any, gameObject: Phaser.GameObjects.GameObject, dragX: number, dragY: number) => {
			console.log(gameObject);
		  })
		this.add(this.dragger);
		console.log(this);
	}
	callback(){
		console.log('test');
	}
    // enable() {
    // 	this.disabled = false;
    // }
    // disable() {
    // 	this.disabled = true;
    // }
	// onDragStart(){
	// 	this.isBeingDragged = true;
	// 	if (this.disabled) return;
	// 	this.events.onDown.dispatch();
	// }
	// onDragStop(){
	// 	this.isBeingDragged = false;
	// 	/* Reset pin and dragger position */
	// 	this.dragger.position.setTo(0, 0);
	// 	this.pin.position.setTo(0, 0);
	// 	if (this.disabled) return;
	// 	this.events.onUp.dispatch(this.direction, this.distance, this.angle);
	// }
	// update(){
	// 	if (this.isBeingDragged) {
	// 		var dragger   = this.dragger.position;
	// 		var pin       = this.pin.position;
	// 		var angle     = this.pinAngle = zero.angle(dragger);
	// 		var distance  = this.distance = dragger.getMagnitude();
	// 		var direction = normalize(dragger, this.direction);
	// 		pin.copyFrom(dragger);
	// 		if (distance > 90) pin.setMagnitude(90);
	// 		if (this.disabled) return;
	// 		this.events.onMove.dispatch(direction, distance, angle);
	// 	}
	// }
}