let phaseSliderIdx = 0;
let remix = [];


async function initExample() {
    $('#status').text("Loading samples...");

    initAudio();
    await loadStems();
    initUI();
    initRemixUI();

    $('#status').text("");
}

function initRemixUI() {
    let container = $("#slider-container");
    remix.forEach((stem) => {
        let divLabel = $("<div>").text(`Sample #${phaseSliderIdx+1} (${Math.ceil(stem.sample.duration)}s):`);
        container.append(divLabel);

        container.append($("<span>").text("Start at:"));
        addSliderHalf(stem.firstDelay / 1000);

        container.append($("<span>").text("Loop at:"));
        addSliderHalf(stem.repeatsAfter / 1000);

        ++phaseSliderIdx;
    });

}

async function loadStems() {
    // durations     73  27   4   7   5  10  41
    let firstList = [0, 11, 3, 17, 5, 7, 29];
    let delayList = [0, 37, 11, 13, 7, 17, 53];

    for (let i = 0; i < 7; ++i) {
        let filename = `ex2/res/0${i}.mp3`;
        let sample = await fetchSample(filename);
        let stem = {
            sample: sample,
            firstDelay: firstList[i] * 1000,
            repeatsAfter: delayList[i] * 1000
        };

        remix.push(stem);
    }
}

function playRemix() {
    remix.forEach((stem) => {
        let timeout = setTimeout(() => {
            playSample(stem.sample);
            // Then every N seconds
            if (stem.repeatsAfter) {
                let interval = setInterval(() => {
                    playSample(stem.sample);
                }, stem.repeatsAfter);
                playState.intervalList.push(interval);
            }
        }, stem.firstDelay);

        playState.timeoutList.push(timeout);
    })
}


function stopAllTimers() {
    playState.timeoutList.forEach((t) => {
        clearTimeout(t);
    });
    playState.timeoutList = [];
    //
    playState.intervalList.forEach((t) => {
        clearInterval(t);
    });
    playState.intervalList = [];
}

function reflectRemixUI() {
    let theSliders = $(".sliderhalf").children();

    remix.forEach((stem, idx) => {
        stem.firstDelay = parseInt($(theSliders[idx * 2 + 0]).text()) * 1000;
        stem.repeatsAfter = parseInt($(theSliders[idx * 2 + 1]).text()) * 1000;

        console.log(idx, stem.firstDelay, stem.repeatsAfter);
    });
}


function start() {
    reflectRemixUI();
    playRemix();
}

function stop() {
    stopAllTimers();
    stopAllSamples();
}
