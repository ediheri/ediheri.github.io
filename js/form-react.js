function sendMail() {
  var params = {
    from_name: document.getElementById("fullName").value,
    email: document.getElementById("email_id").value,
    message: document.getElementById("message").value,
  };
  emailjs
    .send("service_mnq64em", "template_mklzg9s", params)
    .then(function (res) {
      alert("success!" + res.status);
    });
}
