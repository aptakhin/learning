The idea is to build service helping co-learn things around and manage products. It should have the way of keeping things from initial product researches to prototypes and further iterations allowing to return back to some step.

Should be flexible structure with allow to link different artifacts from different sources like LLM-chats, Markdown-artifacts and agents over code repositories.
Flexibility here is the key and the main pain point if it will give too much chaos. There should be mechanisms of rules, which can be enabled on one or another space.

Base structure is `Entity`. It has fields:
- `kind` written in form of `domain.tld/KIND_NAME`, where domain.tld is a domain of implementor. For the case of default entities please consider `domain.tld=freelearning.org`
- `version` in semantic versioning `major.minor.patch`
- `data` - json data. Data should be validated by registered jsonschema for this kind and major version.

For every change of entity we keep track of latest `N` days of all changes.

Entity is the raw data. It can have links to other entities according to schema.

But view representation of Entity is a different structure for the case to allow to build multiple view representations for Entity (Model).

`Space` is a set of Entities, over which users can work collaboratively. One of the possible space visual representation is infinite board.

## Some standard types

### Note
View UI: Textbox implementation.

### Document
File

### Link

### LLM-Chat

# Questions
Links are parts of View or Entities? Some Entities can follow others naturally, but is it always the case?

## Multitenancy
We keep the data multitenant way. For public Open Source version tenant is only one. For SAAS and Enterprise version allowed to use more databases.
