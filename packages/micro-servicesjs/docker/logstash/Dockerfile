ARG ELK_VERSION

# https://github.com/elastic/logstash-docker
FROM docker.elastic.co/logstash/logstash-oss:${ELK_VERSION}

# to increase entropy and make loagstah init faster :)
# RUN yum install haveged

# Add your logstash plugins setup here
# Example: RUN logstash-plugin install logstash-filter-json
