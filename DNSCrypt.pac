function FindProxyForURL(url, host) {
if (host == "127.0.0.1" && url.indexOf(":8888") != -1) {
    return "SOCKS5 127.0.0.1:8086";
  if (shExpMatch(url, "onion:*") || shExpMatch(host, "*.onion")) {
    return "SOCKS5 127.0.0.1:9050";
  }
  if (shExpMatch(url, "i2p:*") || shExpMatch(host, "*.i2p")) {
    return "PROXY 127.0.0.1:4444";
  }

  // Проверяем, доступен ли WireGuard (если он работает, wireguard.local будет разрешаться)
  if (isResolvable("wireguard.local")) {
    return "SOCKS5 127.0.0.1:8086";
  }

  return "SOCKS5 127.0.0.1:9050; DIRECT";
}
