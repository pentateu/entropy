# Goals
1) Write microservices with ClosureScript and Moleculer.services
2) 

## Roadmap
1) Basic moleculer setup
2) Integration tests pure in closureScript with moleculer broker, snapshot and all other goodies
    1) Recomended tool for testing is clojure.test
    2) Snapshot library -> https://github.com/juxt/snap
    3) 
3) config service. (first step to be used in integration tests for DB Url, Redis, NATS and etc)
    1) Make the config service in a way that can be used when a service is bootstraping to get NATS, REDIS and other setting
    2) Make the service completely independent and always using nthe config service..
    3) think about fall back.. when config service is not available.
4) moleculer
    1) Cache
    2) try other transporters (p2P for example)
5)  Prometheus
6)  JAeger
7)  Managment UI 
    1)  Have Jaeger and Prometheus and other metrics
    2)  UI to see NATS streaming content also.
    3)  UI to see REDIS content
8)  Kafka
9)  Implement some sceanarios end to end with CQRS to see all components working
    1)  Add rollback and retry scenarios
    2)  hook it up with jaeger and the mangemnt UI
10) Kubernets Infra
11) Deployment Unit
    1)  Mapping of which moleculer services are part of the deployment
12) Encryption service
13) Development Workflow
    1)  Think about versions.. 
        1)  version of individual services - that can be used in call URL ex. broker.call("v2.posts.find");
        2)  version of deployment
        3)  GitFlow and etc

# Standalone Usage

1. `lein figwheel`
2. (In another window) `node target\js\compiled\micro_services.js ...`


# Production Builds

1. `lein cljsbuild once prod`
2. `node server.js ...`

# REPL Usage (Vim)

You can now connect to Figwheel's REPL through
[Piggieback](https://github.com/cemerick/piggieback) using
[vim-fireplace](https://github.com/tpope/vim-fireplace):

1. `lein repl`
2. `(fig-start)`
3. `(cljs-repl)`
4. (In another window) `node target\js\compiled\micro_services.js ...`
5. (In Vim) `:Piggieback (figwheel-sidecar.repl-api/repl-env)`

Standard `vim-fireplace` commands will now work in the context of the
Figwheel process:

- `cqp` to send a command from Vim to the REPL
- `cpa...` to evaluate a form without saving or reloading the file
- etc.
