namespace SpriteKind {
    export const Background = SpriteKind.create()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 128
    export const ARCADE_SCREEN_HEIGHT = 256
}
let reddot = sprites.create(assets.image`reddot`, SpriteKind.Background)
let bluedot = sprites.create(assets.image`bluedot`, SpriteKind.Background)
let circle = sprites.create(assets.image`circle`, SpriteKind.Background)
circle.z = -10
circle.setPosition(64, 200)
reddot.setPosition(34, 200)
bluedot.setPosition(96, 200)
