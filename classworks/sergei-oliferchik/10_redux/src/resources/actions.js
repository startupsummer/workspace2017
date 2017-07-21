import * as api from './api';
import addData from '../addData';

export const chengeIssuesStatus = (number, status) => dispatch => (
  api.chengeIssuesStatus(number, status)
    .then(data => dispatch({
      type: 'CHENGE_ISSUES',
      payload: {
        id: data.id,
        state: data.state
      },
    }))
);

export const initialState = () => dispatch =>
  api.initialState()
    .then(data => dispatch({
      type: 'INITIAL_STATE',
      payload: data.map( (ussue) => ({
        id: ussue.id,
        about: ussue.body,
        state: ussue.state,
        title: ussue.title,
        number: ussue.number,
      }))
    }));

export const addIssues = () => dispatch => {
  const newData = addData.pop();
  const body = {
    "title": newData.title,
    "body": newData.about,
    "state": newData.state,
    "id": newData.id
  };

  return api.addIssues(body)
    .then(() => dispatch({
      type: 'ADD_ISSUES',
      payload: body,
    })
    )
};
