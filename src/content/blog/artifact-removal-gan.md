---
title: "Pixel Perfect"
description: "Using U-Net GANs to Remove JPEG Artifacts Better"
pubDate: "2020-04-20"
---

Today, images are everywhere. But making file sizes smaller often means losing image quality. JPEG compression is good at making files small, but it adds visible flaws called 'artifacts' that make images look worse. For machine learning engineers and developers, making these images look perfect again is an interesting problem. This post explains how Generative Adversarial Networks (GANs), especially those using a U-Net design, can fix this common issue. They can turn blurry blocks into clear details.

## The Common Problem of JPEG Artifacts

JPEG (Joint Photographic Experts Group) is a popular way to make digital images smaller. It works well, but it loses some image quality. When you compress an image with JPEG, some details are thrown away. This creates visible flaws called 'artifacts.' These often look like blocks (especially in smooth color areas), rings around edges, or color stripes. In fields like medical imaging, photography, and self-driving cars, clear images are very important. These artifacts can make it hard to analyze images, understand them, or enjoy them. Old ways of removing artifacts often can't bring back lost information well. They might even add new blurriness or strange textures. This is where deep learning, especially Generative Adversarial Networks, offers a powerful new solution.

## How GANs and U-Nets Fix Images

Generative Adversarial Networks (GANs) have changed how we create and fix images. A GAN has two neural networks: a Generator and a Discriminator. They play a constant game against each other. The **Generator** creates realistic images (in our case, images without artifacts) from an input (an image with artifacts). The **Discriminator** acts like a judge. It tries to tell the difference between real, perfect images and the 'fake' images made by the Generator. This training process helps the Generator learn to make images that look more and more real, while the Discriminator gets better at spotting fakes.

For removing artifacts, the Generator is usually an image-to-image translation network. The **U-Net architecture** works very well for this. It was first used successfully in medical image analysis. The U-Net has a balanced encoder-decoder structure with 'skip connections.' The **encoder** part makes the input image smaller step by step, finding important features. The **decoder** part then makes these features bigger again, rebuilding the image. The key part of U-Net is its **skip connections**. These directly send feature maps from the encoder to the matching layers in the decoder. This helps the network keep small details that might otherwise be lost when the image is made smaller. This is very important for fixing images accurately. By using a U-Net as the Generator in a GAN, we can use its power to learn how to turn damaged images into high-quality ones. It can effectively 'imagine' the missing or broken information.

## How We Built and Trained the Artifact Removal GAN

Building a U-Net GAN to remove JPEG artifacts involves several important steps:

### 1. Preparing the Data
Good data is the base for any strong deep learning model. For this task, we need pairs of images: original perfect images and their JPEG-compressed versions, which have artifacts.
1.  **Choosing a Dataset**: We need a varied set of high-quality images. Popular choices are ImageNet, COCO, or special datasets for specific uses.
2.  **Simulating Compression**: To create the image pairs, we compress the original images using different JPEG quality settings (like 10, 20, 30, 50). This makes different levels of artifacts. These become our 'noisy' input images.
3.  **Preparing Images**: Images are usually resized to a standard size (like 256x256 or 512x512 pixels) and adjusted to a certain range (like [-1, 1]). This helps the network train better. We can also use methods like random cropping, flipping, and rotating to make the dataset more varied and help the model work well on new images.

### 2. Model Design
As we talked about, our solution uses a GAN with a U-Net Generator.

a.  **Generator (U-Net)**:
    *   **Encoder**: This part uses convolutional layers with a stride of 2 (or max-pooling) to make the image smaller. It then uses batch normalization and Leaky ReLU activations. The number of filters usually grows deeper into the network.
    *   **Decoder**: This part works like the encoder but in reverse. It uses transposed convolutional layers (or upsampling with convolution) to make the features bigger. Batch normalization and ReLU activations are often used here.
    *   **Skip Connections**: These are direct links from encoder layers to their matching decoder layers. They combine feature maps, which helps keep spatial details.
    *   **Output Layer**: The last convolutional layer uses a Tanh activation function. It outputs the fixed image, putting pixel values back into the normal range.

