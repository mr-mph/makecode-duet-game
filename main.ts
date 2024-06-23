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
let rot_speed = 0
let obstacle: Sprite = null
let angle = 0
let game_over = false
let backgroundz = -1000
info.setScore(0)
let difficulty = 5
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
game.onUpdateInterval(Math.constrain(1000 - (difficulty + 100) * 3, 10, 1000), function () {
    obstacle = sprites.createProjectileFromSide(assets.image`obstacle`, 0, difficulty + 100)
    obstacle.z = -5
    obstacle.setPosition(randint(32, 96), 0)
    obstacle.sx = randint(Math.map(Math.abs(64 - obstacle.x), 0, 64, 0.5, 0.8), 0.9)
    difficulty += 5
    info.changeScoreBy(1)
    if (difficulty > 295) {
        difficulty = 300
    }
})
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Background)) {
        scaling.scaleByPixels(value, 1.5, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        scaling.scaleByPixels(value, 1.5, ScaleDirection.Uniformly, ScaleAnchor.Middle)
        if (value.scale > 10) {
            sprites.destroy(value)
        }
    }
})
game.onUpdate(function () {
    rot_speed = 10
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
game.onUpdate(function () {
    if (game_over) {
        for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
            value.vy = 0
        }
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
