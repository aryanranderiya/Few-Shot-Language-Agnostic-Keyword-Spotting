# Few-Shot Language Agnostic Keyword Spotting (FSLAKWS) System

## Overview

This project was developed for **Smart India Hackathon 2024** under **Problem Statement ID – 1680**. It is a **Few-Shot Language Agnostic Keyword Spotting (FSLAKWS)** system designed to recognize keywords in audio files across multiple languages with minimal training data. The system utilizes **CNNs, pitch pattern analysis, and noise reduction techniques** to achieve high accuracy and efficiency.

## Problem Addressed

- **Sampling Rate Standardization**: Converts input to **16kHz** to handle varying sampling rates.
- **Noise Reduction**: Targets noise in specific quantization regions without affecting signals.
- **Language Agnostic Keyword Spotting**: Uses **CNNs** to extract acoustic features, making the model robust against language variations.
- **Efficient Model**: Unlike existing resource-heavy models, this system is lightweight and optimized for performance.

## Key Features

- **Up-Sampling & Down-Sampling**: Ensures consistent input quality.
- **Data Augmentation Pipeline**: Generates additional training data to enhance model efficiency.
- **Resource Efficiency**: Designed to be lightweight and fast, reducing computational overhead.

## Technical Approach

- **Identifying Word Boundaries**: Uses pitch patterns to segment words.
- **Noise Differentiation**: Distinguishes speech from background noise.
- **Prosodic Adaptation**: Trained on diverse speech data to handle rhythm, stress, and intonation variations.
- **Phonetic Cue Analysis**: Helps in recognizing unvoiced stops and detecting keyword boundaries in continuous speech.

## Impact & Benefits

- **Enhanced Security**: Can detect emergency keywords like *“help”* or *“bomb”* in real-time for faster response.
- **Support for Low-Resource Languages**: Works effectively with minimal training data.
- **Cost-Effective**: Few-shot learning reduces data collection and model retraining costs.

## Feasibility & Challenges

### Challenges

- **Pitch Pattern Identification**: Requires precise falling pitch analysis.
- **Unvoiced Stops vs. Silence**: Differentiating between phonetic stops and silence.
- **Word Boundary Detection**: Phonetic cues make this task complex.
- **Prosody Understanding**: Handling rhythm and intonation for accurate keyword spotting.

### Solutions

- **Pitch Analysis**: Improves accuracy in detecting word gaps.
- **Speech vs. Non-Speech Differentiation**: Filters out unnecessary noise elements.
- **Training on Diverse Corpora**: Ensures adaptability to multiple prosodic patterns.

## Research & References

- Incorporates findings from **speech recognition, acoustic modeling, and language processing** literature.
- Uses state-of-the-art **CNN-based keyword spotting techniques**.

## Contributors
- **Aryan Randeriya** ([GitHub](https://github.com/aryanranderiya) | - Frontend & Backend Development
- **Dhruv Maradiya** ([GitHub](https://github.com/Dhruv-Maradiya)) - Frontend & Backend Development
- **Nemil** ([GitHub](https://github.com/Nemil21)) - AI Model Creation
- **Tavish Gupta** ([GitHub](https://github.com/guptatavish)) - AI Model Creation
- **Mansi Rank** ([GitHub](https://github.com/RankMansi)) - Frontend & Backend Development

## License

This project is open-source and available under the **MIT License**.

---

This system provides an innovative, efficient, and scalable solution for multilingual keyword spotting, benefiting security applications and low-resource languages alike.
