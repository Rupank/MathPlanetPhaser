
export default class MenuScene extends Phaser.Scene {
    private themes: Phaser.GameObjects.Sprite[] = [];
    private prime: number = 0;
    private xleft = 0;
    private xprime = 0;
    private xright = 0;
    private animationSpeed;
    private totalThemes = 0;
    private isFullScreen: boolean;
    constructor() {
        super({
            key: "MenuScene"
        });
    }

    init(): void {
        this.prime = 0;
        this.animationSpeed = 300;
        this.isFullScreen = false;
    }

    create(): void {
        this.swipe();
        this.themes.push(this.add.sprite(0, 0, 'planet1'));
        this.themes.push(this.add.sprite(0, 0, 'planet2'));
        this.themes.push(this.add.sprite(0, 0, 'planet3'));
        this.themes.push(this.add.sprite(0, 0, 'planet4'));
        this.themes.push(this.add.sprite(0, 0, 'planet5'));
        this.themes.push(this.add.sprite(0, 0, 'planet6'));
        this.themes.push(this.add.sprite(0, 0, 'planet7'));
        this.totalThemes = this.themes.length;

        this.themes.forEach((item: Phaser.GameObjects.Sprite) => {
            item.setOrigin(0.5, 0.5);
            item.x = this.sys.canvas.width + 250;
            item.y = this.sys.canvas.height / 2;
            // item.setInteractive();
            // item.on("pointerdown", this.clickListener);
        }, this)

        this.setToPosition();
        this.xleft = this.sys.canvas.width / 2 - this.themes[0].displayWidth;
        this.xprime = this.sys.canvas.width / 2;
        this.xright = this.sys.canvas.width / 2 + this.themes[0].displayWidth;
    }


    clickListener(el, b, c, d): void {
        var clickedPos = (this.scene as any).themes.indexOf(this);
        if (clickedPos > (this.scene as any).prime) {
            //move to left
            (this.scene as any).nextTheme();
        } else if (clickedPos < (this.scene as any).prime) {
            //move to right
            (this.scene as any).previousTheme();
        }
    }

    setToPosition(): void {
        this.themes[this.prime].x = this.sys.canvas.width / 2;
        //check if there is another theme available to display on the right side; if yes then position it
        if (this.prime < (this.totalThemes - 1)) {
            this.themes[this.prime + 1].x = this.sys.canvas.width / 2 + this.themes[0].displayWidth;
            this.themes[this.prime + 1].setScale(0.5, 0.5);
        }

        //check if there is another theme available to display on the left side; if yes then position it
        if (this.prime > 0) {
            this.themes[this.prime - 1].x = this.sys.canvas.width / 2 - this.themes[0].displayWidth;
            this.themes[this.prime - 1].setScale(0.5, 0.5);
        }
    }


    private swipe(): void {
        let downX, upX, downY, upY, threshold = 50;
        let flag = false;
        this.input.on('pointerdown', (pointer) => {
            flag = true;
            downX = pointer.x;
            downY = pointer.y;
        });


        this.scale.onFullScreenChange = () => {
            if (!this.scale.isFullscreen) {
                // this.isFullScreen = false;
            }
        }

        this.input.on('pointerup', (pointer) => {
            if (flag) {
                // if (this.scale.isFullscreen) {
                //     // this.scale.stopFullscreen();
                // } else {
                if (!this.isFullScreen) {
                    this.isFullScreen = true;
                    this.scale.startFullscreen();
                }
                // }
                flag = false;
                upX = pointer.x;
                upY = pointer.y;
                if (upX < downX - threshold) {
                    if (this.prime < this.themes.length - 1) {
                        this.nextTheme();
                    }
                    console.log("swipeleft");
                } else if (upX > downX + threshold) {
                    if (this.prime > 0) {
                        this.previousTheme();
                    }
                    console.log("swiperight");
                } else if (upY < downY - threshold) {
                    console.log("swipeup");
                } else if (upY > downY + threshold) {
                    console.log("swipedown");
                }
            }
        });
    }

    //move to next theme
    nextTheme(): void {
        //move this.prime left
        this.tweens.add({
            targets: this.themes[this.prime],
            x: this.xleft,
            duration: this.animationSpeed,
            // repeat: -1,
            // yoyo: true,
        });

        this.tweens.add({
            targets: this.themes[this.prime],
            scaleX: 0.5,
            scaleY: 0.5,
            duration: this.animationSpeed,
            //   repeat: -1,
            // yoyo: true,
        });


        //move right to this.prime
        if (this.prime < this.themes.length - 1) {
            this.tweens.add({
                targets: this.themes[this.prime + 1],
                x: this.xprime,
                duration: this.animationSpeed,
                //   repeat: -1,
                // yoyo: true,
            });

            this.tweens.add({
                targets: this.themes[this.prime + 1],
                scaleX: 1,
                scaleY: 1,
                duration: this.animationSpeed,
                //   repeat: -1,
                // yoyo: true,
            });

        }
        //move new to right
        if (this.prime < this.themes.length - 2) {
            this.themes[this.prime + 2].x = this.sys.canvas.width + 150;
            this.themes[this.prime + 2].setScale(0.5, 0.5);

            this.tweens.add({
                targets: this.themes[this.prime + 2],
                x: this.xright,
                duration: this.animationSpeed,
                //   repeat: -1,
                // yoyo: true,
            });
        }
        //move left out
        if (this.prime > 0) {
            //this.themes[this.prime+1].x = -150;
            this.themes[this.prime - 1].setScale(0.5, 0.5);

            this.tweens.add({
                targets: this.themes[this.prime - 1],
                x: -150,
                duration: this.animationSpeed,
                //   repeat: -1,
                // yoyo: true,
            });
        }
        this.prime++;

    }

    //move to previous theme
    previousTheme(): any {
        //move this.prime left
        this.tweens.add({
            targets: this.themes[this.prime],
            x: this.xright,
            duration: this.animationSpeed,
            //   repeat: -1,
            // yoyo: true,
        });

        this.tweens.add({
            targets: this.themes[this.prime],
            scaleX: 0.5,
            scaleY: 0.5,
            duration: this.animationSpeed,
            //   repeat: -1,
            // yoyo: true,
        });

        //move left to this.prime
        if (this.prime > 0) {
            this.tweens.add({
                targets: this.themes[this.prime - 1],
                x: this.xprime,
                duration: this.animationSpeed,
                //   repeat: -1,
                // yoyo: true,
            });

            this.tweens.add({
                targets: this.themes[this.prime - 1],
                scaleX: 1,
                scaleY: 1,
                duration: this.animationSpeed,
                //   repeat: -1,
                // yoyo: true,
            });

        }
        //move new to left
        if (this.prime > 1) {
            this.themes[this.prime - 2].x = -150;
            this.themes[this.prime - 2].setScale(0.5, 0.5);

            this.tweens.add({
                targets: this.themes[this.prime - 2],
                x: this.xleft,
                duration: this.animationSpeed,
                //   repeat: -1,
                // yoyo: true,
            });
        }
        //move right out
        if (this.prime < (this.totalThemes - 1)) {
            //this.themes[this.prime+1].x = -150;
            this.themes[this.prime + 1].setScale(0.5, 0.5);

            this.tweens.add({
                targets: this.themes[this.prime + 1],
                x: this.sys.canvas.width + 150,
                duration: this.animationSpeed,
                //   repeat: -1,
                // yoyo: true,
            });
        }
        this.prime--;
    }


    update(): void {
    }
}
