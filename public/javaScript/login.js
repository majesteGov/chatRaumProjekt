const form = document.querySelector(".login form"),
    continueBtn = form.querySelector(".button input"),
    errorText = form.querySelector(".error-txt");


form.onsubmit = (e) => {
    e.preventDefault(); //preventing form from Submitting 
}

continueBtn.onclick = () => {
    // console.log("Hello")
    // we start with Ajax 
    let xhr = new XMLHttpRequest(); // creating XML object
    xhr.open("POST", "php/login.php", true);
    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            let data = xhr.response;
            console.log(data);
            if (data == "success") {

                location.href = "index.html";
            }
            else {
                errorText.textContent = data;
                errorText.style.display = "block";

            }
        }
    }
    let formData = new FormData(form);
    xhr.send(formData);

}
