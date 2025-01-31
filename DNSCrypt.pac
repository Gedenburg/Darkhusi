var usingProxy = true;  // Флаг для отслеживания использования прокси

function FindProxyForURL(url, host) {
  // Если это запрос к поиску Google (например, www.google.com), сбрасываем прокси на прямой доступ
  if (shExpMatch(url, "https://www.google.com/*") || shExpMatch(url, "http://www.google.com/*")) {
    usingProxy = false;  // После посещения Google переключаем на прямой доступ
    return "DIRECT";
  }

  // Если это запрос к DuckDuckGo (например, duckduckgo.com), пробуем использовать прокси
  if (shExpMatch(url, "*duckduckgo.com*") || shExpMatch(host, "*duckduckgo.com*")) {
    // Если WireGuard запущен, используем прокси через WireGuard (127.0.0.1:8086)
    if (isWireGuardRunning()) {
      return "SOCKS5 127.0.0.1:8086";  // Используем WireGuard
    } else {
      // Если WireGuard не запущен, используем Tor (127.0.0.1:9050)
      return "SOCKS5 127.0.0.1:9050";  // Используем Tor
    }
  }

  // Если URL начинается с onion: или i2p:, всегда используем Tor или i2p прокси
  if (shExpMatch(url, "onion:*") || shExpMatch(url, "i2p:*")) {
    return "SOCKS5 127.0.0.1:9050";  // Используем Tor для .onion и .i2p
  }

  // Для всех остальных сайтов, если флаг прокси включен, используем прокси через WireGuard
  if (usingProxy) {
    return "SOCKS5 127.0.0.1:8086";  // Используем основной прокси (WireGuard)
  }

  // Прямой доступ для всех остальных сайтов
  return "DIRECT";
}

// Функция для проверки, запущен ли WireGuard через resolvable имя wireguard.local
function isWireGuardRunning() {
  try {
    // Проверяем, можно ли разрешить имя wireguard.local
    var ip = dnsResolve("wireguard.local");
    return ip != null; // Если имя разрешено, значит WireGuard запущен
  } catch (e) {
    return false; // Если разрешение не удалось, значит WireGuard не запущен
  }
}
