var usingProxy = true;  // Флаг для отслеживания использования прокси

function FindProxyForURL(url, host) {
  // Если это запрос к поиску Google (например, www.google.com), сбрасываем прокси на прямой доступ
  if (shExpMatch(url, "https://www.google.com/*") || shExpMatch(url, "http://www.google.com/*")) {
    usingProxy = false;  // После посещения Google переключаем на прямой доступ
  }

  // Если это запрос к .onion или .i2p сайтам, используем Tor/I2P
  if (shExpMatch(url, "*.onion") || shExpMatch(host, "*.onion")) {
    return "SOCKS5 127.0.0.1:9050";
  }
  if (shExpMatch(url, "*.i2p") || shExpMatch(host, "*.i2p")) {
    return "HTTP 127.0.0.1:4444";
  }

  // Если посещаем 127.0.0.1:8888, проверяем состояние WireGuard
  if (host == "127.0.0.1" && url.indexOf(":8888") != -1) {
    // Проверяем, запущен ли WireGuard
    if (isWireGuardRunning()) {
      return "SOCKS5 127.0.0.1:8086"; // Используем WireGuard
    } else {
      // Пробуем подключиться через Tor, если WireGuard не запущен
      return "SOCKS5 127.0.0.1:9050"; // Используем Tor
    }
  }

  // Если флаг прокси включен, используем прокси для всех остальных сайтов
  if (usingProxy) {
    return "SOCKS5 127.0.0.1:8086";  // Используем основной прокси
  }

  // Прямой доступ для всех остальных сайтов
  return "DIRECT";
}

// Функция для проверки, запущен ли WireGuard
function isWireGuardRunning() {
  try {
    var sock = new Socket();
    sock.connect("127.0.0.1", 8086); // Пример подключения к WireGuard порту
    sock.close();
    return true; // Если подключение прошло успешно, значит WireGuard работает
  } catch (e) {
    return false; // Если подключение не удалось, значит WireGuard не работает
  }
}
