var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;

// game variables
var middle = {
    x: 400,
    y: 400
}
var r = 100;
var r_pos = r;
var v_r = 100; // pixels per second
var hue = 0;

// system variables
var last_tick_t = 0;
var width: number;
var height: number;

function draw() {
    context.resetTransform();
    context.clearRect(0, 0, width, height);
    // select color
    context.fillStyle = `hsl(${hue}, 50%, 50%)`

    // draw polygon/path
    context.translate(middle.x, middle.y);
    context.rotate(hue / 360 * 2 * Math.PI);
    context.beginPath();
    context.moveTo(0, -r);
    context.lineTo(r_pos, -r_pos);
    context.lineTo(r, 0);
    context.lineTo(r_pos, r_pos);
    context.lineTo(0, r);
    context.lineTo(-r_pos, r_pos);
    context.lineTo(-r, 0);
    context.lineTo(-r_pos, -r_pos);
    context.fill();
}

function update(dt: number) {
    // radial position
    r_pos += v_r * dt;
    if (r_pos > 1.5 * r) {
        v_r = - v_r;
        r_pos = 1.5 * r;
    } else if (r_pos < 0.1 * r) {
        v_r = - v_r;
        r_pos = 0.1 * r;
    }
    // color
    hue = (hue + 1) % 360;
    // position
    middle.x = (middle.x + 200 * dt) % width;
    middle.y = (middle.y + 200 * dt) % height;
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