# dotPublic (`.public`) - Distributed Public TLD

> This is a work in progress and being forked from the DHT developed as part of [telehash](http://telehash.org/)

* based on the telehash kademlia DHT
* For *PUBLIC* only hashname-to-ip DNS resolution
* All hashnames and resolved IPs are public and observable by anyone
* Uses DHT to contact given hashname
* Uses hashname to handle any DNS requests (A, MX, TXT, SRV, etc)
* UDP only

## Resolver

* generates keys dynamically to query the DHT
* accepts/proxies normal DNS requests for .public TLD
* any existing DNS infrastructure can direct .public requests to a resolver

## Server

* actively maintains one or more hashnames in the DHT
* responds to encrypted DNS requests from resolvers
* may do additional proxying (act as a NAT for trusted clients)
* must have a public udp ip:port (may support NAT-PMP for home use, etc)