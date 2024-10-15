# private-messages

Using [this repository](https://github.com/diafygi/webcrypto-examples?tab=readme-ov-file#rsa-oaep) as reference to manage the keys.

## Dev

```sh
npm install
npm run dev
```

## Todo

- [x] Create 3 keyPairs for testing
- [ ] Add a form to paste the `receiverUuid` and write a message

## Auth flow

- [ ] Create or load keyPairs
- [ ] Send public key to back-end to create auth code
- [ ] User decrypt auth code and send it back to back-end
- [ ] Back-end compare auth code with user's decrypt value
- [ ] Back-end get or create user uuid
- [ ] User get jwt token and user uuid to use into protected routes
