"use strict";

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() + 0.5;
        this.speed = Math.random() * 3 + 0.5;
    }

    draw() {
        cm.context.beginPath();
        cm.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        cm.context.fill();
    }
}

class Line {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.height = 300;

        const numberOfParticles = 30;
        this.particles = [];
        for (let i = 0; i < numberOfParticles; i++) {
            this.particles.push(
                new Particle(this.x, this.y)
            );
        }
    }

    draw() {
        cm.context.beginPath();
        cm.context.moveTo(this.x, this.y);
        cm.context.lineTo(this.x, this.y - this.height);
        cm.context.stroke();

        let particle;
        for (let i = 0; i < this.particles.length; i++) {
            particle = this.particles[i];
            particle.y -= particle.speed;
            if(particle.y < this.y - this.height) {
                particle.y = this.y;
            }
            particle.draw();
        }
    }
}

class Light {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 300;

        const numberOfLines = 5;
        this.lines = [];
        for (let i = 0; i < numberOfLines; i++) {
            this.lines.push(
                new Line (
                    this.x + (Math.random() * this.width - this.width * 0.5),
                    this.y
                )
            )
        }
    }

    draw() {
        let line;
        for (let i = 0; i < this.lines.length; i++) {
            line = this.lines[i];
            line.draw();
        }
    }
}