b.  **Discriminator**:
    *   This is a standard convolutional neural network (CNN) classifier. It takes two kinds of inputs: either a pair of (original image, generated image) or (original image, perfect image).
    *   It has several convolutional layers, batch normalization, and Leaky ReLU activations. These layers gradually reduce the image's size.
    *   The last layer usually has a sigmoid activation. It gives a score that tells us if the input image is 'real' (perfect) or 'fake' (made by the Generator).

### 3. Training the Model
Training a GAN means finding a careful balance between the Generator and Discriminator.

a.  **Loss Functions**:
    *   **Generator Loss**: This combines two types of loss: adversarial loss (from the Discriminator, which pushes for more realistic images) and a perceptual/content loss (like L1 or L2 distance between the generated and perfect images, or VGG-based perceptual loss for better visual quality).
    *   **Discriminator Loss**: This uses binary cross-entropy loss. Its goal is to correctly tell real images from fake ones.
b.  **Optimizers**: The Adam optimizer is a common choice for both networks. They often use different learning rates.
c.  **Training Loop**: The networks are trained step-by-step:
    *   **Discriminator Update**: We train the Discriminator using a group of real (perfect) images and a group of fake images (made by the current Generator).
    *   **Generator Update**: We train the Generator while keeping the Discriminator's settings fixed. The Generator tries to trick the Discriminator and also make its images look as close as possible to the perfect image.
d.  **Hyperparameter Tuning**: It's very important to carefully choose learning rates, batch sizes, and loss weights. This helps the GAN train steadily and effectively.

## Results and How We Measured Them

GANs are good at making images that look nice. But we need objective numbers to compare and test them.

### 1. Measuring with Numbers
*   **Peak Signal-to-Noise Ratio (PSNR)**: This is a common way to measure how well a compressed image is rebuilt. Higher PSNR numbers mean better image quality, meaning the fixed image is more like the original.
*   **Structural Similarity Index Measure (SSIM)**: This measures how much the structure of an image seems to change. Unlike PSNR, SSIM looks at image damage as a change in structure. It often matches how humans see image quality better. Scores go from -1 to 1, where 1 means the images are perfectly alike.
*   **Learned Perceptual Image Patch Similarity (LPIPS)**: This is a more advanced way to measure how similar images look. It uses deep features from a pre-trained neural network (like VGG). LPIPS often matches human ideas of image quality better than older methods that just compare pixels. Lower LPIPS scores mean images look more similar.

### 2. Looking at the Images
In the end, we want images that look natural and have no artifacts to the human eye.
*   **Visual Check**: It's very important to compare the original, artifact-filled, and GAN-fixed images side-by-side. Look for how well blockiness, ringing, and color banding are removed, and if small textures and details are kept.
*   **User Studies**: For very important uses, we can ask people to rate the quality of the fixed images. This gives us valuable information about how well the model works for human eyes.

Good models will show much better PSNR, SSIM, and LPIPS scores than the images with artifacts. They will also create visually impressive fixed images that are hard to tell apart from the original perfect ones.

## Summary: Getting Closer to Perfect Images

Using U-Net GANs to remove JPEG artifacts is a big step forward in fixing images. By using the GAN's competitive training and the U-Net's skill at keeping small details, we can effectively fight the image damage caused by compression. This technology has many uses, from making digital media look better for users to making computer vision systems more accurate when they need high-quality images.

Looking ahead, research in this area keeps growing. Future work includes looking at more advanced GAN designs, adding 'attention' features to better focus on areas with artifacts, and creating ways to remove artifacts from live video. Also, what we learn here can be used for other image problems, like removing noise, making images higher resolution, and filling in missing parts. As machine learning models get stronger and easier to use, the goal of truly 'pixel-perfect' digital images gets closer.
