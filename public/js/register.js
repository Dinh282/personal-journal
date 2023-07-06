const registrationHandler = async event => {
  event.preventDefault();

  const firstName = document.querySelector('#firstName').value.trim();
  const lastName = document.querySelector('#lastName').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if(password.length < 7){
    showAlert({
      target: 'registration-alert',
      message: 'Password is too short, it must be at least 7 characters long!',
      type: 'danger',
    });
    return
  }

  if (email && password) {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const { message } = await response.json();
      // eslint-disable-next-line no-undef
      showAlert({
        target: 'registration-alert',
        message,
        type: 'danger',
      });
    }
  }
};

document
  .querySelector('.registration-form')
  .addEventListener('submit', registrationHandler);
