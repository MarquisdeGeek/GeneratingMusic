let audioContext;
let playState = {
    sourceNodeList: [],
    timeoutList: [],
    intervalList: []
};

function initAudio() {
    audioContext = new AudioContext();
}

function playLoop(audioBuffer, pan, rate) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.playbackRate.value = rate;

    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    pannerNode.connect(audioContext.destination);

    sourceNode.start();
    playState.sourceNodeList.push(sourceNode);

    return sourceNode;
}

function playSample(audioBuffer) {
    let sourceNode = audioContext.createBufferSource();

    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);

    sourceNode.start();
    playState.sourceNodeList.push(sourceNode);

    return sourceNode;
}

function stopAllSamples() {
    playState.sourceNodeList.forEach((sourceNode) => {
        sourceNode.stop();
    });

    playState.sourceNodeList = [];
}


function rescale(value, fromStart, fromEnd, toStart, toEnd) {
    if (fromStart == fromEnd) {
        // Avoid /0 errors by picking dead centre
        return (toEnd - toStart) / 2 + toStart;
    }
    let newValue = (((value - fromStart) * (toEnd - toStart)) / (fromEnd - fromStart)) + toStart
    return newValue;
}

function fetchSample(path) {
    return fetch((path))
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
}
