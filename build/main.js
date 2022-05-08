(() => {
  // src/main.ts
  var canvas;
  var context;
  var start_time = void 0;
  var t = 0;
  var last_tick = 0;
  var width;
  var height;
  var keyStates = /* @__PURE__ */ new Set();
  var left_bar;
  var ball;
  var velo;
  var auto = true;
  function draw() {
    context.resetTransform();
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "grey";
    context.fillRect(10, left_bar, 20, 150);
    context.fillRect(ball[0], ball[1], 20, 20);
  }
  function update(dt) {
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
      let d = ball[1] - 75 - left_bar;
      let v = Math.min(Math.abs(d), 5);
      left_bar += Math.sign(d) * v;
    }
  }
  function loop(now = 0) {
    now /= 1e3;
    if (start_time === void 0) {
      start_time = now;
      last_tick = now;
    } else {
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
  function key(e) {
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
    let x = 5;
    if (typeof x == "number") {
    }
    x = "Test";
    document.body.removeChild(document.getElementById("noscript-text"));
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    resized();
    left_bar = height / 2;
    ball = [width / 2, height / 2];
    velo = [-3, 0];
    window.addEventListener("keydown", key);
    window.addEventListener("keyup", key);
    loop();
  }
  main();
})();
//# sourceMappingURL=main.js.map
