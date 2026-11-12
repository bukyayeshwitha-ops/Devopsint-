const form = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

const showMessage = (message, type) => {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
};

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const role = document.getElementById('role').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;

  if (!fullName || !email || !role || !password || !confirmPassword) {
    showMessage('Please complete all required fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }

  if (password.length < 8) {
    showMessage('Password must be at least 8 characters long.', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showMessage('Passwords do not match. Please try again.', 'error');
    return;
  }

  if (phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]*$/.test(phone)) {
    showMessage('Please enter a valid phone number.', 'error');
    return;
  }

  if (!terms) {
    showMessage('You must accept the terms and privacy policy.', 'error');
    return;
  }

  const userData = {
    fullName,
    email,
    phone,
    role,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem('registeredUser', JSON.stringify(userData));
  showMessage('Registration successful! Your account has been created.', 'success');
  form.reset();
});
