# webcrypto-private-messages

It's a web application that uses [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) to encrypt/decrypt messages using public and private keys.

Only the author and the receiver of the message can read it.

![Web app preview](docs/preview.png)

## How it works

1. Pair of keys are created to each visitor.
2. Visitor fills the form with `receiver uuid` and the message.
3. When submitting the form, one encrypted message is created using the `author uuid` and another using `receiver uuid`.

## Sources

- We have used [this repository](https://github.com/diafygi/webcrypto-examples?tab=readme-ov-file#rsa-oaep) as reference to manage the key pairs.

## Dev

```sh
npm install
npm run dev
```
