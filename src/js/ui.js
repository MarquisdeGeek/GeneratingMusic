function initUI() {

    $("#btnGo").click(async() => {
        start();
    });

    $("#btnStop").click(async() => {
        stop();
    });
}


function addSlider() {
    let divSlider = $("<div>")
        .addClass("slider")
        .slider({
            min: -100,
            max: 100,
            value: 0,

            create: function() {
                $($(this).children()[0]).text($(this).slider("value"));
            },
            slide: function(event, ui) {
                $($(this).children()[0]).text(ui.value);
            }
        })

    $(divSlider.children()[0]).css({
        width: "3em",
        height: "1.6em",
        top: "50%"
    });

    $("#slider-container").append(divSlider);
}

function addSliderHalf(value) {
    let divSlider = $("<div>")
        .addClass("sliderhalf")
        .slider({
            min: 0,
            max: 100,
            value: value,

            create: function() {
                $($(this).children()[0]).text($(this).slider("value"));
            },
            slide: function(event, ui) {
                $($(this).children()[0]).text(ui.value);
            }
        })

    $(divSlider.children()[0]).css({
        width: "3em",
        height: "1.6em",
        top: "50%"
    });

    $("#slider-container").append(divSlider);
}
