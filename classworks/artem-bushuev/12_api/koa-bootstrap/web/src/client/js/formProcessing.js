// eslint-disable-next-line
document.getElementById('outputForm').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('errorMassage').innerText = '';
  let form = document.getElementById('sendForm');
  
  fetch('/post', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form[0].value,
      password: form[1].value,
      summerQuality: form[2].value,
      token: localStorage.getItem('token'),
    }),

  })
  .then(res => res.json())
  .then(data => {
    if (data.errorValidate) {
      const massage = document.getElementById('errorMassage');
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
  .catch((error) => {
    console.log(error);
  });
});


document.getElementById('showMessage').addEventListener('click', () => {
  let token = localStorage.getItem('token');
  const massage = document.getElementById('userMassage');
  massage.innerText = '';
  fetch(`/massage/?token=${token}`)
  .then(res => res.json())
  .then(body => {
    console.log(body);
    massage.innerHTML = body.massage;
  })
  .catch((error) => {
    console.log(error);
  });
});

