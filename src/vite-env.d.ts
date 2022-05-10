/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_ENVIRONMENT_NAME: string
    readonly VITE_PROJECT_API_URL: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }