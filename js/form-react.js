/* === email js === */
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  //service id - template id - #form - public key//
  emailjs
    .sendForm(
      "service_mnq64em",
      "template_mklzg9s",
      "#contact-form",
      "OZ53JzeSibg58P2v7"
    )
    .then(
      () => {
        //show sent message//
        contactMessage.textContent = "Message sent successfully ✅";

        //remove message after 5s//
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);

        //clear input field//
        contactForm.reset();
      },
      () => {
        //show error message//
        contactMessage.textContent = "Message not sent (Service error ❌";
      }
    );
};

contactForm.addEventListener("submit", sendEmail);
