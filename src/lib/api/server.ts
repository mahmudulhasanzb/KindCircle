import { baseURL } from './baseUrl';
import { getTokenServer } from './getTokenServer';

export const serverMutation = async (path: string, method: string, data: any) => {
  const token = await getTokenServer();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseURL}${path}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteMutation = async (path: string) => {
  const token = await getTokenServer();
  const headers: HeadersInit = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseURL}${path}`, {
    method: 'DELETE',
    headers: headers,
  });
  return res.json();
};

export const serverFetch = async (path: string) => {
  const token = await getTokenServer();
  const headers: HeadersInit = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseURL}${path}`, {
    headers: headers,
    cache: 'no-store',
  });
  return res.json();
};
