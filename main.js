"use strict";

const cm = {
    canvas: undefined,
    context: undefined,
    canvasWidth: 0,
    canvasHeight: 0,
    colors: [
        '222, 35, 18', // red
        '238, 150, 63', // orange
        '246, 228, 0', // yellow
        '110, 210, 70', // green
        '63, 145, 255', // blue
        '185, 22, 226', // purple
    ],
    colors2: [
        '255, 160, 150', // red
        '255, 200, 150', // orange
        '255, 250, 180', // yellow
        '195, 255, 170', // green
        '200, 220, 255', // blue
        '239, 173, 255', // purple
    ]
};

(function(){

    cm.canvas = document.querySelector('#the-canvas');
    cm.context = cm.canvas.getContext('2d');
    const canvasContainer = document.querySelector('.canvas-container');
    // const dpr = window.devicePixelRatio > 1 ? 2: 1;
    const dpr = 1;
    const mouse = { x: 0, y: 0 };
    const lights = [];
    let indexOfLight = 0;

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

    function draw() {
        cm.context.clearRect(0, 0, cm.canvasWidth, cm.canvasHeight);

        let light;
        let scaleRatio;

        for (let i = 0; i < lights.length; i++) {
            light = lights[i];
            scaleRatio = light.y / cm.canvasHeight + 1;
            cm.context.save();
            cm.context.translate(light.x, light.y);
            cm.context.scale(scaleRatio, scaleRatio);
            cm.context.translate(-light.x, -light.y);
            light.draw();
            cm.context.restore();
            // lights[i].draw();
        }
        requestAnimationFrame(draw);
    }

    cm.canvas.addEventListener('click', function(e) {
        if(indexOfLight >= cm.colors.length) return;
        // mouse.x = e.layerX
        // mouse.y = e.layerY
        mouse.x = e.clientX - cm.canvas.getBoundingClientRect().left;
        mouse.y = e.clientY - cm.canvas.getBoundingClientRect().top;

        const light = new Light(indexOfLight, mouse.x, mouse.y);
        lights.push(light);

        indexOfLight++;
    });


    window.addEventListener('resize', setSize);
    window.addEventListener('load', setup);

})();