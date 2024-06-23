namespace SpriteKind {
    export const Background = SpriteKind.create()
}
function rotate (angle: number, sprite: Sprite) {
    angle = angle * Math.PI / 180
    let center = {x:64,y:200}
let point = { x: sprite.x, y: sprite.y }
sprite.x = Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x
    sprite.y = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y
}
let rot_speed = 0
let obstacle: Sprite = null
let angle = 0
info.setScore(0)
let difficulty = 5
let centerx = 0
let centery = 0
let rotatedX = 0
let rotatedY = 0
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 128
    export const ARCADE_SCREEN_HEIGHT = 256
}
let reddot = sprites.create(assets.image`reddot`, SpriteKind.Background)
let bluedot = sprites.create(assets.image`bluedot`, SpriteKind.Background)
let circle = sprites.create(assets.image`circle`, SpriteKind.Background)
circle.z = -10
circle.sx = 1.05
circle.sy = 1.05
circle.setPosition(63, 200)
reddot.setPosition(32, 200)
bluedot.setPosition(96, 200)
game.onUpdateInterval(Math.constrain(1000 - (difficulty + 100) * 3, 10, 1000), function () {
    obstacle = sprites.createProjectileFromSide(assets.image`obstacle`, 0, difficulty + 100)
    obstacle.setPosition(randint(32, 96), 0)
    obstacle.sx = randint(Math.map(Math.abs(64 - obstacle.x), 0, 64, 0.5, 0.8), 0.9)
    difficulty += 5
    info.changeScoreBy(1)
    if (difficulty > 295) {
        difficulty = 300
    }
})
game.onUpdate(function () {
    rot_speed = 8
    if (controller.left.isPressed()) {
        rotate(0 - rot_speed, reddot)
        rotate(0 - rot_speed, bluedot)
    } else if (controller.right.isPressed()) {
        rotate(rot_speed, reddot)
        rotate(rot_speed, bluedot)
    }
})
