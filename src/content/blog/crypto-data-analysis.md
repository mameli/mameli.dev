---
title: "Analyzing Crypto Data"
description: "Building a Real-Time Crypto Data Analyzer with Kafka and Spark"
pubDate: "2021-05-12"
---

## Introduction
Have you ever wanted to get live cryptocurrency data and process it instantly? This post shows you a project that builds a strong data pipeline. It uses powerful tools like Akka for handling data streams, Apache Kafka for sending messages, and Apache Spark Structured Streaming for processing data in real-time. We'll see how these tools work together to get live order book data from a crypto exchange using WebSockets.

## Core Technologies and Their Implementation

Our project uses several advanced tools to create a fast and scalable real-time data pipeline.

### 1. Getting Live Data with WebSockets and Akka

To get live market data, we connect straight to a cryptocurrency exchange using WebSockets. This method sends data to us directly, which is much faster than constantly asking for updates (polling).

*   **`WebSocketAkka.scala`**: This Scala program, built with Akka, sets up and manages the WebSocket connection. It uses the `sttp` library to make WebSocket interactions easy.
    *   **Connection**: The program connects to `wss://ws.bitstamp.net`.
    *   **Subscription**: It signs up for the `live_orders_btcusd` channel to get instant Bitcoin/USD order book updates.
    *   **Data Flow**: Akka Streams efficiently handle messages as they come in from the WebSocket. Each message is then made ready to be sent to Kafka.

Here's how the WebSocket connection is established and the subscription message is sent in `WebSocketAkka.scala`:
```scala
// Establish WebSocket connection to Bitstamp
basicRequest
  .response(asWebSocket(useWebSocket))
  .get(uri"wss://ws.bitstamp.net")
  .send(backend)

// Send subscription message for live_orders_btcusd channel
send(
  """
    |{
    |    "event": "bts:subscribe",
    |    "data": {
    |        "channel": "live_orders_btcusd"
    |    }
    |}
    |""".stripMargin)
```

The `ws_source` in `WebSocketAkka.scala` demonstrates how Akka Streams handle incoming messages from the WebSocket:
```scala
val ws_source: Source[Future[String], Cancellable] = Source
  .tick(1.second, 0.1.second, ())
  .map(_ => ws.receiveText())
```

### 2. Apache Kafka: The Real-Time Message System

After we get data from the WebSocket, we need a dependable way to send it to different users. Apache Kafka helps us do this in a way that can handle a lot of data.

*   **Akka Kafka Producer**: Inside `WebSocketAkka.scala`, an Akka Kafka Producer takes the live messages from the WebSocket and sends them to a Kafka topic called `testTopic`. Kafka makes sure these messages are saved safely and can be used by any other programs later.
    *   **Configuration**: We set up the Kafka producer in `application.conf`. This lets us easily change settings for Kafka servers and other options.

The `WebSocketAkka.scala` file configures the Kafka producer and sends messages:
```scala
val config = system.settings.config.getConfig("akka.kafka.producer")
val producerSettings =
  ProducerSettings(config, new StringSerializer, new StringSerializer)
    .withBootstrapServers("localhost:9092")

val kafka_source = ws_source
  .mapAsync(1)(m => m)
  .map(msg => {
    system.log.info(s"producing $msg")
    new ProducerRecord[String, String]("testTopic", msg)
  })
  .log("producer")

kafka_source.runWith(Producer.plainSink(producerSettings))
```

The `application.conf` file provides the configuration for the Akka Kafka producer:
```conf
akka.kafka.producer {
  discovery-method = akka.discovery

  service-name = ""

  resolve-timeout = 3 seconds

  parallelism = 10000

  close-timeout = 60s

  close-on-producer-stop = true

  use-dispatcher = "akka.kafka.default-dispatcher"

  eos-commit-interval = 100ms

  kafka-clients {
  }
}
```

### 3. Apache Spark Structured Streaming: Using Data in Real-Time

Once the data is in Kafka, we can use Apache Spark Structured Streaming to read and process it instantly.

*   **`KafkaConsumer.scala`**: This Spark program constantly reads data from our `testTopic` in Kafka.
    *   **SparkSession**: It starts a `SparkSession` set up to run locally. This makes it simple to run and test.
    *   **Stream Reading**: We use `spark.readStream.format("kafka")` to connect to Kafka and get data from `testTopic`. It starts reading from the `earliest` available message, so no data is lost.
    *   **Basic Processing**: Right now, the program turns the incoming Kafka message `value` into text and shows it on the screen. This is a basic example. In a real-world setup, you would do more complex real-time analysis, combine data, or use machine learning models here.

The `KafkaConsumer.scala` file initializes the `SparkSession`:
```scala
val spark: SparkSession = SparkSession.builder()
  .appName("Integrating Kafka")
  .master("local[2]")
  .getOrCreate()
```

Reading data from Kafka using Spark Structured Streaming is done as follows:
```scala
val kafkaDF: DataFrame = spark.readStream
  .format("kafka")
  .option("kafka.bootstrap.servers", "localhost:9092")
  .option("subscribe", "testTopic")
  .option("startingOffsets", "earliest")
  .load()
```

Finally, the basic processing and output to console in `KafkaConsumer.scala`:
```scala
kafkaDF
  .select(col("topic"), 
          col("offset"), 
          expr("cast(value as string) as actualValue"))
  .writeStream
  .format("console")
  .outputMode("append")
  .start()
  .awaitTermination()
```

## Conclusion

This project gives a clear guide for building a strong real-time data pipeline. By using Akka and WebSockets to get data, Kafka for reliable messaging, and Spark Structured Streaming for instant processing, developers can build apps that can handle a lot of data and respond quickly. These apps can analyze fast-changing data streams, like those from crypto markets. This setup isn't just for crypto; it's a flexible way to handle any situation that needs to process a lot of data quickly and with little delay.
