'use strict';

/* questions */
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.questions-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.questions-question');
    const toggleBtn = item.querySelector('.toggle-btn');

    function openItem() {
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.toggle-btn').textContent = '+';
        }
      });
      item.classList.add('active');
      toggleBtn.textContent = 'x';
    }

    function closeItem() {
      item.classList.remove('active');
      toggleBtn.textContent = '+';
    }

    function toggleItem() {
      if (item.classList.contains('active')) {
        closeItem();
      } else {
        openItem();
      }
    }

    question.addEventListener('click', toggleItem);

    toggleBtn.addEventListener('click', e => {
      e.stopPropagation();

      if (item.classList.contains('active')) {
        closeItem();
      } else {
        openItem();
      }
    });
  });
});

/* form */
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const successBox = document.querySelector('.form-success');

  let valid = true;

  if (!name.checkValidity() || name.value.trim().length < 2) {
    showError(name, 'Please enter your name (at least 2 characters)');
    valid = false;
  } else {
    clearError(name);
  }

  if (!email.checkValidity()) {
    showError(email, 'Please enter a valid email address');
    valid = false;
  } else {
    clearError(email);
  }

  if (!message.checkValidity() || message.value.trim().length < 10) {
    showError(message, 'Message must be at least 10 characters');
    valid = false;
  } else {
    clearError(message);
  }

  if (valid) {
    successBox.textContent = '✅ Form submitted successfully!';
    successBox.style.display = 'block';

    this.reset();

    [name, email, message].forEach(input => {
      input.classList.remove('valid', 'error');
    });

    setTimeout(() => {
      successBox.style.display = 'none';
    }, 3000);
  }
});

function showError(input, message) {
  input.classList.remove('valid');
  input.classList.add('error');

  let error = input.parentNode.querySelector('.input-error-text');

  if (!error) {
    error = document.createElement('div');
    error.className = 'input-error-text';
    input.parentNode.appendChild(error);
  }
  error.textContent = message;
}

function clearError(input) {
  input.classList.remove('error');
  input.classList.add('valid');

  const error = input.parentNode.querySelector('.input-error-text');

  if (error) {
    error.remove();
  }
}

/* burger */
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');

let closeButton = null;

burger.addEventListener('click', () => {
  nav.classList.add('active');
  document.body.classList.add('hide');

  if (!closeButton) {
    closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.textContent = '✖';
    nav.insertAdjacentElement('beforebegin', closeButton);

    closeButton.addEventListener('click', () => {
      nav.classList.remove('active');
      document.body.classList.remove('hide');
      closeButton.remove();
      closeButton = null;
      burger.style.display = 'block';
    });
  }

  burger.style.display = 'none';
});

function resetMenuOnResize() {
  if (window.innerWidth >= 992) {
    nav.classList.remove('active');
    document.body.classList.remove('hide');

    if (closeButton) {
      closeButton.remove();
      closeButton = null;
    }
    burger.style.display = 'none';
  } else {
    burger.style.display = 'block';
  }
}

window.addEventListener('resize', resetMenuOnResize);
resetMenuOnResize();
