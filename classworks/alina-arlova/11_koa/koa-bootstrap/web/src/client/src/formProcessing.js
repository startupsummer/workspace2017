function submitForm(e) {
  e.preventDefault();

  const form = document.forms.infoForm;

  fetch('/form', {
    method: "post",
    header: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: form.elements.firstName.value,
      lastName: form.elements.lastName.value,
      description: form.elements.description.value }),
  });
}
