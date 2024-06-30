function saveToken(token) {
  localStorage.setItem('token', token);
}

async function validateToken() {
  const token = localStorage.getItem('token');
  if (token === null) {
    return false;
  }

  const response = await fetch('/api/posts/private', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  return response.ok;
}

function getToken() {
  return localStorage.getItem('token');
}

function deleteToken() {
  localStorage.removeItem('token');
}

export { saveToken, validateToken, getToken, deleteToken };
