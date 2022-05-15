var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;

// game variables
var x = 100;
var v = 200; // pixels per second

// system variables
var last_tick_t = 0;
var width: number;
var height: number;

function draw() {
    context.fillStyle = "gray"; // background color
    context.fillRect(0, 0, width, height);
    context.strokeRect(x, 100, 100, 100);
}

function update(dt: number) {
    x += v * dt;
    if (x > width - 200) {
        x = 100;
    }
}

function loop(t_ms: number) {
    // calculate dt
    let dt = t_ms - last_tick_t;
    last_tick_t = t_ms;

    update(dt / 1000); // to seconds
    draw();

    window.requestAnimationFrame(loop);
}

function resized() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

function main() {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d")!;
    window.addEventListener("resize", resized);
    resized();

    loop(performance.now());
}


main();