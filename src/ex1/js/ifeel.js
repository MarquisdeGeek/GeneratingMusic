function initExample() {
    initUI();
    initPhaseUI();
}

function initPhaseUI() {
    $("#btnAddPhase").click(() => {
        $("#slider-container").append(addSlider());
    });

    $("#slider-container").append(addSlider());
}

function start() {
    initAudio();

    fetchSample('ex1/res/ifeel.mp3')
        .then(audioBuffer => {
            let phaseSliderList = $("#slider-container").children();
            let phaseDelta = 0.01;
            for (let idx = 0; idx < phaseSliderList.length; ++idx) {
                let value = parseInt($(phaseSliderList[idx]).text());
                let panning = rescale(idx, 0, phaseSliderList.length - 1, -1, 1);
                let phase = rescale(value, 0, 100, 1.0 - phaseDelta, 1.0 + phaseDelta);

                console.log(value, panning, phase);

                playLoop(audioBuffer, panning, phase);
            }
        })
        .catch(e => console.error(e));
}

function stop() {
    stopAllSamples();
}