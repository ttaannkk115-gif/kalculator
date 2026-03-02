importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

// Твои настройки VoltMaster
firebase.initializeApp({
  apiKey: "AIzaSyD-dIC8bm8y4kaY7RXmMrys2wOMLA5o8vY",
  authDomain: "voltmaster-332c0.firebaseapp.com",
  databaseURL: "https://voltmaster-332c0-default-rtdb.firebaseio.com",
  projectId: "voltmaster-332c0",
  storageBucket: "voltmaster-332c0.firebasestorage.app",
  messagingSenderId: "312337098429",
  appId: "1:312337098429:web:663e0f6787bd62d19bf9d4"
});

const messaging = firebase.messaging();

// Этот код ловит уведомление в фоновом режиме
messaging.onBackgroundMessage((payload) => {
  console.log('Получено фоновое сообщение:', payload);
  
  const notificationTitle = payload.notification.title || "VoltMaster";
  const notificationOptions = {
    body: payload.notification.body || "У вас новое уведомление!",
    icon: 'logo.png',
    badge: 'logo.png',
    vibrate: [200, 100, 200]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
