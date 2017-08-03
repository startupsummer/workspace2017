import { post } from './api.client';

document.forms.summer.onsubmit = (event) => {
  event.preventDefault();
  const form = document.forms.summer;
  post('post-form', null, {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    summerSpent: form.howSpent.value,
    quality: form.quality.value,
  });
};
