Pomelo on k8s
=============

* Scenario 1:

In scenario 1, there is many connectors(frontend servers) and many games (backend servers), all traffic from clients is received by connectors and is routed to games in a sticky way (sessions are used to persist which backend server the client should talk to).

It is guaranteed that every client will talk with only one connector and only one backend server during a single session.

The logic is the following:

First the client connect to a connector server using k8s service (type loadbalancer), after connecting it will keep a open socket mapping a client to a connector pod guaranteeing that the client will keep talking to the same connector, after calling any method that requires the connector to make an rpc to a game server, the router in routeUtil will persist in the player session the server that it routed the request to, thereby guaranteeing that the client will always talk to the same backend server.

The servers will use a redis to find each other and will be able to talk to each other very fast using it's pods internal ips (ips in k8s network).

In my benchmarks, for this case I had up to 100 concurrent clients connected and the pods both from frontend and backend servers consumed up to 14% cpu only despite the rpcs that were being done in each tick.

Note that in this case the backend server is only broadcasting the same message to all clients, this way pomelo can split the users in groups and send only 1 rpc to each frontend server each tick. In a case that the backend servers would need to send a different message to each client this performance will get worse, I have not tested this scenario yet.
