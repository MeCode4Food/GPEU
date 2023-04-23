/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEFAULT_PROJECT: string
  readonly VITE_PUBSUB_EMULATOR_HOST: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
