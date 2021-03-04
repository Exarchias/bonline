function validateEmail(email) 
    {
        var regx = /\S+@\S+\.\S+/;
        return regx.test(email);
    }


function validateForm() {
    var firstname = document.forms["theForm"]["firstname"].value;
    var lastname = document.forms["theForm"]["lastname"].value;
    var email = document.forms["theForm"]["email"].value;
    var telephone = document.forms["theForm"]["telephone"].value;
    if (firstname == "") {
      alert("First Name must be filled out");
      return false;
    } else if (lastname == "") {
        alert("Last Name must be filled out");
        return false;
    } else if (email == "") {
        alert("Email must be filled out");
        return false;
    } else if (telephone == "") {
        alert("Telephone must be filled out");
        return false;
    } else {
        if (!validateEmail(email)) {
            alert("Not an email");
            return false;
          } 
        if (isNaN(telephone)) {
              alert("Telphone needs to be a number");
              return false;
          }
        alert("That is a very valid submission");
        return true;
    }
  }