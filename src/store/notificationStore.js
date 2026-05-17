const notifications = [];

export function pushNotification(notification) {
  notifications.push({ id: Date.now(), ...notification });
  return notifications;
}

export function getNotifications() {
  return notifications;
}
