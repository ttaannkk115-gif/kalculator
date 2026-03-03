self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    // Берем ссылку из данных пуша или открываем главную по умолчанию
    const targetUrl = event.notification.data && event.notification.data.url 
                      ? event.notification.data.url 
                      : 'index.html';

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((windowClients) => {
            // Если вкладка уже открыта, переходим в неё
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url.includes(targetUrl) && 'focus' in client) {
                    return client.focus();
                }
            }
            // Если нет — открываем новую
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
