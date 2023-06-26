let header = document.querySelector("header");
let menu = document.querySelector(".menu");
let sections = document.querySelectorAll("section");
let footer = document.querySelector("footer");

menu.addEventListener("click", () => {
    header.classList.toggle("list");
    document.querySelector("body").classList.toggle("list");
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
    let about = document.getElementById("about");

    if (window.innerHeight - about.getBoundingClientRect().top > 300) {
        let skills = document.getElementsByClassName("progress");

        skills[0].classList.add("jsorts");
        skills[1].classList.add("python");
        skills[2].classList.add("csharp");
        skills[3].classList.add("htmlandcss");
        skills[4].classList.add("sql");
    }
}