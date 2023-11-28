from transformers import AutoTokenizer
import transformers
import torch

import os

model = os.getcwd() + "/model"

tokenizer = AutoTokenizer.from_pretrained(model)
pipeline = transformers.pipeline(
    "text-generation",
    model=model,
    torch_dtype=torch.float16,
    device_map="auto"
)

chat_history = []

while True:
    question = input("User: ").strip("\r")

    chat_history.append(question)

    if chat_history[-1] == "stop":
        break

    sequences = pipeline(
        question,
        do_sample=True,
        top_k=10,
        num_return_sequences=1,
        eos_token_id=tokenizer.eos_token_id,
        max_length=512,
    )
    for seq in sequences:
        # print(f"Result: {seq['generated_text']}")
        chat_history.append(seq['generated_text'])

    print("Result: " + chat_history[-1])