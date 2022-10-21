if (document.querySelector('body.chatPage')) {
  // Chat Homepage
  const H1_TITLE = document.getElementById('chatPageTitle');
  const START_CHATTING_CONTAINER = document.querySelector(
    '.start_chatting_container'
  );
  const FRIENDS = document.querySelectorAll('.friend');
  const CHAT_MESSAGES_CONTAINER = document.querySelector('.chat_messages');

  function showChat() {
    H1_TITLE.innerHTML = this.children[1].innerHTML;

    START_CHATTING_CONTAINER.classList.add('hide');

    CHAT_MESSAGES_CONTAINER.classList.remove('hide');
    FORM.classList.remove('hide');

    scrollDown();
  }

  function hideChat() {
    H1_TITLE.innerHTML = 'Home';

    START_CHATTING_CONTAINER.classList.remove('hide');

    CHAT_MESSAGES_CONTAINER.classList.add('hide');
    FORM.classList.add('hide');
  }

  FRIENDS.forEach(friend => {
    friend.addEventListener('click', showChat);
  });

  // CHAT MESSAGES
  const FORM = document.querySelector('.send_message_container');
  const TEXTAREA_TAG = document.getElementById('messageInput');
  const SEND_MESSAGE_BUTTON = document.getElementById('sendMsgButton');
  let message;
  let kebabMenuIsOpen = false;

  function scrollDown() {
    CHAT_MESSAGES_CONTAINER.scrollTo(0, CHAT_MESSAGES_CONTAINER.scrollHeight);
  }

  function openKebabMenu(kebabIcon) {
    if (kebabMenuIsOpen) return;

    let kebabAdditionalMenu = document.createElement('div');
    kebabAdditionalMenu.classList.add('kebab_additional_menu');

    kebabAdditionalMenu.innerHTML = `
      <p onclick="deleteMessage(this)">Delete Message</p>
    `;
    kebabIcon.appendChild(kebabAdditionalMenu);
  }

  function closeKebabMenu() {
    let KEBAB_ADDITIONAL_MENU = document.querySelector(
      '.kebab_additional_menu'
    );

    // KEBAB_ADDITIONAL_MENU.parentElement is the kebab icon. This line removes the kebab menu.
    if (KEBAB_ADDITIONAL_MENU) {
      KEBAB_ADDITIONAL_MENU.parentElement.removeChild(KEBAB_ADDITIONAL_MENU);
    }
  }

  document.body.onclick = () => {
    // when the user clicks anywhere on the screen while kebab menu is open
    if (kebabMenuIsOpen) {
      kebabMenuIsOpen = false;
      closeKebabMenu();
      return;
    }

    // when the user opens the kebab menu
    if (document.querySelector('.kebab_additional_menu')) {
      kebabMenuIsOpen = true;
      return;
    }
  };

  function sendMessage() {
    let newMessage = document.createElement('div');
    newMessage.classList.add('user_message_container');
    newMessage.innerHTML = `
      <div 
      role="button" 
      class="kebab_icon_container" 
      onclick="openKebabMenu(this)"
      >
        <div class="kebab_dot"></div>
        <div class="kebab_dot"></div>
        <div class="kebab_dot"></div>
      </div>
      <p>${message}</p>
      <h4>${getDate()}</h4>
    `;

    CHAT_MESSAGES_CONTAINER.appendChild(newMessage);
    scrollDown();
  }

  function deleteMessage(deleteButton) {
    CHAT_MESSAGES_CONTAINER.removeChild(
      deleteButton.parentElement.parentElement.parentElement
    );
  }

  function getDate() {
    let day = new Date().getDate();
    // month starts at 0 and I wanted to start at 1
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    // time
    let time = `${hours}:${minutes > 9 ? minutes : '0' + minutes}`;

    let date = `${day}/${month}/${year} ${time}`;

    return date;
  }

  function validateMessage() {
    message = message.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  function handleSubmit() {
    if (TEXTAREA_TAG.value.length === 0) return;

    TEXTAREA_TAG.value = '';
    TEXTAREA_TAG.focus();

    validateMessage();
    sendMessage();
  }

  FORM.addEventListener('submit', event => {
    event.preventDefault();
  });

  TEXTAREA_TAG.addEventListener('input', () => {
    message = TEXTAREA_TAG.value;
  });

  SEND_MESSAGE_BUTTON.addEventListener('click', event => {
    event.preventDefault();
    handleSubmit();
  });
} else {
  // Responsive Navbar
  const RESPONSIVE_BURGER_MENU_ICON = document.querySelector(
    '.header__navbar__responsive_burger_menu'
  );
  const CLOSE_NAVBAR_MENU_ICON = document.querySelector(
    '.close_navbar_container'
  );
  const NAVBAR = document.querySelector('.responsive_navbar');

  function openNavbar() {
    NAVBAR.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  }

  function closeNavbar() {
    NAVBAR.classList.add('hide');
    document.body.style.overflow = 'auto';
  }

  RESPONSIVE_BURGER_MENU_ICON.addEventListener('click', openNavbar);
  CLOSE_NAVBAR_MENU_ICON.addEventListener('click', closeNavbar);
}
