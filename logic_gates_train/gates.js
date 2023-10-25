function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function draw(m, key) {
    const canvas = document.getElementById(key);
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw data points
    m.data.forEach((point) => {
        ctx.fillStyle = point.target === 1 ? 'blue' : 'red';
        ctx.beginPath();
        ctx.arc(point.inputs[0] * (canvas.width / 1.2) + 10, point.inputs[1] * (canvas.height / 1.2) + 10, 5, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Draw decision boundary
    ctx.beginPath();
    for (let x = 0; x <= 1; x += 0.01) {
        for (let y = 0; y <= 1; y += 0.01) {
            const output = sigmoid(m.weights[0] * x + m.weights[1] * y + m.bias);
            ctx.fillStyle = output > 0.5 ? 'blue' : 'red';
            ctx.fillRect(x * (canvas.width / 1.2) + 10, y * (canvas.height / 1.2) + 10, 2, 2);
        }
    }
    ctx.stroke();
}

const gates_behaviour = {
    AND: [
        { inputs: [0, 0], target: 0 },
        { inputs: [0, 1], target: 0 },
        { inputs: [1, 0], target: 0 },
        { inputs: [1, 1], target: 1 }
    ],
    OR: [
        { inputs: [0, 0], target: 0 },
        { inputs: [0, 1], target: 1 },
        { inputs: [1, 0], target: 1 },
        { inputs: [1, 1], target: 1 }
    ],
    NAND: [
        { inputs: [0, 0], target: 1 },
        { inputs: [0, 1], target: 0 },
        { inputs: [1, 0], target: 0 },
        { inputs: [1, 1], target: 0 }
    ],
    NOR: [
        { inputs: [0, 0], target: 1 },
        { inputs: [0, 1], target: 1 },
        { inputs: [1, 0], target: 1 },
        { inputs: [1, 1], target: 0 }
    ],
    XOR: [
        { inputs: [0, 0], target: 0 },
        { inputs: [0, 1], target: 1 },
        { inputs: [1, 0], target: 1 },
        { inputs: [1, 1], target: 0 }
    ],
    XNOR: [
        { inputs: [0, 0], target: 1 },
        { inputs: [0, 1], target: 0 },
        { inputs: [1, 0], target: 0 },
        { inputs: [1, 1], target: 1 }
    ]
}