let IS_FULLSCREEN = false;
let IS_OFFSOUND = false;
let LIST_CHIP_VALUE = [
    1000,
    10000,
    100000,
    1000000,
    10000000
];
let CURRENT_CHIP_VALUE = 1000;
let TASK_TIMER = {
    BET_TIME: null
};

let LIST_SOUND = {
    SELECT_CHIP: "https://boc6.fun/assets/xocxoclive/native/d8/d802d4ff-5004-44a8-92a3-0d0bee8b646d.f3b4b.mp3",
    SELECT_BET: "https://boc6.fun/assets/xocxoclive/native/7d/7d14df4c-e558-4b05-b3e3-24b66910ae8b.f37d9.mp3"
};



window.onload = function () {
    setAspectGameContainer(16 / 9, "game-container");
    setAspectNodeBetContainer("game-container", "board-node-bet-container");
    document.getElementById("game-iframe").src = "/game/baccarat-stream/?v=" + Math.floor(Date.now() / 1000);
    $('html, body').animate({ scrollTop: $('#game-container').offset().top }, 'slow');
    initSelectBetSound();

    $(".full-screen-icon").click(() => clickFullScreen());
    $(".sound-audio-icon").click(() => clickAudioSound());

    $(".board-main-chip-select-value").on('click', 'div', function () {
        $(".board-main-chip-select-value div.active").removeClass("active");
        $(this).addClass("active");
        onChangeChipValue($(this).attr("data-value"));
    });


    // init code when here
    startActionBet("node-text-time-remain");
    fastNotify("Bắt dầu đặt cược");
}



function onChangeChipValue(value) {
    CURRENT_CHIP_VALUE = Number(value);
    playSound(LIST_SOUND.SELECT_CHIP);
}

function showHideNodeTimeRemain(status) {
    if (status) {
        $(".node-time-remain").fadeIn();
    } else {
        $(".node-time-remain").fadeOut();
    }
}

function startActionBet(nodeTime) {
    document.getElementById(nodeTime).innerHTML = "20";
    showHideNodeTimeRemain(true);
    var timeleft = 19;
    TASK_TIMER.BET_TIME = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(TASK_TIMER.BET_TIME);
            document.getElementById(nodeTime).innerHTML = "";
            showHideNodeTimeRemain(false);
            fastNotify("Chờ mở thưởng");
        } else {
            document.getElementById(nodeTime).innerHTML = timeleft;
        }
        timeleft -= 1;
    }, 1000);
}




function initSelectBetSound() {
    $(".node-player").click(() => playSound(LIST_SOUND.SELECT_BET));
    $(".node-player-double").click(() => playSound(LIST_SOUND.SELECT_BET));
    $(".node-banker").click(() => playSound(LIST_SOUND.SELECT_BET));
    $(".node-banker-double").click(() => playSound(LIST_SOUND.SELECT_BET));
    $(".node-draw").click(() => playSound(LIST_SOUND.SELECT_BET));
    $(".node-super").click(() => playSound(LIST_SOUND.SELECT_BET));
}

function fastNotify(text) {
    const notifyId = String(Math.floor(Math.random() * 124123) + 1);
    $("#fast-notify-container").append(`<div class="fast-notify" id="notify-${notifyId}" style="display: none;"></div>`);
    $("#notify-" + notifyId).html(text);
    $("#notify-" + notifyId).fadeIn();
    setTimeout(() => {
        $("#notify-" + notifyId).fadeOut(function () {
            $(this).remove(); // remove notify element when done
        })
    }, 2000);
}

function playSound(url) {
    var audio = new Audio(url);
    audio.play();
}

function clickFullScreen() {
    if (!IS_FULLSCREEN) {
        $(".full-screen-icon").html('<i class="fa fa-compress fa-3x" style="color: #00ea00;"></i>');
        showFullScreen(true, "game-container");
        IS_FULLSCREEN = true;
    } else {
        $(".full-screen-icon").html('<i class="fa fa-expand fa-3x" style="color: #00ea00;"></i>');
        showFullScreen(false, "game-container");
        IS_FULLSCREEN = false;
    }
}

function clickAudioSound() {
    if (!IS_OFFSOUND) {
        $(".sound-audio-icon").html('<i class="fa fa-volume-high fa-3x" style="color: #00ea00;"></i>');
        document.getElementById('game-iframe').contentWindow.AudioSound();
        IS_OFFSOUND = true;
    } else {
        $(".sound-audio-icon").html('<i class="fa fa-volume-xmark fa-3x" style="color: #00ea00;"></i>');
        document.getElementById('game-iframe').contentWindow.AudioSound();
        IS_OFFSOUND = false;
    }
}

function showFullScreen(status, temp) {
    if (status) {
        var elem = document.getElementById(temp);
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function setAspectNodeBetContainer(parrentElementId, elementId) {
    var parrentElement = $("#" + parrentElementId);
    var elementElement = $("#" + elementId);
    var currentWidth = parrentElement.outerWidth(false); // 1670

    elementElement.css("width", "1081px");
}

function setAspectGameContainer(aspect, elementId) {
    var div = $("#" + elementId);
    div.css("height", "100%").css("width", "100%");
    var height = div.outerHeight(false);
    var width = div.outerWidth(false);
    var fullaspect = width / height;
    if (aspect > fullaspect) {
        //adjust height
        div.css("height", width / aspect);
    } else {
        //adjust width
        div.css("width", height * aspect);
    }
}