// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    user.sendEmailVerification().then(function () {
      // Email sent.
      document.getElementById("result").innerHTML = "Please check your email in order to verify"
    }).catch(function (error) {
      // An error happened.
    });

  } else {
    // window.location = 'index.html';
  }
});

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  var email = signupForm['signup-email'].value;
  var password_1 = signupForm['signup-password-1'].value;
  var password_2 = signupForm['signup-password-2'].value;

  if (password_1 == password_2) {
    password = password_1
    try {

      // sign up the user
      auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.

        var errorCode = error.code;
        document.getElementById("result").innerHTML = "Unable to register"
        console.log(error.Message);
      });
    }
    catch (err) {
      console.log(err);
      document.getElementById("result").innerHTML = "Unable to register"
    }
  }
  else {
    document.getElementById("result").innerHTML = "Passwords do not match"
  }



});

