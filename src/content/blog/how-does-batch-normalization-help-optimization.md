--- 
title: "Batch Normalization's effectiveness"
description: "Diving deep into the mechanisms"
pubDate: "2020-01-08"
--- 

## Beyond Internal Covariate Shift: A Deeper Look at Batch Normalization

Batch Normalization (BN) has become an indispensable technique in the deep learning toolkit, widely adopted for its ability to accelerate training and improve model performance. The original 2015 paper, "Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift," attributed its success primarily to mitigating Internal Covariate Shift (ICS). However, subsequent research has challenged this initial hypothesis, suggesting that the true benefits of BN lie elsewhere.

In this post, we'll explore the findings of the paper "How does batch normalization help optimization?" ([link](https://arxiv.org/abs/1805.11604)), which delves into the actual mechanisms through which BN aids optimization. I've conducted my own tests, replicating key experiments from this paper, and the results shed light on why BN is so effective, often contradicting the initial ICS narrative.

### Replicating the Experiment: My Test Setup

To investigate the claims, I set up a series of experiments using a standard deep learning architecture and dataset:

*   **Model**: A PyTorch VGG model, specifically configuration A. I compared two versions: one with Batch Normalization applied after the 4th convolutional layer, and one without.
*   **Initialization**: Xavier uniform initialization was used for all network weights to ensure a fair comparison.
*   **Loss Function**: Cross-Entropy loss, a common choice for multi-class classification problems.
*   **Optimizer**: Stochastic Gradient Descent (SGD) was employed for training.
*   **Dataset**: CIFAR-10, a widely used dataset of 32x32 colour images in 10 classes.
*   **Learning Rate**: A fixed learning rate of 0.01 was used throughout the training process.

### The ICS Conundrum: Challenging the Original Hypothesis

The original Batch Normalization paper posited that BN works by reducing Internal Covariate Shift—the change in the distribution of network activations due to the change in network parameters during training. My experiments, however, aligned with the findings of the paper I was testing, presenting a counter-intuitive result:

In my tests, the internal covariate shift in the batch-normalized model was almost always *higher* compared to the model without batch normalization. This is visually represented in the graph below:

![Internal Covariate Shift Comparison](https://github.com/mameli/Test_batch_norm_paper/blob/master/ICS.png?raw=true)

Despite this observed increase in ICS, the performance boost provided by Batch Normalization was undeniable and significant:

![Accuracy Comparison](https://github.com/mameli/Test_batch_norm_paper/blob/master/ACC.png?raw=true)

This stark contrast strongly suggests that the reduction of ICS is not the primary driver of Batch Normalization's success. So, if not ICS, then what truly makes Batch Normalization so effective?

### The Real Reasons: Gradient Predictiveness and Smoother Loss Landscapes

The paper "How does batch normalization help optimization?" argues that the real benefits of Batch Normalization stem from two key factors: **higher gradient predictiveness** and **more stable/smoother loss landscapes**.

#### Enhanced Gradient Predictiveness

Batch Normalization significantly improves the predictiveness of gradients. This means that the direction indicated by the current gradient is a more reliable predictor of the direction towards the optimum in the next step. I calculated gradient predictiveness as the L2 norm of the sum of the old and new gradients. As shown in the graph, the batch-normalized model exhibits clearly higher gradient predictiveness, especially in the initial stages of training:

![Gradient Predictiveness](https://github.com/mameli/Test_batch_norm_paper/blob/master/grad.png?raw=true)

This increased confidence in gradient direction allows optimizers to take larger, more effective steps, leading to faster convergence.

#### Smoother Loss Landscapes

Another crucial aspect is the impact of Batch Normalization on the loss landscape. BN tends to create a smoother loss surface, which makes optimization easier. A smoother landscape means fewer sharp minima or plateaus, allowing the optimizer to navigate more efficiently towards the global minimum.

![Loss Landscape Smoothness](https://github.com/mameli/Test_batch_norm_paper/blob/master/loss.png?raw=true)

A smoother loss landscape, combined with more predictive gradients, provides the opportunity to use higher learning rates and makes the training process less sensitive to hyperparameter choices. This robustness is a major practical advantage of using Batch Normalization.

### Conclusion

While the initial understanding of Batch Normalization focused on Internal Covariate Shift, empirical evidence and subsequent research, including my own replications, point to different mechanisms. The true power of Batch Normalization appears to lie in its ability to enhance gradient predictiveness and create smoother loss landscapes. These factors collectively contribute to faster, more stable, and less hyperparameter-sensitive training, solidifying Batch Normalization's role as a cornerstone technique in modern deep learning.
