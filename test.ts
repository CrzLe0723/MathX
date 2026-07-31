// Setup
game.showLongText("Please pick 1 option by pressing the specified button:\n \nTime : 1 \nGameplay : 2 \nFormulas : 3 \nPhysics : 4 \nEffects : 5 \nWave : 6 \nConstants : 7", DialogLayout.Full)




// Variables

// Num
let testNumber: number = -1

// Sprites
let mySprite: Sprite = null
let mySprite2: Sprite = null



// Events
browserEvents.One.onEvent(browserEvents.KeyEvent.Pressed, function () {
    callTest(0)
})



// Functions
function callTest(testNum: number): void {

    testNumber = testNum

    switch (testNum) {
        case 0:

            MathX.startStopwatch("Timer 1")

            mySprite = sprites.create(img`
                . . . . . . b b b b a a . . . .
                . . . . b b d d d 3 3 3 a a . .
                . . . b d d d 3 3 3 3 3 3 a a .
                . . b d d 3 3 3 3 3 3 3 3 3 a .
                . b 3 d 3 3 3 3 3 b 3 3 3 3 a b
                . b 3 3 3 3 3 a a 3 3 3 3 3 a b
                b 3 3 3 3 3 a a 3 3 3 3 d a 4 b
                b 3 3 3 3 b a 3 3 3 3 3 d a 4 b
                b 3 3 3 3 3 3 3 3 3 3 d a 4 4 e
                a 3 3 3 3 3 3 3 3 3 d a 4 4 4 e
                a 3 3 3 3 3 3 3 d d a 4 4 4 e .
                a a 3 3 3 d d d a a 4 4 4 e e .
                . e a a a a a a 4 4 4 4 e e . .
                . . e e b b 4 4 4 4 b e e . . .
                . . . e e e e e e e e . . . . .
                . . . . . . . . . . . . . . . .
            `, SpriteKind.Player)
            mySprite.y = 50

            mySprite2 = sprites.create(img`
                . . . . . . . . . . b 5 b . . .
                . . . . . . . . . b 5 b . . . .
                . . . . . . . . . b c . . . . .
                . . . . . . b b b b b b . . . .
                . . . . . b b 5 5 5 5 5 b . . .
                . . . . b b 5 d 1 f 5 5 d f . .
                . . . . b 5 5 1 f f 5 d 4 c . .
                . . . . b 5 5 d f b d d 4 4 . .
                b d d d b b d 5 5 5 4 4 4 4 4 b
                b b d 5 5 5 b 5 5 4 4 4 4 4 b .
                b d c 5 5 5 5 d 5 5 5 5 5 b . .
                c d d c d 5 5 b 5 5 5 5 5 5 b .
                c b d d c c b 5 5 5 5 5 5 5 b .
                . c d d d d d d 5 5 5 5 5 d b .
                . . c b d d d d d 5 5 5 b b . .
                . . . c c c c c c c c b b . . .
            `, SpriteKind.Player)
            mySprite2.setPosition(60, 90)


            break
        default:
            break
    }
}
game.onUpdate(() => {
    if (testNumber == 0) {
        mySprite.sayText("Game time (Ms): " + MathX.timeMs() + "\n" + "Game time (s): " + MathX.timeSeconds())
        mySprite2.sayText("Stopwatch time: (Ms)" + MathX.readStopwatch("Timer 1"))
    }
})
