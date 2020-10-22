var barStatus = ''
document.addEventListener("scroll", function () {
    if (window.scrollY > 50 && barStatus != "small") {
        document.getElementById("navigation").classList.remove("navBarToRegular");
        document.getElementById("navigation").classList.add("navBarToSmall");
        barStatus = 'small';
    } else if (window.scrollY < 50 && barStatus != "regular") {
        document.getElementById("navigation").classList.remove("navBarToSmall");
        document.getElementById("navigation").classList.add("navBarToRegular");
        barStatus = 'regular';
    }
});