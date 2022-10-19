declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URI: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      JWT_SECRET: string;
      JWT_EXPIRE: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
