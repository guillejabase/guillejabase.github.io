let body = document.querySelector("body");
let header = document.querySelector("header");
let menu = document.querySelector(".menu");
let sections = document.querySelectorAll("section");
let footer = document.querySelector("footer");

menu.addEventListener("click", () => {
    header.classList.toggle("list");
    body.classList.toggle("list");

    for (let a of header.querySelectorAll(".container .nav a")) {
        a.addEventListener("click", () => {
            header.classList.remove("list");
            body.classList.remove("list");
        });
    }
});

window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 25);
});

window.onscroll = () => {
    skills();

    for (let section of sections) {
        let top = window.scrollY;
        let offset = section.offsetTop - 360;

        if (top >= offset && top < offset + section.offsetHeight) {
            for (let a of header.querySelectorAll(".container .nav a.spanish")) {
                a.classList.remove("active");
                header.querySelector(`.container .nav a.spanish[href*=${section.getAttribute("id")}]`).classList.add("active");
            }
            for (let a of header.querySelectorAll(".container .nav a.english")) {
                a.classList.remove("active");
                header.querySelector(`.container .nav a.english[href*=${section.getAttribute("id")}]`).classList.add("active");
            }
        }
    }
};

header.querySelector(".container .nav .switchs label.language input").addEventListener("click", () => {
    header.classList.toggle("language");

    for (let section of sections) {
        section.classList.toggle("language");
    }

    footer.classList.toggle("language");
});

header.querySelector(".container .nav .switchs label.mode input").addEventListener("click", () => {
    header.classList.toggle("mode");

    for (let section of sections) {
        section.classList.toggle("mode");
    }

    footer.classList.toggle("mode");
});

function skills() {
    let curriculum = document.getElementById("curriculum");

    if (window.innerHeight - curriculum.getBoundingClientRect().top > 600) {
        let skills = document.getElementsByClassName("progress");

        skills[0].classList.add("jsorts");
        skills[1].classList.add("htmlandcss");
        skills[2].classList.add("python");
        skills[3].classList.add("java");
        skills[4].classList.add("csharp");
    }
}