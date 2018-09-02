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
    1) Prometheus tools for kubernets -> https://github.com/coreos/prometheus-operator
2) Change monitor tests to k6
3) implement a test/service with Kakfa to test it end ot end
4) try to use the graphql plugin -> https://github.com/MerlinLabs/moleculer-graphql
5) connect elk and see moleculer logs in there
6) connect elk to see all components logs in there
7) use elastic search and mongo as agregates and do a  end to end test/service 
8) create a main health dashboard UI with all the envs.. all ;) -> one place to check the health of the whole system.
    1) Display Jest restuls / coverage
    2) k6 results
    3) links to all the diferent UIS
        1) Jaeger, Prometheus, 
        2) Kafka, 
        3) traefic, 
        4) KIbana and ELK stuff
        5) kubernets and etc
9)  