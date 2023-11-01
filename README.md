# Welcome to Family+

**Family+** is an innovative web application that leverages the power of AI and blockchain technology to revolutionize the way individuals understand and utilize their medical documents. This platform brings together cutting-edge features such as AI-enhanced document comprehension, a secure blockchain network, and a unique role-based system with Doctors, Patients, and Family Members. It's a groundbreaking project that merges AI and blockchain to empower individuals with a deeper understanding of their medical documents. By providing users with greater control over their health information, we aim to improve healthcare outcomes and potentially reduce costs. With **Family+**, you'll gain better control over your health information and make more informed healthcare decisions.


## Table of Contents
  - [Key Features](#key-features)
  - [AI Models](#ai-models)
  - [Blockchain Architecture](#blockchain-architecture)
  - [Diagrams](#diagrams)
  - [Disclaimer](#disclaimer)
  - [License](#license)
  - [Reference](#reference)


### Key Features

- **AI-Enhanced Document Comprehension**: Our AI system interprets complex medical documents, simplifying terminology and presenting information in a user-friendly manner.

- **Secure Blockchain Network**: Family+ employs blockchain technology to ensure the security and immutability of your health data.

- **Supervisors and Users**: This unique role-based system allows medical professionals (Supervisors) to guide and clarify medical information for users, creating a collaborative healthcare experience.

- **Improved Healthcare Decision-Making**: By better understanding their medical documents, users can make more informed decisions about their health and treatment options.

- **Enhanced Health Outcomes**: We believe that informed decision-making leads to better health outcomes, ultimately benefiting individuals and the healthcare system.

---

### AI Models
#### Llama 2: High-Level Description and Rationale

##### Introduction
Llama 2, developed by Meta, is a second-generation open-source language model designed for various AI applications. This document provides a brief overview of what Llama 2 is, how it works, and why it is a popular choice in the AI community.

##### What is Llama 2?
- **Key Features**:
  - Developed by Meta.
  - Open-Source Language Model.
  - Easy to Fine-Tune.

Llama 2 is an enhanced version of the original Llama model, boasting several key advantages:

- **Data Training**:
  - Trained on a more diverse and recent dataset from publicly available internet data.
  - Utilizes 40% more data than its predecessor (Llama 1).
  - Doubles the context length, accommodating up to 4,000 tokens.

- **Performance**:
  - Outperforms other major open-source models like Falcon and MBT across multiple metrics.
  - One of the most powerful open-source large language models available.

(For more information, refer to [Llama 2 Documentation](https://huggingface.co/docs/transformers/main/model_doc/llama2))

##### How does Llama 2 Work?
Llama 2 is built on the foundation of transformer architecture, a revolutionary deep learning model for natural language processing and AI tasks. Key aspects of how it operates include:

- **Transformer Architecture**:
  - Utilizes self-attention mechanism, parallel processing, positional encoding, and stacked layers.
  - Efficiently captures dependencies and relationships within data.
  - Proven effectiveness in various AI tasks, including machine translation and sentiment analysis.

- **Fine-Tuning**:
  - Enhances Llama 2's performance by specializing it in specific tasks and domains.
  - Injects domain-specific knowledge, improves consistency, reduces bias, and adapts to user needs.

(For more information on transformer architecture, see [Transformer Architecture](https://huggingface.co/docs/transformers/main/model_doc/transformer) and [FOCI LLM Users Group 20 Sep 2023](https://rensselaer.webex.com/recordingservice/sites/rensselaer/recording/bd89d2323a2e103cb5be00505681e571/playback))

##### Fine-Tuning Parameters
Fine-tuning is a critical process for optimizing Llama 2. Key parameters to consider include:

- **Data Type**:
  - Varying data types, such as float32, int8, int4, or even 1 bit, affecting memory and disk usage during training.

- **Weight Adjustment**:
  - Tailoring the model for specific use cases by modifying weight parameters.
  - One common method is Low-Rank Adaptation (LoRA) using small matrices to generate a low-rank matrix added to the weights.

- **Temperature**:
  - Adjusting temperature to introduce more randomness into the model's outputs.

- **Datasets**:
  - Various datasets can be found on [Hugging Face](https://huggingface.co/). In this project, we will use medical datas include medical terms, dialugues, and so on.

(For examples and details on fine-tuning, see section (2) in [Llama 2 Documentation](https://huggingface.co/docs/transformers/main/model_doc/llama2) and [FOCI LLM Users Group 18 Oct 2023](https://tw.rpi.edu/sites/default/files/2023-10/10-18-LLM-User-Group.pdf))

##### Why Use Llama 2?
- **Popularity**:
  - Llama 2 is one of the most popular open-resource large language models in the AI community.

- **User Community**:
  - A large user community provides access to fine-tuned models, diverse datasets, and free instructions online.

- **High Performance**:
  - Llama 2 delivers outstanding performance in various AI applications.

- **Ease of Deployment**:
  - Easily deploy Llama 2 on your local machine for AI development.

---

### Blockchain Architecture
#### Ethereum: High-Level Description and Rationale
Ethereum is a decentralized, open-source blockchain platform that was created to enable the development of decentralized applications (DApps) and smart contracts.

#### Why Use Ethereum?
-**Security and Immutability**:
 -Health data is sensitive, and ensuring the integrity and security of this data is crucial. Ethereum’s consensus mechanism and encryption techniques can help maintain data security and prevent unauthorized access or modification.

-**Smart Contracts and Familiarity**:
 -We can deploy smart contracts, which are self-executing, tamper-proof agreements that can automate various processes in your health-data network. We can use smart contracts to manage access control, consent management, and data sharing, and we have a working familiarity with it from previous Solidity lab experiences.

-**Interoperability**:
 -Ethereum has a wide range of developer tools, libraries, and APIs, making it easier to integrate with existing systems and applications. This can be especially useful in healthcare, where interoperability between different systems and providers is a significant challenge.

-**Decentralization**:
 -This can enhance trust and reduce the risk of data manipulation or unauthorized changes. It's particularly important for health data, where trust and data integrity are paramount.

-**Permissioned Access**:
 -It is possible to create a permissioned network on top of Ethereum by controlling access to the health-data blockchain by managing the permissions of nodes, users, and smart contracts.

-**Community and Ecosystem**:
 -Ethereum has a large and active development community, which means you can tap into a wealth of resources, tools, and expertise to support your health-data blockchain project.

#### Some Limitations of Ethereum
-**Scalability**:
 -Ethereum has faced challenges with scalability, which may affect the performance of a health-data network with high transaction volumes.
-**Cost**:
 -Using Ethereum can be expensive, especially when deploying smart contracts and conducting frequent transactions. The cost implications need to be considered carefully, particularly for a permissioned network.
-**Privacy**:
 -While Ethereum can be adapted for permissioned networks, privacy remains a concern. We need to implement additional privacy measures to protect sensitive health data.


---

### Diagrams
1. **High-level component diagram**:
* <img src="./Diagrams/2.png" alt="drawing" width="500"/>
* Some explanation of abbreviation:
    *  SK = Secret Key; PK = Public Key; ESK = Ethermeral Symmetric Key; Enc = Encrypt
    * PK_U = Public Key of User; PK_P1 = Public Key of Provider 1
* Description of the diagram:
    * The high-level component diagram for the project encompasses two primary entities: the Provider and the User, each equipped with a pair of asymmetric keys, denoted as (SK, PK) for secure communication.

    * **Provider**
        * Responsibilities and Actions
            * Document Preparation: The Provider initiates the process with the possession of a document that they intend to share with the User.
            * Ephemeral Symmetric Key Generation: To ensure data confidentiality, the Provider generates an ephemeral symmetric key (ESK), a temporary key used exclusively for this specific data exchange.
            * Document Encryption: Utilizing the ESK, the Provider encrypts the document, securing it against unauthorized access.
            * IPFS Integration: The encrypted document is then uploaded to the InterPlanetary File System (IPFS), a distributed storage system for decentralized data storage. This action results in the acquisition of a unique IPFS link associated with the encrypted document.
            * Data Encryption for User: The Provider encrypts both the IPFS link and the ESK using the User's public key (PK). This ensures that only the User, possessing the corresponding private key (SK), can access and decrypt the data.
            * Blockchain Entry: The encrypted data, including the IPFS link and ESK, is added to the blockchain using a smart contract. This entry is uniquely identified and associated with a predefined string identifier, providing a secure and immutable record.

    * **User**
        * Responsibilities and Actions
            * Blockchain Monitoring: The User periodically monitors the blockchain for any updates or new entries.
            * Identification of New Document: Upon identifying a new document entry, the User becomes aware of a new data addition to the blockchain.
            * Data Retrieval: The User retrieves the encrypted cyphertext from the blockchain, preparing to access the document.
            * cyphertext Decryption: Using their private key (SK), the User decrypts the encrypted cyphertext, revealing the embedded ESK and the IPFS link.
            * IPFS Interaction: The User uses the obtained IPFS link to access the encrypted document stored on the IPFS network, ensuring that it remains secure and available for retrieval.
            * Document Decryption: Finally, the User decrypts the document using the ESK, ensuring that the original document is accessible for their use.

2. **Sequence Diagrams**:
<img src="./Diagrams/SD.png" alt="drawing" width="800"/>

This sequence diagram delineates the workflow  of the project. It elucidates the interactions among users, general provider, Portal on our website, IPFS, Smart contract, third party provider, chatBot, and family members for the purpose of accessing and managing medical record and the purpose of seeking information and responses to users' inquiries.

---

### Why Family+

Family+ is a game-changer in the healthcare industry for several reasons:

- **Empowering Individuals**: We put control over health information back in the hands of the individuals, enhancing their ability to make informed choices.

- **Enhanced Health Outcomes**: Informed healthcare decisions can lead to better health outcomes, benefiting both users and the healthcare system.

- **Privacy and Security**: Our blockchain technology ensures the highest level of data security and privacy.

- **Reduced Healthcare Costs**: With better-informed decisions, we anticipate a potential reduction in healthcare costs.


### License

This project is licensed under the [Apache License](LICENSE).


### Disclaimer 
Family+ is not a substitute for professional medical advice or diagnosis. Always consult with a qualified healthcare provider for medical concerns.

### Reference
- [Llama 2 Documentation](https://huggingface.co/docs/transformers/main/model_doc/llama2)
- [Transformer Architecture](https://huggingface.co/docs/transformers/main/model_doc/transformer)
- [Llama 2 User Group](https://tw.rpi.edu/sites/default/files/2023-10/10-18-LLM-User-Group.pdf)
