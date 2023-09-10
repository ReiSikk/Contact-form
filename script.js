let contactFormInfo = {
    name: "",
    email: "",
    message: ""
};

const flags = {
    name: false,
    email: false,
    message: false,
    day: false
};

const serviceID = "service_yohdays"
const templateID = "template_6zpwgwj"

// Contact form info
const contactForm = document.querySelector("form");
const nameInput = document.querySelector("input[id=name]");
const emailInput = document.querySelector("input[id=email]");
const messageInput = document.querySelector("textarea");
const submitBtn = document.querySelector("input[type=submit]");

// Function to check name
function checkName(e) {
    console.log("Checking name");
    const name = nameInput.value.trim();
    const parts = name.split(' ');
    if (parts.length >= 2 && parts[1].length > 1) {
        let cleanedInput = name.replace(/[.\s]+$/, '');
        cleanedInput = cleanedInput.replace(/\b\w/g, char => char.toUpperCase());
        contactFormInfo.name = cleanedInput;
        flags.name = true;
    } else {
        flags.name = false;
    }
}

// Function to check email
function checkEmail(e) {
    console.log("Checking email");
    const email = emailInput.value.trim();
    const correctEmail = email.includes("@cphbusiness.dk");
    if (correctEmail) {
        emailInput.style.border = "2px solid green";
        contactFormInfo.email = email;
        flags.email = true;
    } else {
        emailInput.style.border = "2px solid red";
        flags.email = false;
    }
}

// Function to check message
function checkMessage(e) {
    console.log("Checking message");
    const message = messageInput.value;
    if (message.length >= 8) {
        contactFormInfo.message = message;
        flags.message = true;
    } else {
        flags.message = false;
    }
}

// Function to check day
function checkDay(e) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    if (currentDay === 5 || currentDay === 6 || currentDay === 0) {
        flags.day = false;
        alert("Can't submit form on Fridays, Saturdays and Sundays");
    } else {
        flags.day = true;
    }
}

// Add event listeners
nameInput.addEventListener("keyup", checkName);
emailInput.addEventListener("keyup", checkEmail);
messageInput.addEventListener("keyup", checkMessage);
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    checkName();
    checkEmail();
    checkMessage();
    checkDay();

    if (flags.name && flags.email && flags.message && flags.day) {
        console.log("Submitting form");
        emailjs.send(serviceID, templateID, contactFormInfo)
        .then (
            (res) => {
                nameInput.value = "";
                emailInput.value = "";
                messageInput.value = "";
                console.log(res);
                alert("Form submitted successfully");
            } 
        )
        .catch((err) => console.log(err));
      
    } else {
        alert("Please fill out the form correctly");
        console.log("Form not submitted");
    }
});
