---
id: doc1
title: Entropy
sidebar_label: Concepts
---

Entropy - `the degree of disorder or randomness in the system.`

Fullstack architecture to develop systems that take full advantage of the bleading edge tech and tools without loosing your hair :)

Tools to create your own 10X team!


## Getting Started
```
    git clone git://...
    cd entropy
    npm install
    npm start_stack
```

## Services URLs
- **website** - this page :) + all documentation with live reload as you change - (http://localhost:3000/)
- **traefic** - reverse proxy and load balancer - (http://localhost:3001/dashboard/)
- **kibana**  - Elastic Search Web UI / Log viewer for the whole stack - (http://www.kibana.prod.docker.localhost:5601/)
- **kafka**   - Fast Data Dashboard for Kafka - (kafka.prod.docker.localhost:3030)
- **jaeger**  - Jaeger is the mnicroservices tracing tool - (http://jaeger-query.prod.docker.localhost:16686/trace/5254eb4160e44bc3)
- **prometheus** - Metrics- (http://www.prometheus.prod.docker.localhost:9090/)
- **grafana** - timeseries dashboards - (http://grafana.prod.docker.localhost:3000)




## Setup

### NATS
- Logs: 
First attempt was to send logs directly to log stash using nthe -r parameter: 
 `nats -r syslog://logstash:5001`
But issues with logstach initialization time (very slow +/- 3 mins) would cause NATS to fail loading.
So for now logging is done using docker socket -> logspout -> logstash

- Metrics: 
    - Exposed to **prometheus** on port 7777 -> *prometheus-nats-exporter* is a tool written in Go to expose NATS metrics as a prometheus endpoint - (https://github.com/nats-io/prometheus-nats-exporter)
    - prometheus-nats-exporte is deployed as a docker container idependently of the nats container.
    - Usefull metrics are:
        - xxx

### Logstash
#### Issues:

 - Logstash initialization is very slow.. so services like nats and the nats-metrics that try to send logs directly to logstash can't start.. since sometimes logstash takes up to 2 minutes to start.
 - This is not a must.. since these logs are also being picked up by logspout
This is the setup tried, but failed due to the logstash slow start-up

NATS -> (gnatsd -r syslog://logstash:5001) -> Logstash -> (No filters) ->  elasticsearch:9200
Docker logging -> syslog://logstash:5000 -> Logstash -> (Filter: Ignore Logstash Service) -> elasticsearch:9200

#### Alternatives
Logstash is resource hungry and there are alternatives worth considering. 

### Prometheus


### Graphana setup
(http://grafana.prod.docker.localhost:3000)

Dashboards:
 - Jaeger Collector -> (https://grafana.com/dashboards/6394)
 - NATS -> (https://github.com/nats-io/prometheus-nats-exporter/tree/master/walkthrough)
 - Moleculer -> (https://github.com/moleculerjs/moleculer-metrics/tree/master/packages/moleculer-prometheus/grafana-dashboards)



References:
- (https://github.com/nats-io/prometheus-nats-exporter/blob/master/walkthrough/README.md)
- (https://www.hawkular.org/blog/2017/06/26/opentracing-appmetrics.html)

#### NATS Metrics


