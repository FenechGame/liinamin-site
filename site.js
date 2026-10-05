(function () {
    var root = document.documentElement;

    function save(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {}
    }

    // Language switch (the initial language is set by the inline script in <head>)
    var langButtons = document.querySelectorAll("[data-set-lang]");

    function markLang() {
        langButtons.forEach(function (button) {
            button.setAttribute("aria-pressed", String(button.dataset.setLang === root.lang));
        });
    }

    langButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            root.lang = button.dataset.setLang;
            save("lang", root.lang);
            markLang();
        });
    });
    markLang();

    // Theme switch: follows the system until the visitor picks one
    var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    document.getElementById("theme-toggle").addEventListener("click", function () {
        var current = root.dataset.theme || (systemDark.matches ? "dark" : "light");
        root.dataset.theme = current === "dark" ? "light" : "dark";
        save("theme", root.dataset.theme);
    });

    // Lightbox for portfolio images
    var lightbox = document.getElementById("lightbox");
    var lightboxImage = lightbox.querySelector("img");

    document.addEventListener("click", function (event) {
        var link = event.target.closest(".gallery a");
        if (!link || !lightbox.showModal) return;
        event.preventDefault();
        lightboxImage.src = link.href;
        lightbox.showModal();
    });

    lightbox.addEventListener("click", function () {
        lightbox.close();
    });
})();
