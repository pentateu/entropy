# Goals
Experiment with molecuer setup using JS.. so I can replicate with ClosureScript

# Elk Setup
https://github.com/deviantony/docker-elk

Docker setup
https://logz.io/blog/docker-logging/


# API e2e tests
Using a tool called just-api -> https://kiranz.github.io/just-api
Decided to use k6 over just-api .. so we can do monitoring tests.. and also load tests.

# Kafka 
For development using -> https://github.com/Landoop/fast-data-dev

# Jaeger Install on Moleculer

Create a service and point to Jaeger collector?


# Next Steps
1) implement a test/service with Kakfa to test it end ot end
    1) Article on Kafka and CQRS -> https://docs.confluent.io/current/streams/concepts.html?_ga=2.145753524.1406334656.1535876548-637902364.1535418660#ktable
    2) video on Kafka streams -> https://kafka.apache.org/documentation/streams/
    3) node kafka streams loibrary -> https://github.com/nodefluent/kafka-streams
    4) 
2) Change monitor tests to k6
    1) Check a HTML reporter for k6.. so replace the one for just-api
3) Try to setup traefic as load balancer ;)
4) try to use the graphql plugin -> https://github.com/MerlinLabs/moleculer-graphql
5) use elastic search and mongo as agregates and do an end to end test/service 
6) create a main health dashboard UI with all the envs.. all ;) -> one place to check the health of the whole system.
    1) Display Jest restuls / coverage
    2) k6 results
    3) links to all the diferent UIS
        1) Jaeger, Prometheus, 
        2) Kafka, 
        3) traefic, 
        4) KIbana and ELK stuff
        5) kubernets and etc
7)  Deploy on Kubernets
    1)  Prometheus tools for kubernets -> https://github.com/coreos/prometheus-operator