// In order to suppress the ESLint errors (Should only be used in the main sketch.js file)
/* eslint new-cap: ["error", { "newIsCapExceptions": ["p5"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-env browser */

// Import modules
import p5 from 'p5';
import FractalTree from './fractaltree';

export default new p5((sketch) => {
  let fractalTree;

  sketch.setup = () => {
    sketch.createCanvas(window.innerWidth, window.innerHeight);
    sketch.frameRate(10);
    fractalTree = new FractalTree();
  };

  sketch.draw = () => {
    sketch.background(255);

    sketch.fill(0, 0, 0, 64);
    sketch.strokeWeight(0);
    sketch.textSize(14);
    sketch.textAlign(sketch.CENTER);
    sketch.textFont('Helvetica');
    sketch.text('Move the mouse horizontally to see the tree fold-unfold', sketch.width / 2, 50);

    fractalTree.update();
    fractalTree.draw();
  };

  sketch.mouseDragged = () => {};

  sketch.keyPressed = () => {};
});
