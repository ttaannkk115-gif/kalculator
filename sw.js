self.addEventListener('push', function(event) {
    const options = {
        body: 'Появилась новая работа!',
        icon: 'logo.png',
        badge: 'logo.png',
        vibrate: [200, 100, 200],
        tag: 'new-job',
        renotify: true
    };
    event.waitUntil(self.registration.showNotification('VoltMaster', options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
