self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'VOLT MASTER', body: 'Новое событие!' };
    event.waitUntil(self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'logo.png'
    }));
});
