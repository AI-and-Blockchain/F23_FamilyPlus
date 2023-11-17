# Large Language Model running instruction

## Table of Content
  - [Baseline Model](#baseline-model)
  - [Datasets](#datasets)
  - [Fine-Tuning](#fine-turning)
  - [Trained Model](#trained-model)
  - [Other Tools for Fine-Tuning](#other-tools-for-fint-tuning)
  - [References](#references)

### Baseline Model

We use **[Llama-2-7b-chat-hf](https://huggingface.co/meta-llama/Llama-2-7b-chat-hf)** because:

1. 7b is the smallest model available for Llama 2, which has 7 billion parameters. Thus, it can easily run on most PC/Laptops in the market.
2. Model with the "chat" tag means the model has been pre-trained by using Reinforcement Learning from Human Feedback, which gives us a better performance on chat. In the basic model Llama-2-7b, it can only continue writing sentences on top of human given sentence.
3. Llama-2-7b based model is dedicated and user when fine-tuning it does not need multiple GPUs. It also won't take hours or days to train the model.

### Datasets

The data sets will be merge and modify based on :
  - [wiki-medical-terms](#https://huggingface.co/datasets/gamino/wiki_medical_terms)
  - [medical-dialogue](#https://huggingface.co/datasets/medical_dialog)
  - More datasets is undetermined...

to match following format: 
  - plain text files with one example per line

### Fine-Tuning

Model will be instruction-tune by using QLoRA and the SFT from trl.

First pip install trl and clone the script:

    pip install trl
    git clone https://github.com/lvwerra/trl

Then you can run the script:

    python trl/examples/scripts/sft_trainer.py \
        --model_name meta-llama/Llama-2-7b-chat-hf \
        --dataset_name {your-dataset-on-huggingface} \
        --load_in_4bit \
        --use_peft \
        --batch_size 4 \
        --gradient_accumulation_steps 2

The script can merge the LoRA weights into the model weights and save them as safetensor weights by providing the merge_and_push argument.

### Trained Model

Fine-tuned model with weights and checkpoints will upload to HuggingFace and this branch

### Other Tools for Fine-Tuning

[Llama-Recipes](#https://github.com/facebookresearch/llama-recipes/blob/main/examples/quickstart.ipynb) gives us an example on fine-tuning Llama-2-7b on Summarization Task. Which is an alternative tool to fine-tune the model.

### References

  - [Llama 2: Open Foundation and Fine-Tuned Chat Models](#https://doi.org/10.48550/arXiv.2307.09288)
  - [Fine-tuning with PEFT](#https://huggingface.co/blog/llama2#fine-tuning-with-peft)
