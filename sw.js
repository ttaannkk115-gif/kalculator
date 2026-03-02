self.addEventListener('push', function(event) {
    let data = { title: 'VoltMaster', body: 'Новая шабашка!', icon: 'logo.png' };
    if (event.data) {
        try { data = event.data.json(); } catch (e) { data.body = event.data.text(); }
    }
    const options = {
        body: data.body,
        icon: 'logo.png',
        badge: 'logo.png',
        vibrate: [200, 100, 200],
        sound: 'default' 
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
