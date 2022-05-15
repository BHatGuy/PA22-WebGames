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
    context.clearRect(0, 0, width, height);
    // select color
    context.fillStyle = `hsl(${hue}, 50%, 50%)`

    // draw polygon/path
    context.beginPath();
    context.moveTo(middle.x, middle.y - r);
    context.lineTo(middle.x + r_pos, middle.y - r_pos);
    context.lineTo(middle.x + r, middle.y);
    context.lineTo(middle.x + r_pos, middle.y + r_pos);
    context.lineTo(middle.x, middle.y + r);
    context.lineTo(middle.x - r_pos, middle.y + r_pos);
    context.lineTo(middle.x - r, middle.y);
    context.lineTo(middle.x - r_pos, middle.y - r_pos);
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
    hue = (hue + 1) % 360;
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