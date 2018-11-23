# How to start

1. Zookeeper
   cd kafka_2.11-1.1.0
   bin/zookeeper-server-start.sh config/zookeeper.properties

2. Kafka server
   cd kafka_2.11-1.1.0
   bin/kafka-server-start.sh config/server.properties

3. Backend
   cd Backend
   nodemon

4. Frontend
   cd Frontend
   npm start

5. Kafka-backend
   cd kafka_2.11-1.1.0
   ./kafka-topic-creation.sh
   cd ../kafka-backend
   npm start
