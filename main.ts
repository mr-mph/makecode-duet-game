namespace SpriteKind {
    export const Background = SpriteKind.create()
    export const Static = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game_over = true
    sprite.startEffect(effects.disintegrate)
    pause(100)
    game.gameOver(false)
})
function rotate (angle: number, sprite: Sprite) {
    angle = angle * Math.PI / 180
    let center = {x:64,y:200}
let point = { x: sprite.x, y: sprite.y }
sprite.x = Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x
    sprite.y = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y
}
let bg2: Sprite = null
let bg1: Sprite = null
let obstacle: Sprite = null
let rot_speed = 0
let ob_scaling = 0
let angle = 0
let game_over = false
let textSprite = textsprite.create("0")
let score_bg = sprites.create(assets.image`score bg`, SpriteKind.Static)
let score = -1
scaling.scaleToPixels(textSprite, 13, ScaleDirection.Uniformly, ScaleAnchor.Middle)
scaling.scaleToPercent(score_bg, 400, ScaleDirection.Uniformly, ScaleAnchor.Middle)
textSprite.setPosition(105, 10)
score_bg.setPosition(104, 24)
score_bg.z = 5
textSprite.z = 6
let difficulty = 5
let backgroundz = -1000
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 128
    export const ARCADE_SCREEN_HEIGHT = 256
}
let reddot = sprites.create(assets.image`reddot`, SpriteKind.Player)
let bluedot = sprites.create(assets.image`bluedot`, SpriteKind.Player)
let circle = sprites.create(assets.image`circle`, SpriteKind.Static)
circle.z = -10
circle.sx = 1.05
circle.sy = 1.05
circle.setPosition(63, 200)
reddot.setPosition(32, 200)
bluedot.setPosition(96, 200)
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Background)) {
        scaling.scaleByPixels(value, 1.5, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        scaling.scaleByPixels(value, 1.5, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        if (value.scale > 7) {
            sprites.destroy(value)
        }
    }
})
game.onUpdate(function () {
    textSprite.setText(convertToText(score))
    ob_scaling = Math.sin(game.runtime() / 250) * 0.8
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        if (game_over) {
            value.vy = 0
        } else {
            scaling.scaleByPercent(value, ob_scaling, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        }
    }
})
game.onUpdate(function () {
    rot_speed = 7
    if (!(game_over)) {
        if (controller.left.isPressed()) {
            rotate(0 - rot_speed, reddot)
            rotate(0 - rot_speed, bluedot)
        } else if (controller.right.isPressed()) {
            rotate(rot_speed, reddot)
            rotate(rot_speed, bluedot)
        }
    }
})
game.onUpdateInterval(Math.constrain(1500 - (difficulty + 50) * 2, 10, 1500), function () {
    obstacle = sprites.createProjectileFromSide(assets.image`obstacle`, 0, difficulty + 50)
    obstacle.z = -5
    obstacle.setPosition(randint(32, 96), 0)
    obstacle.sx = randint(Math.map(Math.abs(64 - obstacle.x), 0, 64, 0.5, 0.8), 0.9)
    scaling.scaleByPercent(obstacle, 20, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    difficulty += 2
    score += 1
    if (difficulty > 295) {
        difficulty = 300
    }
})
game.onUpdateInterval(500, function () {
    if (backgroundz % 2 == 0) {
        bg1 = sprites.create(assets.image`bg_dark`, SpriteKind.Background)
        bg1.z = backgroundz
        scaling.scaleToPixels(bg1, 2, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    } else {
        bg2 = sprites.create(assets.image`bg_light`, SpriteKind.Background)
        bg2.z = backgroundz
        scaling.scaleToPixels(bg2, 2, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    }
    backgroundz += 1
})
