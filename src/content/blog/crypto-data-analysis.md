--- 
title: "Crypto data analysis"
description: "An overkill implementation of a kafka-spark crypto's trades analyser"
pubDate: "2021-05-12"
---

# Building a Real-Time Crypto Data Pipeline with Akka, Kafka, and Spark

## Introduction
Ever wondered how to get your hands on live cryptocurrency data and process it in real-time? This post will walk you through a practical project that demonstrates building a robust data pipeline using some powerful technologies: Akka for reactive stream processing, Apache Kafka as a scalable message broker, and Apache Spark Structured Streaming for real-time data consumption. We'll explore how these components work together to ingest live order book data from a cryptocurrency exchange via WebSockets.

## Core Technologies and Their Implementation

Our project leverages a combination of cutting-edge tools to create an efficient and scalable real-time data pipeline.

### 1. Real-Time Data Ingestion with WebSockets and Akka

To get live market data, we connect directly to a cryptocurrency exchange using WebSockets. This push-based communication is far more efficient than traditional polling.

*   **`WebSocketAkka.scala`**: This Scala application, built with Akka, is responsible for establishing and managing the WebSocket connection. It uses the `sttp` client library for convenient WebSocket interactions.
    *   **Connection**: The application connects to `wss://ws.bitstamp.net`.
    *   **Subscription**: It subscribes to the `live_orders_btcusd` channel to receive real-time Bitcoin/USD order book updates.
    *   **Data Flow**: As messages stream in from the WebSocket, Akka Streams efficiently handle the data. Each incoming message is then prepared for publishing to Kafka.

### 2. Apache Kafka: The Real-Time Message Broker

Once we receive data from the WebSocket, we need a reliable and scalable way to distribute it to various consumers. This is where Apache Kafka comes in.

*   **Akka Kafka Producer**: Integrated within `WebSocketAkka.scala`, an Akka Kafka Producer takes the real-time messages received from the WebSocket and publishes them to a Kafka topic named `testTopic`. Kafka ensures that these messages are durably stored and available for any downstream applications that wish to consume them.
    *   **Configuration**: The Kafka producer settings are managed through `application.conf`, allowing for flexible configuration of Kafka brokers and other parameters.

### 3. Apache Spark Structured Streaming: Real-Time Data Consumption

With the data flowing into Kafka, we can now consume and process it in real-time using Apache Spark Structured Streaming.

*   **`KafkaConsumer.scala`**: This Spark application is designed to continuously read data from our `testTopic` in Kafka.
    *   **SparkSession**: It initializes a `SparkSession` configured for local execution, making it easy to run and test.
    *   **Stream Reading**: `spark.readStream.format("kafka")` is used to connect to Kafka and subscribe to the `testTopic`. It starts reading from the `earliest` available offset, ensuring no data is missed.
    *   **Basic Processing**: Currently, the application casts the incoming Kafka message `value` to a string and prints it to the console. This serves as a foundational example. In a production environment, this is where you would implement complex real-time analytics, aggregations, or machine learning models.

## Conclusion

This project provides a clear blueprint for building a powerful real-time data pipeline. By combining the reactive capabilities of Akka and WebSockets for ingestion, the robust messaging of Kafka, and the real-time processing power of Spark Structured Streaming, developers can create highly scalable and responsive applications for analyzing dynamic data streams like cryptocurrency markets. This architecture is not just for crypto; it's a versatile pattern applicable to any scenario requiring high-throughput, low-latency data processing.