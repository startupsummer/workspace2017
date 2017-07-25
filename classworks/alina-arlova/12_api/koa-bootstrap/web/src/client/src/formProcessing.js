function submitForm(e) {
  e.preventDefault();

  const form = document.forms.infoForm;

  fetch('/form', {
    method: "post",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: form.elements.login.value,
      password: form.elements.password.value }),
  });
}
