let token;

function submitForm(e) {
  e.preventDefault();

  const form = document.forms.signInForm;

  fetch('/SignIn', {
    method: "post",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: form.elements.login.value,
      password: form.elements.password.value }),
  })
    .then(res => res.json())
    .then(data => {token = data.token});
}

function getMessage(e) {
  e.preventDefault();

  const form = document.forms.getMessageForm;
  fetch('/Message', {
    method: "post",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
}
