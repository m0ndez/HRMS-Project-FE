/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_ENVIRONMENT_NAME: string
    readonly VITE_PORJECT_API_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }