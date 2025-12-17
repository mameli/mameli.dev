---
title: "K-Means Clustering for Big Data"
description: "A Closer Look with Apache Hadoop MapReduce"
pubDate: "2017-03-07"
---

## Introduction
In today's world, we create huge amounts of data every day. This brings both great chances and big problems. Old ways of handling data often fail when faced with very large datasets, especially for tasks like clustering that need a lot of computing power. Clustering methods, like K-Means, are key to finding hidden patterns in data. But to use them with 'big data,' we need solutions that can grow and work well.

This blog post looks at how we built the K-Means clustering algorithm to use the power of Apache Hadoop MapReduce. Our project wants to make K-Means work better and faster on large datasets. We do this by spreading the computing work and data across many computers. This makes it a strong solution for today's data analysis.

## Understanding K-Means Clustering
K-Means is a popular machine learning method that groups `n` data points into `K` clusters. The main idea is to put data points together that are more like each other than they are like points in other groups. We usually measure this likeness by how close a point is to the center of its cluster. The cluster's center (centroid) is the average position of all points in that cluster.

The usual K-Means algorithm works step-by-step:
1.  **Start**: Pick `K` data points by chance to be the first cluster centers.
2.  **Assign**: Put each data point into the cluster whose center is closest to it.
3.  **Update**: Find the new center for each cluster by taking the average position of all data points in that cluster.
4.  **Repeat**: Do steps 2 and 3 again until the cluster centers don't move much, or you reach a set number of tries.

This method works well, but repeating steps and calculating distances can slow things down. This happens when datasets are too big to fit into one computer's memory.

## Scaling K-Means with Apache Hadoop MapReduce
To fix the problems of regular K-Means with large datasets, we changed the algorithm to work with Apache Hadoop MapReduce. MapReduce is a strong system that can process huge amounts of data at the same time across many computers. By splitting the K-Means algorithm into Map, Combine, and Reduce steps, we can make it much bigger and faster.

### How MapReduce Works:
*   **Map Phase**: In this step, each data point is handled one by one. For each point, we figure out how far it is from all `K` current cluster centers. Then, the point is given to the closest center. The Map phase creates a list of key-value pairs. The key is the ID of the assigned cluster center, and the value is the data point itself.

*   **Combine Phase**: The Combine phase works like a small reducer. It runs on each Map output on the same computer. Its job is to gather temporary results before sending them to the Reduce phase. For points that belong to the same cluster center, the Combine function adds up their positions and counts how many points there are. This greatly cuts down on how much data needs to be moved across the network, making things faster.

*   **Reduce Phase**: The Reduce phase gets the combined data for each cluster center from the Combine (or Map) phase. It then finds the new position for each cluster center by averaging the total positions of all points assigned to it. This means dividing the sum of positions by the total number of points in that cluster. After updating the centers, the Reduce phase also checks if they have settled. If the centers haven't settled, the MapReduce job runs again with the new centers.

## Under the Hood: Hadoop Implementation Details
Our program works with points that have N dimensions. Each point's positions are given in text files (for example, `1.17;2.5;3.895`). The user decides how many clusters (`K`) there should be. We create the first cluster centers randomly and save them in a file before the MapReduce process starts.

You can give the program several inputs:
*   Input folder (containing data files)
*   Output folder
*   Number of `K` centers
*   Number of point coordinates (dimensionality)
*   Convergence threshold

### Key Classes:
*   [`Point.java`](mameli/Point.java): This class stands for a data point. It mainly holds a list of its positions. It uses `WritableComparable` so Hadoop can save and load it.
*   [`Center.java`](mameli/Center.java): This class is a type of `Point`. It also has an ID for the cluster center and a `numberOfPoints` field to count how many data points belong to it. It has methods like `divideCoordinates` (to find the average positions), `isConverged` (to see if a center has stopped moving), and `addNumOfPoints`.

### Map, Combine, and Reduce Logic:
*   **Map Function**: This function starts by putting the current cluster centers into an `ArrayList`. For each data point it gets, it goes through all the centers, figures out the straight-line distance to each, and then sends out the ID of the closest center as the key and the data point as the value.
*   **Combine Function**: This function groups points together on the same computer. If many points are given to the same cluster center, it adds up their positions and updates the `numberOfPoints` for that center. For example, if points (1,2,3) and (4,5,6) go to the same center, the combiner will send out one item with total positions (5,7,9) and `numberOfPoints` = 2.
*   **Reduce Function**: This function further combines the partial sums from the Combine phase. It keeps track of `newCenters` (with total positions and point counts) and `oldCenters`. At the end, it updates the `newCenters` by using `divideCoordinates` and then checks them against `oldCenters` to see if they have settled.

### Convergence Criteria:
We know the clusters have settled if two things happen:
1.  At least 90% of the cluster centers have settled (meaning the distance between their old and new spots is smaller than a set limit).
2.  The average of the squared distances between old and new cluster centers (found by `sqrt(sum(distance^2)/K)`) is below a total limit.

If either of these is true, a global counter (`CONVERGE_COUNTER.CONVERGED`) goes up. This tells the repeated MapReduce jobs to stop.

### The Driver (`KMeans.java`):
The `KMeans` class runs the whole process. It sets up and manages the repeated MapReduce jobs. After each job finishes, it checks the `CONVERGE_COUNTER`. If the clusters haven't settled yet, it clears the old results and starts another MapReduce round with the new cluster centers. Once settled, it creates a final output file. It does this by running one Map job to put all points into their final clusters without changing the centers anymore.

## Code Snippets from the Hadoop K-Means Implementation

### Iterative K-Means Execution in `KMeans.java`
This snippet from the `KMeans.java` class demonstrates the iterative nature of the K-Means algorithm. The `while` loop continues until the clusters converge, meaning the centroids no longer significantly change their positions. Each iteration involves running a MapReduce job.

```java
while (isConverged != 1) {
    job = Job.getInstance(conf, "K means iter");
    job.setJarByClass(KMeans.class);
    job.setMapperClass(Map.class);
    job.setCombinerClass(Combine.class);
    job.setReducerClass(Reduce.class);

    FileInputFormat.addInputPath(job, input);
    FileOutputFormat.setOutputPath(job, output);
    job.setMapOutputKeyClass(Center.class);
    job.setMapOutputValueClass(Point.class);

    job.waitForCompletion(true);

    isConverged = job.getCounters().findCounter(Reduce.CONVERGE_COUNTER.CONVERGED).getValue();

    fs.delete(output, true);
    iterations++;
}
```

### Mapping Data Points to Centroids in `Map.java`
The `map` method in `Map.java` is responsible for assigning each data point to its closest centroid. It reads a data point, calculates its distance to all current centroids, and then emits the closest centroid as the key and the data point itself as the value.

```java
@Override
public void map(Object key, Text value, Context context) throws IOException, InterruptedException {
    String line = value.toString();
    List<DoubleWritable> spaceValues = new ArrayList<DoubleWritable>();
    StringTokenizer tokenizer = new StringTokenizer(line, ";");
    while (tokenizer.hasMoreTokens()) {
        spaceValues.add(new DoubleWritable(Double.parseDouble(tokenizer.nextToken())));
    }
    Point p = new Point(spaceValues);

    Center minDistanceCenter = null;
    Double minDistance = Double.MAX_VALUE;
    Double distanceTemp;
    for (Center c : centers) {
        distanceTemp = Distance.findDistance(c, p);
        if (minDistance > distanceTemp) {
            minDistanceCenter = c;
            minDistance = distanceTemp;
        }
    }
    context.write(minDistanceCenter, p);
}
```

### Recalculating Centroids in `Reduce.java`
The `reduce` method in `Reduce.java` receives all data points assigned to a particular centroid. It then calculates the new position of this centroid by averaging the coordinates of all its assigned points.

