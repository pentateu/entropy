# entropy
Experiment in creating a full stack using clojure script, Kafka, CQRS, ELK Stack for logs, react native and react all runing on Kunernets.

# Goals

## Fullstack Development Workflow 
(UI -> API -> microservices -> Functional Data Flows (Event Processing -> Agregates) -> Event Store (Kafka) -> Agregaates store (Mongo and ElasticSearch) -> Generic Cloud Infra ( Kubernet ) -> Dry INfra as Code (Terraform) -> ELK for Logs.

## Testable Development workflow
Whole stack testable at the unit level and integrated up to any level.
This enables a powerful development workflow where small units of code are testable and also slices of the system can be assembled in a realistic manner (i.e. represent a real integrated setup) to support tests of flows end to end.

### Challenges: 
#### 1) Use of existing tools 
existing tools such as JEST and try to make it work with clojureScript or we enhance clojureScript test libs to offer the same benefit as JEST (Snapshot testing is a good example).
#### 2) Integration tests 
Integration tests are powerful and need to be easy to setup and use.
#### 3) Code sharing vs versioning
There are multiple ways to share code among different parts of the system, so we need to find the best balance where the common code is easily shared and when the common code is fixed we also can easily trace where we need to deploy this common code.

### Tools and Options
CLJS Test runner -> https://github.com/bensu/doo


## FullStack Language -> clojureScript


# References

React Native + ClojureScript tips
http://cljsrn.org

