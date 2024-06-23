namespace SpriteKind {
    export const Background = SpriteKind.create()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    rotate(-0.5, reddot)
    rotate(-0.5, bluedot)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    rotate(0.5, reddot)
    rotate(0.5, bluedot)
})
function rotate (angle: number, sprite: Sprite) {
    let center = {x:64,y:200}
let point = { x: sprite.x, y: sprite.y }
sprite.x = Math.cos(angle) * (point.x - center.x) - Math.sin(angle) * (point.y - center.y) + center.x
    sprite.y = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y
}
let bluedot: Sprite = null
let reddot: Sprite = null
let centerx = 0
let centery = 0
let rotatedX = 0
let rotatedY = 0
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 128
    export const ARCADE_SCREEN_HEIGHT = 256
}
reddot = sprites.create(assets.image`reddot`, SpriteKind.Background)
bluedot = sprites.create(assets.image`bluedot`, SpriteKind.Background)
let circle = sprites.create(assets.image`circle`, SpriteKind.Background)
circle.z = -10
circle.setPosition(64, 200)
reddot.setPosition(32, 200)
bluedot.setPosition(96, 200)
