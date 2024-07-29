function FindProxyForURL(url, host)
{
  if (shExpMatch(host, "*.i2p"))
  {
    return "HTTP 127.0.0.1:4444";
  }
  if (shExpMatch(host, "*.onion"))
  {
    return "SOCKS5 127.0.0.1:9050";
  }
  return "SOCKS5 127.0.0.1:2080";
}
