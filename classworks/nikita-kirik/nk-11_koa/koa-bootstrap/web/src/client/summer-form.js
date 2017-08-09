import * as clientApi from './api.client';

export function onSubmitSummerForm() {
  // const data = {
  //   first-name: $('#first-name-inp').val(),
  const form = $('#summer-form');
  console.log('IM HERE', clientApi);
  console.log('QWERT',new FormData(form));
  clientApi.post('/post-summer-form', null, new FormData(form));
}
