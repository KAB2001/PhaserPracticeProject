class TitleScene extends Phaser.Scene {
    constructor() {
        super({key: 'TitleScene'});
    }

    preload() {
        this.load.image('bg_image', '/assets/images/titleScene/titleScene.jpg');
        this.load.image('logo', '/assets/images/titleScene/logo.png');
        this.load.image('start_btn', '/assets/images/titleScene/start_button.png');
    }

    create() {
        let background = this.add.sprite(0, 0, 'bg_image');
        background.setOrigin(0, 0);

        let logo = this.add.sprite(400, 300, 'logo');

        let btn = this.add.sprite(400, 500, 'start_btn').setScale(0.5);

        let btn_text = this.add.text(btn.x, btn.y, 'Start').setScale(2).setOrigin(0.5, 0.5);

        btn.setInteractive();
        btn.on('pointerup', () => {
            this.scene.stop('TitleScene');
            this.scene.start('GameScene');
        });
    }
}
