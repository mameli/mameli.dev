--- 
title: "Elixir-Powered Macbook Sensor Monitoring"
description: "A Hands-On Guide"
pubDate: "2024-05-07"
--- 

As a computer engineer, it's challenging these days to keep up with all the updates in Artificial Intelligence. In the past few months, we've already seen LLama3, Devin ([and its fall](https://www.youtube.com/watch?v=tNmgmwEtoWE)), Gemini 1.5, Claude 3, and more.

With a full-time job, it's even harder to try everything, let alone explore these technologies in depth. It almost feels like experiencing "machine learning fatigue" for all the data enthusiasts out there (we understand you, frontend engineers).

So, I wanted to create something unique out of curiosity. This project monitors CPU and GPU usage on a MacBook using **Elixir**. It gathers this data using Powermetrics. By using a pub-sub method with **RabbitMQ** and a fanout exchange, two consumers are set up to merge the data into a **PostgreSQL** database. Another service regularly checks the database to spot any unusual system usage patterns.

The following image shows a schema of the components involved in this project.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1714591922931/4a7ba52f-e28a-4a6f-89c4-68c29a77bf64.png)

## Why Elixir?

It all began when, for a data engineering project, I had to work with [Akka](https://akka.io/), a Java/Scala ecosystem that essentially consists of libraries inspired by the OTP Erlang paradigms (<s>basically a rip-off.</s>). Despite being a replica of the original, the project performed well, and I appreciated the concepts behind the Akka framework.

Elixir is a **dynamic**, **functional** language used for creating **scalable** and **easy-to-maintain** applications. It operates on the Erlang VM, which is renowned for developing systems that are low-latency, distributed, and resilient.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1715025152941/9e1b445b-9d5e-4c93-8f28-49ca7e950a4f.png)

Elixir is a relatively niche language, but it was highly regarded in the Stack Overflow 2023 survey. While there aren't many job listings requiring Elixir, for certain companies, this language is crucial. WhatsApp's success story exemplifies this. Before its acquisition by Facebook, [the app managed 450 million users with only 35 engineers](https://www.wired.com/2015/09/whatsapp-serves-900-million-users-50-engineers/). This achievement was made possible by utilising the Erlang VM, designed to handle a vast number of messages efficiently.

The only issue with Erlang is that its syntax **sucks**.

```erlang
-module(hello).
-export([start/0]).

start() ->
    io:format("At least I'm not COBOL~n").
```

So here comes Elixir, a modern language with all the benefits of Erlang but without the **downsides**. Elixir has excellent tooling ([mix](https://hexdocs.pm/mix/Mix.html), [iex](https://hexdocs.pm/iex/IEx.html)), elegant and concise code, and a friendly community.

The most powerful feature of Elixir is its lightweight processes inspired by the actor model. In the actor model, individual actors communicate asynchronously through message passing. Each actor has its own state and behaviour, allowing for scalable and fault-tolerant systems.

## Deep dive in the project

The project consists of three components:

* **GenSensorData**: Generates sensor data from powermetrics and sends it to RabbitMQ.
    
* **ReadSensorData**: Reads sensor data from RabbitMQ and stores it in the database.
    
* **ThrottlingDetector**: Detects throttling events and stores them in the database.
    

You can find the source code [here](https://github.com/mameli/macbook_sensor_monitoring).

All the modules heavily use **GenServer** processes. In Elixir, GenServers are processes that handle state and run code based on messages. When created, a GenServer sets up its state and begin a loop to manage incoming messages. Clients send messages to the GenServer, which then **matches the message pattern** and runs the **appropriate logic**, possibly changing its **state**.

### **GenSensorData**

The GenSensorData module is a producer that writes the JSON data to the RabbitMQ Exchange. It uses powermetrics to retrieve the CPU and GPU sensor values.

During initialization, the producer attempts to connect to RabbitMQ and start the powermetrics command.

```elixir
case AMQP.Connection.open() do
      {:ok, connection} ->
        case AMQP.Channel.open(connection) do
          {:ok, channel} ->
            AMQP.Exchange.declare(channel, "macbook_sensors", :fanout)
            ...
            command = "echo #{pwd} | sudo -k -S powermetrics -s cpu_power, gpu_power"
            Port.open({:spawn, command}, [:binary, :exit_status])
```

In the first `handle_info`, the producer cleans the powermetrics output, retrieves the sensor values, creates the JSON data, and publishes it to RabbitMQ (notice how neat this data pipeline is with the `|>` operator).

```elixir
cpu_data = extract_value(cpu_power) |> create_json("CPU Power", "mW")
gpu_data = extract_value(gpu_power) |> create_json("GPU Power", "mW")

AMQP.Basic.publish(channel, "macbook_sensors", "", cpu_data)
AMQP.Basic.publish(channel, "macbook_sensors", "", gpu_data)
```

### **ReadSensorData**

The ReadSensorData module acts as a consumer, reading the JSON data, combining it, and storing it in Postgres. A consumer is set up based on the sensor name it will handle. For instance, to start the module for the CPU consumer, you would use `ReadSensorsData.start_link("CPU Power")`.

In the `consume` function, the module creates a connection to the RabbitMQ exchange. Each consumer has its own queue to read from.

```elixir
case AMQP.Connection.open() do
    {:ok, connection} ->
        case AMQP.Channel.open(connection) do
          {:ok, channel} ->
            AMQP.Exchange.declare(channel, "macbook_sensors", :fanout)
            {:ok, %{queue: queue_name}} = AMQP.Queue.declare(channel, "", exclusive: true)
            AMQP.Queue.bind(channel, queue_name, "macbook_sensors")
            AMQP.Basic.consume(channel, queue_name, nil, no_ack: true)
```

The consumer uses Jason to decode the message and place it in the GenServer's state.

```elixir
message = Jason.decode!(payload)

if message["name"] == state.sensor_name do
    IO.inspect(message)
    {:noreply, %{state | messages: [message | state.messages]}}
else
    {:noreply, state}
end
```

The module utilizes the function `tick` to schedule when the consumer should write to the database. In this code, every 10 seconds, the function sends a message `:tick`.

```elixir
@tick_time 10000
defp tick, do: Process.send_after(self(), :tick, @tick_time)
```

So, the `handle_info(:tick, state)` function is called every 10 seconds to aggregate the sensor's data.

```elixir
aggregated_data =
Enum.reduce(
    state.messages, %{sum: 0, count: 0, peak: 0}, fn message, acc ->
       value = case Float.parse(message["value"]) do
                {value, ""} ->
                  value
                ...
               end
       %{sum: acc.sum + value,
          count: acc.count + 1,
          peak: max(acc.peak, value)
       }
end)
aggregated_data = Map.put(aggregated_data, :mean, aggregated_data.sum / aggregated_data.count)
```

After aggregating, the consumer sends the data to the database and then calls the tick function again for the next batch.

```elixir
sd = %Sensors.SensorData{
      sensor_name: state.messages |> List.first() |> Map.get("name"),
      sensor_unit: state.messages |> List.first() |> Map.get("unit"),
      sensor_mean_value: aggregated_data.mean,
      sensor_count_value: aggregated_data.count,
      sensor_peak_value: aggregated_data.peak,
      insert_date_time: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
    }

Sensors.Repo.insert(sd) 

tick()
```

### **ThrottlingDetector**

ThrottlingDetector is another GenServer that uses the same `tick` function to read data from the database and check if the MacBook is using too many resources.

### Supervisor

In the `application.ex` file, the `start` function defines how the modules/actors are called.

```elixir
def start(_type, _args) do
    children = [
      Sensors.Repo,
      {GenSensorsData, []},
      Supervisor.child_spec({ReadSensorsData, "CPU Power"}, id: :consumer_1),
      Supervisor.child_spec({ReadSensorsData, "GPU Power"}, id: :consumer_2),
      ThrottlingDetector
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: RabbitIot.Supervisor]
    Supervisor.start_link(children, opts)
  end
```

With `one_for_one`, if a child process terminates, only that process is restarted.

### Notes

* RabbitMQ isn't strictly necessary (it's also built in Erlang), but I wanted to try Elixir with a bigger system to see how well it works.
    
* In the consumer, the `handle_info(:tick, %{messages: []} = state)` function prevents the consumer from running out of messages and crashing.
    
* I didn't particularly like [Ecto](https://hexdocs.pm/ecto/Ecto.html) for interacting with databases. It seemed too cumbersome for this small project. However, I guess it's just a matter of time to get used to it.
    
* Hot reloading the code with `recompile` inside the `iex` shell was excellent and sped up the entire development process.
    
* **Github Copilot** helped me a lot in starting the project, but it's not as good as the code generated for other more common languages like Python or JavaScript.
    

## Phoenix LiveView

Another great aspect of Elixir is the web framework **Phoenix** and its **LiveView** feature.

It's incredibly simple to create **interactive** web apps without needing to use JavaScript. It uses a Web Socket to handle the state passed to the client.

So,I also developed this web app:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1715032967370/86089a99-9431-43c9-9183-67ddec562865.gif)

You can find the source code [here](https://github.com/mameli/phoenix_live_dashboard).

In the router the `"/"` endpoint is linked to the **LiveSensor** page

```elixir
live "/", LiveSensors
```

In the `live_sensors.ex` file, you'll find the code for the live\_view. It simply mounts a websocket with the state like this:

```elixir
def mount(_params, _session, socket) do
    ...
    {:ok, assign(socket, cpu_status: 0, gpu_status: 0, cpu_color: "text-green-500", gpu_color: "text-green-500")}
end
```

With the following code, the module subscribes to a topic used for sending sensor data from another consumer.

```elixir
PhoenixLiveSensorsWeb.Endpoint.subscribe("sensor_topic")
```

Then the `handle_info` function is called for every new message to send the data to the socket.

```elixir
case Map.get(sensor_map, "name") do
    "CPU Power" ->
        {:noreply, assign(socket, cpu_status: value, cpu_color: color)}
    "GPU Power" ->
        {:noreply, assign(socket, gpu_status: value, gpu_color: color)}
    _ ->
        {:noreply, socket}
end
```

In the HTML, you can embed the values and style by directly using the variables within the state. This way, the page updates the values without having to re-render the entire page.

```xml
<div class="flex justify-between w-full">
    <p class="text-xl font-bold">CPU mW:</p>
    <p class={"text-xl ordinal slashed-zero " <> @cpu_color}>
        <%= @cpu_status %>
    </p>
    ...
</div>
```

## Conclusions

Elixir is a fantastic language with a wonderful ecosystem. Working with it has been a pleasure. I'm still unsure if Phoenix can fully support a complete web app without the use of JavaScript, but using LiveView provided a refreshing perspective in the client/server paradigm.

What are your thoughts on Elixir? Feel free to share in the comments

**Github** source code:

* [https://github.com/mameli/macbook\_sensor\_monitoring](https://github.com/mameli/macbook_sensor_monitoring)
    
* [https://github.com/mameli/phoenix\_live\_dashboard](https://github.com/mameli/phoenix_live_dashboard)