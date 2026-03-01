importscripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importscripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyD-dIC8bm8y4kay7RXmMrys2wOMLA5o8vY",
    authDomain: "voltmaster-332c0.firebaseapp.com",
    databaseURL: "https://voltmaster-332c0-default-rtdb.firebaseio.com",
    projectId: "voltmaster-332c0",
    storageBucket: "voltmaster-332c0.firebasestorage.app",
    messagingSenderId: "312337098429",
    appId: "1:312337098429:web:663e0f6787bd62d19bf9d4"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'logo.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
