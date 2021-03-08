import "phaser";
import "socket.io-client";
import { PlayerData, PositionMessage } from "./playerdata";

interface PlayerInfo {
     sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
     text: Phaser.GameObjects.Text;
     score: number;
}

export default class Demo extends Phaser.Scene {

    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    player: PlayerInfo;
    playerMap: { [id: string]: PlayerInfo};
    platforms: Phaser.Physics.Arcade.StaticGroup;
    stars: Phaser.Physics.Arcade.Group;
    score = 0;
    scoreText: Phaser.GameObjects.Text;
    socket: SocketIOClient.Socket;

    constructor() {
        super("demo");
        this.playerMap = {};
    }

    preload() {
        // load images from the assets directory, and give them names
        this.load.image("sky", "assets/sky.png");
        this.load.image("ground", "assets/platform.png");
        this.load.image("star", "assets/star.png");
        // this.load.image("bomb", "assets/bomb.png");

        // a spritesheet is a set of image frames combined into one file
        // we load it and define the width and height of each frame
        this.load.spritesheet("dude",
            "assets/dude.png",
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        // center the "sky" image on the background
        this.add.image(400, 300, "sky");
        // or we could use
        //   this.add.image(0, 0, 'sky').setOrigin(0, 0);
        // to change the position origin of the image to its upper left instead of its center

        this.createDudeAnimations();
        this.platforms = this.createPlatforms();
        this.stars = this.createStars();

        // add collision detection between stars and platforms
        this.physics.add.collider(this.stars, this.platforms);

        // add default score text in the upper left
        this.scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "50px", color: "#000000" });

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.createPlayer = this.createPlayer.bind(this);

        this.socket = io.connect();
        this.socket.on("newplayer", this.addNewPlayer.bind(this));
        this.socket.on("allplayers", this.addAllPlayers.bind(this));
        this.socket.on("remove", this.removePlayer.bind(this));

        this.socket.on('position', this.setPosition.bind(this));

        // create a looped timer event for sending position
        this.time.addEvent({
            delay: 100,
            callback: this.sendPosition,
            callbackScope: this,
            loop: true
        });

    }

    sendPosition() {
        if (!this.player) {
            return;
        }
        const center = this.player.sprite.body.center;
        const vel = this.player.sprite.body.velocity;

        const msg: PositionMessage = { x: center.x, y: center.y, vx: vel.x, vy: vel.y };
        this.socket.emit("position", msg);
    }

    setPosition(msg: PositionMessage) {
        const player = this.playerMap[msg.pid];
        if (!player) {
            return;
        }
        player.sprite.setVelocity(msg.vx, msg.vy);
        player.sprite.setPosition(msg.x, msg.y);
        player.text.setPosition(msg.x, msg.y);
    }

    createPlatforms() {
        // create a group of static platform objects so we can control them together
        const platforms = this.physics.add.staticGroup();

        // add platforms using the "ground" image
        // first platform is the ground; scale it to take full width of the world
        // screen is 800x600; origin is in upper left; increasing y makes object lower
        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 200, "ground");

        return platforms;
    }

    createStars() {
        // add 12 stars using the "star" image and repeating it
        // set xy to distribute the stars every 70 pixels across the top of the screen
        const stars = this.physics.add.group({
            key: "star",
            repeat: 17,
            setXY: { x: 12, y: 0, stepX: 45 }
        });

        // make the stars bounce a random height off the platforms when they first fall
        stars.children.iterate((star: any) => {
            star.setBounceY(Phaser.Math.FloatBetween(0.25, 1));
        });
        return stars;
    }

    createDudeAnimations() {
        // create animation for player going left
        // animation is made from first 4 frames of the "dude" spritesheet
        // it cycles at 10 frames per second
        // and repeats forever
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // create animation when player turns and briefly faces forward
        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20
        });

        // create animation for player going right, from frames 5 through 8
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    createPlayer(x: number, y: number) {
        // correct y position if inside the ground
        if (y > 500) {
            y = y - 104;
        }
        // create the player, a movable physics sprite
        const player = this.physics.add.sprite(x, y, "dude");

        // when the player lands it will bounce a little
        player.setBounce(0.2);

        // player cannot go outside the bounds of the world
        player.setCollideWorldBounds(true);

        // add collision detection between player and platforms (so player will bounce)
        this.physics.add.collider(player, this.platforms);

        // when player overlaps star, call the collectStar function
        this.physics.add.overlap(player, this.stars, this.collectStar, null, this);

        return player;
    }

    addNewPlayer(pd: PlayerData) {
        const sprite = this.createPlayer(pd.x, pd.y);
        sprite.setTint(pd.color);
        const playerText = this.add.text(pd.x, pd.y, pd.name, { fontSize: "12px", color: "#000000" });
        playerText.setDisplayOrigin(15, 28);
        const player = {
            sprite:sprite,
            text:playerText,
            score: 0
        };
        if (this.socket.id === pd.playerId) {        
            this.player = player;
        }
        this.playerMap[pd.playerId] = player;
    }

    addAllPlayers(data: { [id: string]: PlayerData }) {
        console.log("add all players", data);
        const ids = Object.keys(data);
        ids.forEach(id => {
            this.addNewPlayer(data[id]);
        });
    }

    removePlayer(id: string) {
        console.log("removePlayer", id, this.playerMap[id]);
        if (this.playerMap[id]) {
            this.playerMap[id].sprite.destroy();
            delete this.playerMap[id];
        }
    }

    // called when player touches a star
    collectStar(player, star) {
        // make the star invisible
        star.disableBody(true, true);

        // update the score
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
    }

    // called by phaser 60 times per second
    update() {
        const cursors = this.cursorKeys;
        const player = this.player;
        if (!player) {
            // player not set yet
            return;
        }
        const sprite = this.player.sprite;

        // move the player using the left and right arrow keys
        if (cursors.left.isDown) {
            // move left and play "left" animation
            sprite.setVelocityX(-160);
            sprite.anims.play("left", true);

        } else if (cursors.right.isDown) {
            // move right and play "right" animation
            sprite.setVelocityX(160);
            sprite.anims.play("right", true);

        } else {
            // stop and face forward
            sprite.setVelocityX(0);
            sprite.anims.play("turn");
        }

        // jump when up arrow is pressed, but only when on a surface
        if (cursors.up.isDown && sprite.body.touching.down) {
            sprite.setVelocityY(-330);
        }
        this.player.text.setPosition(sprite.x, sprite.y);
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    // backgroundColor: "#125555",
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: Demo
};

const game = new Phaser.Game(config);
