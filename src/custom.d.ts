declare module "*.svg" {
  const path: string;
  export default path;
}

declare namespace NodeJS {
  export type ProcessEnv = {
    PUBLIC_URL: string;
  };
}
