"use strict";

const cm = {
    canvas: undefined,
    context: undefined,
    canvasWidth: 0,
    canvasHeight: 0
};

(function(){

    cm.canvas = document.querySelector('#the-canvas');
    cm.context = cm.canvas.getContext('2d');
    const canvasContainer = document.querySelector('.canvas-container');
    // const dpr = window.devicePixelRatio > 1 ? 2: 1;
    const dpr = 1;

    function setSize() {
        cm.canvasWidth = canvasContainer.clientWidth;
        cm.canvasHeight = canvasContainer.clientHeight;
        cm.canvas.width = cm.canvasWidth * dpr;
        cm.canvas.height = cm.canvasHeight * dpr;
        if(dpr > 1) cm.context.scale(dpr, dpr);
    }

    function setup() {
        setSize();
        draw();
    }

    const light = new Light(100, 400);

    function draw() {
        cm.context.clearRect(0, 0, cm.canvasWidth, cm.canvasHeight);
        light.draw();
        requestAnimationFrame(draw);
    }


    window.addEventListener('resize', setSize);
    window.addEventListener('load', setup);

})();