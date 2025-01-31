function FindProxyForURL(url, host) {
  if (shExpMatch(url, "onion:*") || shExpMatch(host, "*.onion")) {
    return "SOCKS5 127.0.0.1:9050";
  } else if (shExpMatch(url, "i2p:*") || shExpMatch(host, "*.i2p")) {
    return "PROXY 127.0.0.1:4444";
  } else {
    return "SOCKS5 127.0.0.1:8086; SOCKS5 127.0.0.1:9050; DIRECT";
  }
}
