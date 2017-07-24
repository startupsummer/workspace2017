
document.forms.form.onsubmit = (event) => {
  event.preventDefault()
  const form = document.forms.form
  const formData = {
    first: form.first_name.value,
    last: form.last_name.value,
    text: form.text.value,
    quality: form.quality.value
  }
  console.log(formData)
  // eslint-disable-next-line
  fetch('/howispentsummer', {
    method: 'post',
    body: formData
  })
  .then(res => res.json())
  .then(res => {
    form.style.background = res.ok ? 'green' : 'red'
    console.dir(res)
  })
}
