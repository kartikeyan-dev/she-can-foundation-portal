// Loader

window.addEventListener("load", () => {

    document.getElementById("loader").style.display = "none";

});

// Toast Notification

function showToast(message){

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    },3000);
}

// Contact Form

document.getElementById("contactForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("/submit",{
        method:"POST",
        body:formData
    });

    const result = await response.json();

    showToast(result.message);

    if(result.status === "success"){
        this.reset();
    }
});

// Dark Mode Toggle

document.getElementById("darkModeToggle")
.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});

// Scroll Reveal

function reveal(){

    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        if(elementTop < windowHeight - 100){

            element.classList.add("active");

        }
    });
}

window.addEventListener("scroll", reveal);

// Animated Counter

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    counter.innerText = "0";

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");

        const current = +counter.innerText;

        const increment = target / 100;

        if(current < target){

            counter.innerText =
                `${Math.ceil(current + increment)}`;

            setTimeout(updateCounter, 30);

        } else {

            counter.innerText = target;
        }
    };

    updateCounter();
});