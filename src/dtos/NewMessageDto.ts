export interface NewMessageDto {
  receiverUUID?: string,
  receiverPublicKey?: CryptoKey,
  message?: string
}
