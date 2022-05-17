var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;

// game variables
var middle = {
    x: 400,
    y: 400
}
var r = 50;
var r_pos = r;
var v_r = 150; // pixels per second
var hue = 0;
var radii = [r, r, r, r, r, r];


// system variables
var last_tick_t = 0;
var width: number;
var height: number;
var keyStates: Set<string> = new Set();
var plop = new Audio('plop.wav');


function draw() {
    context.resetTransform();
    context.clearRect(0, 0, width, height);
    // select color
    context.fillStyle = `hsl(${hue}, 100%, 50%)`

    // draw polygon/path
    context.translate(middle.x, middle.y);
    context.rotate(hue / 360 * 2 * Math.PI);
    context.beginPath();
    // context.moveTo(0, -radii[0]);

    for (let i = 0; i < radii.length; i++) {
        let phi = i * 2 * Math.PI / radii.length;
        let x = radii[i] * Math.cos(phi);
        let y = radii[i] * Math.sin(phi);
        context.lineTo(x, y);
    }

    context.fill();
}

function update(dt: number) {
    // radial position
    r_pos += v_r * dt;
    if (r_pos > 4 * r) {
        v_r = - v_r;
        r_pos = 4 * r;
    } else if (r_pos < 0.05 * r) {
        v_r = - v_r;
        r_pos = 0.05 * r;
    }
    for (let i = 0; i < radii.length; i += 2) {
        radii[i] = r_pos;
    }

    // color
    hue = (hue + 0.5);

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

function key(e: KeyboardEvent) {
    if (e.key == "ArrowUp"){
        radii.push(r);
        radii.push(r);
    } else if (e.key == "ArrowDown") {
        radii.pop();
        radii.pop();
    }
}


function click(e: MouseEvent) {
    middle.x = e.offsetX;
    middle.y = e.offsetY;
}

function main() {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d")!;
    window.addEventListener("keydown", key);
    window.addEventListener("resize", resized);
    canvas.addEventListener("click", click);
    resized();

    loop(performance.now());
}


main();