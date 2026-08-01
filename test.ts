// Setup
game.showLongText("Please pick 1 option by pressing the specified button:\n \nTime : 1 \nGameplay : 2 \nFormulas : 3 \nPhysics : 4 \nEffects : 5 \nWave : 6 \nConstants : 7", DialogLayout.Full)




// Variables
// Num
let testNumber = -1
let t = 0
let speed = 2
let amp = 20

// Sprites
let mySprite: Sprite = null
let mySprite2: Sprite = null
let mySprite3: Sprite = null

// Events
browserEvents.One.onEvent(browserEvents.KeyEvent.Pressed, function () {
    callTest(0)
})







// Events
game.onUpdate(function () {
    if (testNumber == 0) {
        mySprite.sayText("Game time (Ms): " + MathX.timeMs() + "\n" + "Game time (s): " + MathX.timeSeconds())
        mySprite2.sayText("Stopwatch time: (Ms)" + MathX.readStopwatch("Timer 1"))
    } else if (testNumber == 1) {
    


        t = Math.min(1, t + 0.01)
        mySprite2.follow(mySprite, MathX.lerp(80, 20, t))
    } else if (testNumber == 2) {
        MathX.defineFormula("distance", MathX.unaryOp(MathX.UnaryOperator.SquareRoot, MathX.binary(MathX.BinaryOperator.Plus, MathX.binary(MathX.BinaryOperator.Pow, MathX.parameter(0), 2), MathX.binary(MathX.BinaryOperator.Pow, MathX.parameter(1), 2))))
        MathX.defineFormula("PI + p", MathX.binary(MathX.BinaryOperator.Plus, MathX.constant(MathX.Constants.PI), MathX.parameter(0)))
        MathX.defineFormula("half", MathX.multiFunctionExpression(MathX.MultiFunction.Lerp, [0, 100, MathX.input()]))
        console.log(MathX.runFormula("half", [0.5]))


        mySprite.sayText("Distance Function: " + MathX.runFormula("distance", [3, 4]))
        mySprite2.sayText("PI + Parameter Function: " + MathX.runFormula("PI + p", [1]))
        mySprite3.sayText("Half Function: " + MathX.runFormula("half", [0.5]))

    } else if (testNumber == 5) {
        t += 0.05

        mySprite.y = 60 + MathX.sine(t, speed, amp)
        mySprite2.y = 60 + MathX.cosine(t, 2, 20)
        mySprite3.y = 60 + MathX.wave(MathX.WaveType.Bounce, t, 2, 20)
    }
})

browserEvents.One.onEvent(browserEvents.KeyEvent.Pressed, function () {
    callTest(0)
})
browserEvents.Two.onEvent(browserEvents.KeyEvent.Pressed, function () {
    callTest(1)
})
browserEvents.Three.onEvent(browserEvents.KeyEvent.Pressed, function () {
    callTest(2)
})
browserEvents.Four.onEvent(browserEvents.KeyEvent.Pressed, function () {
    callTest(3)
})
browserEvents.Five.onEvent(browserEvents.KeyEvent.Pressed, function () {
    callTest(4)
})
browserEvents.Six.onEvent(browserEvents.KeyEvent.Pressed, function () {
    callTest(5)
})
browserEvents.Seven.onEvent(browserEvents.KeyEvent.Pressed, function () {
    callTest(6)
})


controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (testNumber == 5) amp += 5;
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (testNumber == 5) amp -= 5;
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (testNumber == 5) speed += 0.5;
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (testNumber == 5) speed -= 0.5;
})

// Functions
function callTest(testNum: number) {
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
        case 1:

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
            controller.moveSprite(mySprite)
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
            mySprite2.x = 30

            break
        case 2:
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
            mySprite3 = sprites.create(img`
                . . . . . . f f f f . . . . . .
                . . . . f f f 2 2 f f f . . . .
                . . . f f f 2 2 2 2 f f f . . .
                . . f f f e e e e e e f f f . .
                . . f f e 2 2 2 2 2 2 e e f . .
                . . f e 2 f f f f f f 2 e f . .
                . . f f f f e e e e f f f f . .
                . f f e f b f 4 4 f b f e f f .
                . f e e 4 1 f d d f 1 4 e e f .
                . . f e e d d d d d d e e f . .
                . . . f e e 4 4 4 4 e e f . . .
                . . e 4 f 2 2 2 2 2 2 f 4 e . .
                . . 4 d f 2 2 2 2 2 2 f d 4 . .
                . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
                . . . . . f f f f f f . . . . .
                . . . . . f f . . f f . . . . .
            `, SpriteKind.Player)

            mySprite.x = 35
            mySprite.y = 100
            mySprite2.x = 80
            mySprite3.x = 115
            mySprite3.y = 100

            break
        case 3:
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
            mySprite.fx = 80
            mySprite.fy = 80
            pause(500)
            MathX.recoilFrom(mySprite, 30, 5, 100)
            break
        case 4:
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
            pause(500)
            mySprite.vy = MathX.bounce(Math.sin(randint(50, 30) * 180 / Math.PI), 8)
            break
        case 5:
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
            mySprite3 = sprites.create(img`
                . . . . . . f f f f . . . . . .
                . . . . f f f 2 2 f f f . . . .
                . . . f f f 2 2 2 2 f f f . . .
                . . f f f e e e e e e f f f . .
                . . f f e 2 2 2 2 2 2 e e f . .
                . . f e 2 f f f f f f 2 e f . .
                . . f f f f e e e e f f f f . .
                . f f e f b f 4 4 f b f e f f .
                . f e e 4 1 f d d f 1 4 e e f .
                . . f e e d d d d d d e e f . .
                . . . f e e 4 4 4 4 e e f . . .
                . . e 4 f 2 2 2 2 2 2 f 4 e . .
                . . 4 d f 2 2 2 2 2 2 f d 4 . .
                . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
                . . . . . f f f f f f . . . . .
                . . . . . f f . . f f . . . . .
            `, SpriteKind.Player)

            mySprite.x = 40
            mySprite2.x = 80
            mySprite3.x = 120
            break
        case 6:
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

            let radius = 35

            for (let angle = 0; angle < 360; angle += 5) {
                mySprite.setPosition(
                    80 + radius * Math.cos(angle * MathX.Constants.DEG_TO_RAD),
                    60 + radius * Math.sin(angle * MathX.Constants.DEG_TO_RAD)
                )
                pause(20)
            }
            break
        default:
            throw "Test undefined"
    }
}
