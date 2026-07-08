/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NBU_EXCHANGE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
