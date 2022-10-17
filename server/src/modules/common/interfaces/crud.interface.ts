export interface CRUD {
  // list: (limit: number, page: number) => Promise<any>;
  create: (resource: any) => Promise<any>;
  // updateById: (id: string, resource: any) => Promise<any>;
  // readById: (id: string) => Promise<any>;
  // deleteById: (id: string) => Promise<any>;
}
