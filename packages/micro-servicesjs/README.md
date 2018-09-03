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
1) Setup Jaeger and Prometheus
    1) have jaeger and Prometheus working collection from all components they possible can
    2) easy way to define and create new metrics.. add one from a sample service.
3) implement a test/service with Kakfa to test it end ot end
    1) Article on Kafka and CQRS -> https://docs.confluent.io/current/streams/concepts.html?_ga=2.145753524.1406334656.1535876548-637902364.1535418660#ktable
    2) video on Kafka streams -> https://kafka.apache.org/documentation/streams/
    3) node kafka streams loibrary -> https://github.com/nodefluent/kafka-streams
    4) 
4) Change monitor tests to k6
    1) Check a HTML reporter for k6.. so replace the one for just-api
5) Try to setup traefic as load balancer ;)
6) try to use the graphql plugin -> https://github.com/MerlinLabs/moleculer-graphql
7) connect elk and see moleculer logs in there
8) connect elk to see all components logs in there
9) use elastic search and mongo as agregates and do a  end to end test/service 
10) create a main health dashboard UI with all the envs.. all ;) -> one place to check the health of the whole system.
    1) Display Jest restuls / coverage
    2) k6 results
    3) links to all the diferent UIS
        1) Jaeger, Prometheus, 
        2) Kafka, 
        3) traefic, 
        4) KIbana and ELK stuff
        5) kubernets and etc
11) Deploy on Kubernets
    1)  Prometheus tools for kubernets -> https://github.com/coreos/prometheus-operator