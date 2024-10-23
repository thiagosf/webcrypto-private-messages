# webcrypto-private-messages

It's a web application that uses [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) to encrypt/decrypt messages using public and private keys.

Only the author and the receiver of the message can read it.

![Web app preview](docs/preview.png)

## How it works

1. Pair of keys are created to each visitor.
2. Visitor fills the form with `receiver uuid` and the message.
3. When submitting the form, one encrypted message is created using the `author public key` and another using `receiver public key`.

## Sources

- We have used [this repository](https://github.com/diafygi/webcrypto-examples?tab=readme-ov-file#rsa-oaep) as reference to manage the key pairs.

## Dev

```sh
npm install
npm run dev
```

## Todo

- [ ] Add messages filter by user uuid
- [ ] Show error on input when receiver uuid is invalid
- [ ] Add link to `from` and `to` uuids to filter messages
- [ ] Add pagination
- [ ] Add skeleton UI loading
- [ ] Improve mobile UI
- [ ] Use websocket to load new messages
