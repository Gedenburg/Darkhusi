function FindProxyForURL(url, host)
{
  if (shExpMatch(host, "*.i2p"))
  {
    return "SOCKS5 127.0.0.1:4447";
  }
  if (shExpMatch(host, "*.onion"))
  {
    return "SOCKS5 127.0.0.1:9050";
  }
  return "SOCKS5 127.0.0.1:2080";
}
