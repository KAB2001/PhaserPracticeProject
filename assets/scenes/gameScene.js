let gameState = {}

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    preload() {
        this.load.image('sky', '/assets/images/gameScene/sky.jpg');
        this.load.image('mountains', '/assets/images/gameScene/mountains.png');
        this.load.image('platform', '/assets/images/gameScene/ice-platform.png');

        this.load.atlas('player1', '/assets/images/gameScene/spritesheets/spritesheet.png', '/assets/images/gameScene/spritesheets/spritesheet.json');
    }

    create() {
        gameState.cursors = this.input.keyboard.createCursorKeys();

        let sky = this.add.image(0, 0, 'sky');
        sky.setOrigin(0, 0);

        let mountains = this.add.image(0, 0, 'mountains');
        mountains.setOrigin(0, 0);

        gameState.platforms = this.physics.add.staticGroup();
        for (let i = 0; i < 6; i++) {
            let x = 0;
            if(i%2 == 0){
               x = (((i%2)*590)+10)+(Math.floor(Math.random() * 250));
            } else {
               x = (((i%2)*590)+10)-(Math.floor(Math.random() * 250));
            }
            let y = (i*80)+80;
            gameState.platforms.create(x, y, 'platform').setScale(0.5).setOrigin(0, 0).refreshBody();
        }

        gameState.platforms.create(0, 560, 'platform').setDisplayOrigin(0, 0).setDisplaySize(800, 100).refreshBody();

        gameState.player1 = this.physics.add.sprite(50, 50, 'player1').setScale(0.1).setCollideWorldBounds(true);
        this.physics.add.collider(gameState.player1, gameState.platforms);


        //player1 animations
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('player1', {prefix: 'idle-', start: 1, end: 2, suffix: '.png'}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('player1', {prefix: 'run-', start: 1, end: 4, suffix: '.png'}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('player1', {prefix: 'jump-', start: 1, end: 2, suffix: '.png'}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'dizzy',
            frames: this.anims.generateFrameNames('player1', {prefix: 'dizzy-', start: 1, end: 2, suffix: '.png'}),
            frameRate: 5,
            repeat: -1
        });

        /*function initGameTimer() {
            gameState.time = 120;
            gameState.timeText = game.add.text(400, 50, '' + gameState.time);

            let timer = this.time.create(false);
            timer.loop(1000, this.gameTicker, this);
            timer.start();
        }

        function gameTicker() {
            gameState.time--;
            gameState.timeText.text = (gameState.time < 10) ? "0" + gameState.time: gameState.time;
        }

        initGameTimer();*/
    }

    update() {

        if (gameState.cursors.right.isDown) {
            gameState.player1.setVelocityX(100);
            gameState.player1.anims.play('run', true);
            gameState.player1.flipX = false;
        } else if (gameState.cursors.left.isDown) {
            gameState.player1.setVelocityX(-100);
            gameState.player1.anims.play('run', true);
            gameState.player1.flipX = true;
        } else {
            gameState.player1.setVelocityX(0);
            gameState.player1.anims.play('idle', true);
        }

        if (gameState.cursors.up.isDown && gameState.player1.body.touching.down) {
            gameState.player1.setVelocityY(-330);
        }
    }
}
