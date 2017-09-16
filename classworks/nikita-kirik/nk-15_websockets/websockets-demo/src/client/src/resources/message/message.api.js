import apiClient from 'services/apiClient';

const baseUrl = 'messages';

export async function loadMessages({ roomId }) {
  return apiClient.get(baseUrl, { roomId });
}

export async function sendMessage(message) {
  return apiClient.post(baseUrl, message);
}

export async function subscribeMessageSSEEvents() {
  return apiClient.post(`${baseUrl}/stream`);
}

export async function deleteMessage(msgId) {
  return apiClient.delete(`${baseUrl}/${msgId}`);
}
