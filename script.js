let contactFormInfo = {
    name: "",
    email: "",
    message: ""
}
const flags = {
    name: false,
    email: false,
    message: false,
    day: false
}
console.log("flags", flags);





//contact form info
const contactForm = document.querySelector("form");
const nameInput = document.querySelector("input[id=name]");
const emailInput = document.querySelector("input[id=email]");
const messageInput = document.querySelector("textarea");



//disable button
let submitBtn = document.querySelector("input[type=submit]")
submitBtn.disabled = true;


//function to check inputs

function checkName(e) {
    console.log("Checking name");
    const name = e.target.value;

      // Use trim() to remove leading and trailing whitespace
      const trimmedInput = name.trim();
    

    const parts = name.split(' ');
    if(parts.length >= 2 && parts[1].length > 1) {
        let cleanedInput = trimmedInput.replace(/[.\s]+$/, '');
        cleanedInput = cleanedInput.replace(/\b\w/g, char => char.toUpperCase());
        contactFormInfo.name = cleanedInput;
        flags.name = true;
        console.log("Correct name");
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
        flags.name = false;
        console.log("Incorrect name");
}

document.querySelector("input[id=name]").addEventListener("keyup", checkName);

function checkEmail(e) {
    console.log("Checking email");
    let email = e.target.value;
    const trimmedInput = email.trim();
    const cleanedInput = trimmedInput.replace(/[.\s]+$/, '');
    const correctEmail = cleanedInput.includes("@cphbusiness.dk");
    if (correctEmail) {
        console.log("Correct email");
        e.target.style.border = "2px solid green";
        email = cleanedInput;
        flags.email = true;
        submitBtn.disabled = false;
    } else {
        console.log("Incorrect email");
        e.target.style.border = "2px solid red"; 
        submitBtn.disabled = true;
        flags.email = false;
    }

    contactFormInfo.email = email;

}
document.querySelector("input[id=email]").addEventListener("keyup", checkEmail);



function checkMessage() {
    console.log("Checking message")
    const message = document.querySelector("textarea").value;
    console.log("Disabled", submitBtn);
    if (message.length >= 8) {
        contactFormInfo.message = message;
        submitBtn.disabled = false;
        flags.message = true;
    }
    if (message.length < 8) {
        submitBtn.disabled = true;
        flags.message = false;

    }
}
document.querySelector("textarea").addEventListener("keyup", checkMessage);


function checkDay() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    console.log("currentDay:" + " " + currentDay);
    if (currentDay === 5 || currentDay === 6 || currentDay === 0) {
        alert("You can't submit the form on a weekend");
        submitBtn.disabled = true;
        flags.day = false;
    } else {
        submitBtn.disabled = false;
        flags.day = true;
    }
}


document.querySelector("input[id=name]").addEventListener("keyup", checkName);
document.querySelector("input[id=email]").addEventListener("keyup", checkEmail);
document.querySelector("textarea").addEventListener("keyup", checkMessage);

contactForm.addEventListener("submit", (e) => {
    console.log("Submitting form", flags);
    e.preventDefault();
    checkName();
    checkEmail();
    checkMessage();
    checkDay();

    if (flags.name === true && flags.email === true && flags.message === true && flags.day === true) {
        console.log("Submitting form");
    } else {
        contactForm.reset();
console.log("Form not submitted", contactForm);
return false;
    }
})};