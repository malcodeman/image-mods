function disableAnimations() {
    "use strict";
    var login_screen = document.getElementById("login_screen");
    if (login_screen.paused) {
        login_screen.play();
    } else {
        login_screen.pause();
    }
}

function disableMusic() {
    "use strict";
    var login_music = document.getElementById("login_music");
    if (login_music.paused) {
        login_music.play();
    } else {
        login_music.pause();
    }
}

function main() {
    "use strict";
    document.getElementById("disable_animations").addEventListener("click", disableAnimations);
    document.getElementById("disable_music").addEventListener("click", disableMusic);
}
main();