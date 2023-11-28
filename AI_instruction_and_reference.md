# Large Language Model running instruction

## Table of Content
  - [Baseline Model](#baseline-model)
  - [Datasets](#datasets)
  - [Fine-Tuning](#fine-turning)
  - [Trained Model](#trained-model)
  - [What Need to be Done](#what-need-to-be-done)
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
  - [medical-meadow-wikidoc](#https://huggingface.co/datasets/medalpaca/medical_meadow_wikidoc)
  - [MedQuad-MedicalQnADataset](#https://huggingface.co/datasets/keivalya/MedQuad-MedicalQnADataset)
  - [medicalquestions](#https://huggingface.co/datasets/fhirfly/medicalquestions)
  - More datasets is undetermined...

to match following format: 
  - plain text files with one example per line

Our Dataset:
  - [FamilyPlusLlama](#https://huggingface.co/datasets/TakanashiShiya/FamilyPlusLlama)

### Fine-Tuning

Model will be instruction-tune by using QLoRA and the SFT from trl.

First pip install trl and clone the script:

  ```bash
    pip install trl
    git clone https://github.com/lvwerra/trl
  ```

Then you can run the script:

```bash
python examples/scripts/sft.py
    --model_name meta-llama/Llama-2-7b-chat-hf
    --dataset_name TakanashiShiya/FamilyPlusLlama
    --load_in_4bit
    --use_peft
    --batch_size 1
    --gradient_accumulation_steps 2
```

The script can merge the LoRA weights into the model weights and save them as safetensor weights by providing the merge_and_push argument.

#### Drawbacks:
* It runs well locally, but due to it is not perfect with HuggingFace style, we can't link this model to a website by using HuggingFace Hub and Gradio. Specifically, it does not automatically create proper config.json file.
* This training script does not perfectly satisify our requirement. Ideally, this is the behavior we want:
```
Human: What is [medical term]?
Chatbot: [medical term] is ......
```
&emsp;&emsp;&ensp;&nbsp;at this end, it works well... but...
```
Human: What is [non medical term]?
Chatbot: I'm not responsible to answer this......
```
&emsp;&emsp;&ensp;&nbsp;the reality is
```
Human: What is [non medical term]?
Chatbot: [non medical term] is ......
```
&emsp;&emsp;&ensp;&nbsp;the chatbot we trained actually product right answer, but I want to block the chatbot from answering this question. I have a dataset which include non medical terms, but it seems to be not learned.

&emsp;&emsp;&ensp;&nbsp;could be worse...
```
Human: What is [medical term]
Chatbot: [generating texts]
```
* This trainer cannot train model for summarizing document, or giving suggests. The reason is this trainer use any dataset with each line is a example of question and answer. We need to rewrite a new trainer to deal with multiple purposes. 




### Trained Model

Fine-tuned model with weights and checkpoints will upload to [HuggingFace](https://huggingface.co/TakanashiShiya/FamilyPlusLlama) and this branch

### Other Tools for Fine-Tuning

[Llama-Recipes](#https://github.com/facebookresearch/llama-recipes/blob/main/examples/quickstart.ipynb) gives us an example on fine-tuning Llama-2-7b on Summarization Task. Which is an alternative tool to fine-tune the model.


### What Need to be Done

 * [x] Chatbot can answer medical questions (question-answering/text-classification task).
 * [ ] Chatbot can summarize medical documents, especially physical examination reports (summarization task).
 * [ ] Chatbot can give advice according to specific documentation.
 * [ ] Rewrite the training script. [Drawbacks](#drawbacks) are analyzed before.
 * [ ] Prepare datasets for more features: document summarization and give advices.
 * [ ] Train multiple models for different tasks.
 * [ ] Combine multiple models on the front end page.
 * [ ] Apply prompt to the Chatbot

### References

  - [Llama 2: Open Foundation and Fine-Tuned Chat Models](#https://doi.org/10.48550/arXiv.2307.09288)
  - [Fine-tuning with PEFT](#https://huggingface.co/blog/llama2#fine-tuning-with-peft)
