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

## Protocol

* builds on [hashnames](), [packets](), and [e3x messages]()
* acts as a DNS bridge resolver->server
* servers maintain the DHT

1. resolver loads seeds/cache of servers
2. resolver receives a DNS question for a `4w0fh69ad6d1xhncwwd1020tqnhqm4y5zbdmtqdk7d3v36qk6wbg.public` name
3. resolver generates new e3x endpoint for the query
4. resolver finds closest servers and creates a query message like: `{"q":"4w0"}` with it's endpoint key as the `BODY`
5. resolver base32 encodes message as a name into a DNS question for a TXT record to the server with a `.e3x` suffix
6. server sends multiple DNS TXT responses of encoded messages to the resolver with `{"a":"hashname","ip":"1.2.3.4",port:53}` and that hashname's endpoint KEY as the `BODY`
7. (recurse until hashname is found)
8. to validate the hashname, send it a handshake message and expect one in return
9. forward the original and subsequent DNS question/answers over unreliable channels of type "dns"
