function main(options) {
    const worker = new Worker('worker.js')

    Object.keys(gates_behaviour).forEach(key => {
        document.getElementById(key + '_div').innerHTML = ''
        worker.postMessage({ key, data: gates_behaviour[key], options })
        worker.onmessage = ({ data: { text, gate, model } }) => {
            document.getElementById(gate + '_div').innerHTML += text
            draw(model, gate)
            console.log("drawing updates")
        }
    })
}

document.addEventListener('DOMContentLoaded', () => main())

document.addEventListener('change', (e) => {
    console.log({ [e.target.id]: JSON.parse(e.target.value) })
    main({ [e.target.id]: JSON.parse(e.target.value) })
})