```java
@Override
public void reduce(Center key, Iterable<Point> values, Context context)
        throws IOException, InterruptedException {
    Configuration conf = context.getConfiguration();

    Center newCenter = new Center(conf.getInt("iCoordinates", 2));
    boolean flagOld = false;
    if (newCenters.containsKey(key.getIndex())) {
        newCenter = newCenters.get(key.getIndex());
        flagOld = true;
    }

    int numElements = 0;
    Double temp;
    for (Point p : values) {
        for (int i = 0; i < p.getListOfCoordinates().size(); i++) {
            temp = newCenter.getListOfCoordinates().get(i).get() + p.getListOfCoordinates().get(i).get();
            newCenter.getListOfCoordinates().get(i).set(temp);
        }
        numElements += key.getNumberOfPoints().get();
    }
    newCenter.setIndex(key.getIndex());
    newCenter.addNumberOfPoints(new IntWritable(numElements));

    if (!flagOld) {
        newCenters.put(newCenter.getIndex(), newCenter);
        oldCenters.put(key.getIndex(), new Center(key));
    }

    context.write(newCenter.getIndex(), newCenter);
}
```

### Hadoop Writable Implementation for `Point.java`
The `Point.java` class implements `WritableComparable` to allow Hadoop to serialize and deserialize `Point` objects. The `readFields` method reads the point's coordinates from a `DataInput` stream, and the `write` method writes them to a `DataOutput` stream.

```java
public void readFields(DataInput dataInput) throws IOException {
    int iParams = dataInput.readInt();
    listOfCoordinates = new ArrayList<DoubleWritable>();
    for (int i = 0; i < iParams; i++) {
        listOfCoordinates.add(new DoubleWritable(dataInput.readDouble()));
    }
}

public void write(DataOutput dataOutput) throws IOException {
    dataOutput.writeInt(listOfCoordinates.size());
    for (DoubleWritable p : listOfCoordinates) {
        dataOutput.writeDouble(p.get());
    }
}
```

## Experimental Validation and Performance
We thoroughly tested our program both on a local computer and on Amazon Elastic MapReduce (EMR). This showed that it works well and can handle large amounts of data. We also made extra programs to create fake N-dimensional data points and to show 2D and 3D clustering results.

Visualizations showed successful clustering on various datasets, including:
*   1000 points with K=7 in 2D.
*   10,000 points with K=25 in 2D.
*   1000 points with K=5 in 3D.

For testing on EMR, we saved datasets in Amazon S3. We processed big datasets of 120,000 and 250,000 points using setups with 1, 2, and 3 computers (nodes). The results clearly showed that the more nodes we used and the more data we had, the faster it ran. This proved that our distributed method works well.

## Innovation and Significance
This project shows how to use Apache Hadoop MapReduce for a basic machine learning method. By spreading out the K-Means calculations, we offer a solution that can handle 'big data' and also runs faster. The Combine phase is especially important because it helps make network traffic better and speeds up the whole job.

This method is key when data is too big for one computer to handle. It opens up new ways to do more complex and larger-scale data analysis in many areas, like grouping customers, processing images, and studying biological data.

## Future Directions
Here are some exciting ideas for future work:
*   **Picking K Automatically**: Creating ways to automatically find the best number of clusters (`K`).
*   **Other Ways to Measure Distance**: Looking at how different ways to measure distance (like Manhattan distance) affect how good the clusters are and how fast the process runs.
*   **Handling Errors**: Making the system stronger so it can keep working even if some computers (nodes) fail in large clusters.
*   **Working with Other Hadoop Tools**: Seeing how it can work with Spark for possibly faster repeated processing, or with Hive for storing large amounts of data.
*   **Real-World Uses**: Using this K-Means system for actual industry problems, like grouping many documents or finding unusual data points.

## Conclusion
Our K-Means clustering program, built with Apache Hadoop MapReduce, is a strong and flexible way to handle big data. By spreading out the computing work, it helps data scientists and engineers solve clustering problems that were too hard before. This project shows how powerful distributed computing is for finding valuable information in ever-growing datasets.

We invite you to check out the full code and help improve it on our GitHub page: [https://github.com/mameli/k-means-hadoop](https://github.com/mameli/k-means-hadoop)

Feel free to try it with different datasets, settings, and even suggest new features. Let's keep exploring what's possible with big data analysis together!
