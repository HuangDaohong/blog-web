/// <reference types="vite/client" />

declare module '*.ts';
declare module '*.js';
declare module '*.svg';

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
