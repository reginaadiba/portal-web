import 'express';

declare module 'express' {
  export interface Request {
    user?: {
      id: number;
      name: string;
      email?: string;
      role?: string;
      // tambah field lain sesuai payload JWT kamu
    };
  }
}
