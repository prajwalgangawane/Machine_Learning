const models = {}
onmessage = async (e) => {
    models[e.data.key] = new Model(e.data.key, e.data.data, e.data.options)
    models[e.data.key].trainAndVisualize(self.postMessage)
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

class Model {
    constructor(key, data, options) {
        this.weights = options && options.weights ? options.weights : [0, 0]
        this.bias = options && options.bias ? options.bias : 0
        this.learningRate = options && options.learningRate ? options.learningRate : 0.1
        this.threshold = options && options.threshold ? options.threshold : 0.01
        this.data = options && options.data ? options.data : data
        this.gate = options && options.gate ? options.gate : key
        this.maxIteration = options && options.maxIteration ? options.maxIteration : 10
    }
    train() {
        let error = 0;
        for (const example of this.data) {
            const inputs = example.inputs;
            const target = example.target;
            // Calculate the predicted output
            const output = sigmoid(this.weights[0] * inputs[0] + this.weights[1] * inputs[1] + this.bias);
            // Calculate the error
            const delta = target - output;
            error += delta * delta;
            // Update the weights and bias
            this.weights[0] += this.learningRate * delta * inputs[0];
            this.weights[1] += this.learningRate * delta * inputs[1];
            this.bias += this.learningRate * delta;
        }
        return error;
    }
    trainAndVisualize(post) {
        let txt = []
        for (let i = 0; i < this.maxIteration; i++) {
            const error = this.train();
            txt.push('<div>')
            txt.push(i.toString())
            txt.push(' : ')
            txt.push(error.toFixed(2).toString())
            txt.push('</div>')
            if (error < this.threshold) break;
        }
        post({ gate: this.gate, text: txt.join(''), model: this })
    }
}