import sketch from './sketch';

let leafTracer = 0;

const drawTree = (height, angle, thickness = 10) => {
  const leafColors = [sketch.color(163, 185, 75, 128),
    sketch.color(184, 226, 96, 128),
    sketch.color(132, 145, 52, 128),
    sketch.color(226, 221, 109, 128),
    sketch.color(82, 142, 45, 128),
    sketch.color(108, 238, 18, 128),
    sketch.color(21, 91, 28, 128),
  ];

  // Drawing the trunk
  sketch.stroke(103, 86, 66, 128);
  sketch.strokeWeight(thickness);
  sketch.line(0, 0, 0, -height);

  // Moving to the top of trunk
  sketch.push();
  sketch.translate(0, -height);

  if (height < 5 || thickness < 1) {
    sketch.noStroke();
    sketch.fill(leafColors[leafTracer % leafColors.length]);
    sketch.ellipse(0, 0, 5, 15);
  } else {
    sketch.push();
    sketch.rotate(angle);
    drawTree(0.66 * height, angle, thickness - 1);
    sketch.pop();

    sketch.push();
    sketch.rotate(-angle);
    drawTree(0.66 * height, angle, thickness - 1);
    sketch.pop();
  }

  sketch.pop();

  leafTracer += 1;
};

export default class FractalTree {
  constructor(rootPos = {
    x: sketch.width / 2,
    y: sketch.height,
  }, trunkHeight = sketch.height / 4) {
    this.rootPos = rootPos;
    this.trunkHeight = trunkHeight;
    this.branchAngle = Math.PI / 4;

    sketch.stroke(0, 0, 0, 64);
  }

  update() {
    if (sketch.mouseX || sketch.mouseY) {
      this.branchAngle = sketch.map(sketch.mouseX, 0, sketch.width, 0, Math.PI / 2);
    }

    leafTracer = 0;
  }

  draw() {
    sketch.push();
    sketch.translate(this.rootPos.x, this.rootPos.y);
    drawTree(this.trunkHeight, this.branchAngle);
    sketch.pop();
  }
}
