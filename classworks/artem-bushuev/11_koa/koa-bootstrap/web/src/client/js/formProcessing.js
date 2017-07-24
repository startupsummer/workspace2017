
// eslint-disable-next-line
document.getElementById('outputForm').addEventListener('click', (e) => {

e.preventDefault();
let form = document.getElementById('sendForm');
console.log(form[0].value);

fetch('/post', {
  method: 'post',
  body: JSON.stringify({
    firstName: form[0].value,
    lastName: form[1].value,
    summerQuality: form[2].value,
  }),

})
.then(res => res.json())
.then(data => {  
  console.log(data);
})
.catch(function(error) {
  console.log('error');
});
});
