Pomelo on k8s
=============

### Scenario 1:

In scenario 1, there is many connectors(pomelo frontend servers) and many games (pomelo backend servers), all traffic from clients is received by connectors and is routed to games in a sticky way (sessions are used to persist which backend server the client should talk to).

It is guaranteed that every client will talk with only one connector and only one backend server during a single session.

The logic is the following:

First the client connect to a connector server using k8s service (type loadbalancer), after connecting it will keep a open socket mapping a client to a connector pod guaranteeing that the client will keep talking to the same connector, after calling any method that requires the connector to make an rpc to a game server, the router in routeUtil will persist in the player session the server that it routed the request to, thereby guaranteeing that the client will always talk to the same backend server.

The servers will use a redis to find each other and will be able to talk to each other very fast using it's pods internal ips (ips in k8s network).

In my benchmarks, for this case I had up to 100 concurrent clients connected and the pods both from frontend and backend servers consumed up to 14% cpu only despite the rpcs that were being done in each tick.

Note that in this case the backend server is only broadcasting the same message to all clients, this way pomelo can split the users in groups and send only 1 rpc to each frontend server each tick. In a case that the backend servers would need to send a different message to each client this performance will get worse, I have not tested this scenario yet.

### Scenario 2 (makes use of petsets only available starting from k8s 1.3.0):

In scenario 2, there is many gate servers(pomelo frontend servers), many connectors(frontend servers) and many games (pomelo backend servers), all traffic from clients is received by a gate first that will route the client to a connector, the routing between connectors is made using an nginx which proxy all the traffic to connector servers based on the domain used to talk to it.

The logic is the following:

First the client connect to a gate server using k8s service (type loadbalancer), then the client asks for the address of a connector, the gate will return something like: pomelo-connector-0.yourdomain.com, this domain need to point to a loadbalancer created by a service pointing to the nginx cluster in k8s, nginx will then receive the traffic and route to the right connector pod (pomelo-connector-0) using the subdomain for routing.

This kind of routing is possible using k8s petsets that is available starting with version 1.3.0beta of k8s. Using the approach in the manifests it is ** only possible to route to pomelo servers that are using websockets (pomelo default connector) ** this is due to the routing based on the subdomain, it is not possible to do this kind of routing using bare TCP or UDP protocols because they don't care about the domain used in the communication.
