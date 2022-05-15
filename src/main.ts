var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;

var x = 100;

var width: number;
var height: number;

function draw() {
    context.fillStyle = "gray"; // background color
    context.fillRect(0, 0, width, height);
    context.strokeRect(x, 100, 100, 100);
}

function update() {
    x += 1;
    if (x > width - 200) {
        x = 100;
    }
}

function loop() {
    update();
    draw();

    window.requestAnimationFrame(loop);
}

function main() {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d")!;
    width = canvas.width;
    height = canvas.height;

    loop();
}


main();