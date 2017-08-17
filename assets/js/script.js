// Animation

function setAnimationState(animations_state) {
    "use strict";
    localStorage.setItem("animation_state", animations_state);
}

function getAnimationState() {
    "use strict";
    return localStorage.getItem("animation_state");
}

function loadAnimationState() {
    "use strict";
    var login_screen, animation_state, disable_animations;
    login_screen = document.getElementById("login_screen");
    animation_state = getAnimationState();
    disable_animations = document.getElementById("disable_animations");
    if (animation_state === "play") {
        login_screen.play();
        disable_animations.checked = false;
    } else {
        login_screen.currentTime = 1;
        login_screen.pause();
        disable_animations.checked = true;
    }
}

function disableAnimations() {
    "use strict";
    var login_screen = document.getElementById("login_screen");
    if (login_screen.paused) {
        login_screen.play();
        setAnimationState("play");
    } else {
        login_screen.pause();
        setAnimationState("pause");
    }
}

// Music

function setMusicState(music_state) {
    "use strict";
    localStorage.setItem("music_state", music_state);
}

function getMusicState() {
    "use strict";
    return localStorage.getItem("music_state");
}

function loadMusicState() {
    "use strict";
    var login_music, music_state, disable_music;
    login_music = document.getElementById("login_music");
    music_state = getMusicState();
    disable_music = document.getElementById("disable_music");
    if (music_state === "play") {
        login_music.play();
        disable_music.checked = false;
    } else {
        login_music.pause();
        disable_music.checked = true;
    }
}

function disableMusic() {
    "use strict";
    var login_music = document.getElementById("login_music");
    if (login_music.paused) {
        login_music.play();
        setMusicState("play");
    } else {
        login_music.pause();
        setMusicState("pause");
    }
}

// Sign in button

function activeSignIn() {
    "use strict";
    var username, password, sign_in;
    username = document.getElementById("username");
    password = document.getElementById("password");
    sign_in = document.getElementById("sign_in");
    if (username.value.length > 0 && password.value.length > 0) {
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
    if (getAnimationState() === null) {
        setAnimationState("play");
    } else {
        loadAnimationState();
    }
    if (getMusicState() === null) {
        setMusicState("play");
    } else {
        loadMusicState();
    }
}
main();