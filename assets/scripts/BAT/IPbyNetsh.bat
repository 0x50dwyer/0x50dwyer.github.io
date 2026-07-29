netsh interface ipv4 set address name="Ethernet0" static 192.168.1.2 255.255.255.0 192.168.1.1
netsh interface ipv4 set dnsservers name="Ethernet0" source=static address="4.4.4.4" validate=no
netsh interface ipv4 add dnsservers name="ethernet0" address="8.8.8.8" validate=no index=2