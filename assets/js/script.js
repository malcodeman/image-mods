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

function activeSignIn() {
    "use strict";
    var username, password, sign_in;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    sign_in = document.getElementById("sign_in");
    if (username.length > 0 && password.length > 0) {
        sign_in.classList.add("active");
    } else {
        if (sign_in.classList.contains("active")) {
            sign_in.classList.remove("active");
        }
    }
}

function main() {
    "use strict";
    document.getElementById("disable_animations").addEventListener("click", disableAnimations);
    document.getElementById("disable_music").addEventListener("click", disableMusic);
    document.getElementById("username").addEventListener("input", activeSignIn);
    document.getElementById("password").addEventListener("input", activeSignIn);
}
main();