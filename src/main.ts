export { }

// public variables
var canvas: HTMLCanvasElement;
var context: CanvasRenderingContext2D;
var start_time: number | undefined = undefined;
var t: number = 0; // seconds since start
var last_tick: number = 0;
var width: number;
var height: number;

var keyStates: Set<string> = new Set();

var left_bar: number;
var ball: [number, number];
var velo: [number, number];
var auto = true;

// main functions
function draw() {
    context.resetTransform();
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "grey";
    context.fillRect(10, left_bar, 20, 150);

    context.fillRect(ball[0], ball[1], 20, 20);

}

function update(dt: number) {
    if (keyStates.has("ArrowDown")) {
        left_bar += 5;
        auto = false;
    }
    if (keyStates.has("ArrowUp")) {
        left_bar -= 5;
        auto = false;
    }
    ball[0] += velo[0];
    ball[1] += velo[1];

    if (ball[0] < 30 && left_bar < ball[1] + 20 && ball[1] < left_bar + 150) {
        velo[0] = -velo[0];
        velo[1] = (Math.random() - 0.5) * 10;
    }

    if (ball[1] < 0 || ball[1] + 20 > height) {
        velo[1] = -velo[1];
    }

    if (ball[0] + 20 > width) {
        velo[0] = -1.2 * velo[0];
    }
    if (auto) {
        let d = (ball[1] - 75) - left_bar;
        let v = Math.min(Math.abs(d), 5)
        left_bar += Math.sign(d) * v;
    }
}


function loop(now: number = 0) {
    now /= 1000; // convert to seconds
    if (start_time === undefined) {
        // 1st run
        start_time = now;
        last_tick = now;
    } else {
        // normal tick
        t = now - start_time;
        let dt = now - last_tick;
        last_tick = now;
        update(dt);
        draw();
    }
    window.requestAnimationFrame(loop);
}



function resized() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}


function key(e: KeyboardEvent) {
    switch (e.type) {
        case "keydown":
            keyStates.add(e.key);
            break;
        case "keyup":
            keyStates.delete(e.key);
            break;
        default:
            console.warn("Wut?");

    }
}

function main() {
    let x: number | String = 5;
    if (typeof(x) == "number") {

    }
    x = "Test";
    document.body.removeChild(document.getElementById("noscript-text")!);
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    context = canvas.getContext("2d")!;
    resized();

    left_bar = height / 2;
    ball = [width / 2, height / 2];
    velo = [-3, 0];

    window.addEventListener("keydown", key);
    window.addEventListener("keyup", key);
    loop();
}

main();