let token = '';
// eslint-disable-next-line
document.getElementById('outputForm').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('massage').innerText = '';
  let form = document.getElementById('sendForm');
  
  fetch('/post', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form[0].value,
      password: form[1].value,
      token: localStorage.getItem('token'),
    }),

  })
  .then(res => res.json())
  .then(data => {
    if (data.errorValidate) {
      const massage = document.getElementById('massage');
      if (data.error[0].email) {
        massage.innerText = data.error[0].email;
        if (data.error[1]) {
          massage.innerText += '/' + data.error[1].password;
        }
      } else {
        massage.innerText = data.error[0].password;
      }
    } else {
      localStorage.setItem('token', data.token);
    }
  })
  .catch(function(error) {
    console.log('error');
  });
});

