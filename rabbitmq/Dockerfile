FROM rabbitmq:3.7-management
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt

# download and install timestamp plugin
RUN apt-get update && \
apt-get install -y curl unzip

RUN curl https://dl.bintray.com/rabbitmq/community-plugins/3.7.x/rabbitmq_message_timestamp/rabbitmq_message_timestamp-20170830-3.7.x.zip > rabbitmq_message_timestamp-20170830-3.7.x.zip && \
unzip rabbitmq_message_timestamp-20170830-3.7.x.zip && \
rm -f rabbitmq_message_timestamp-20170830-3.7.x.zip && \
mv rabbitmq_message_timestamp-20170830-3.7.x.ez plugins/

RUN rabbitmq-plugins enable rabbitmq_message_timestamp
