interface IThumbnail {
  url: string;
}

export interface IProduct {
  id: number;
  thumbnail: IThumbnail;
  title: string;
  description: string;
  price: number;
}

export interface IProductSlice {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: {
    url: string;
  };
}
export interface ICartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: {
    url: string;
  };
}

export interface IProductTable {
  id?: number;
  title: string;
  price: number;
  stock: number;
  documentId?:string
  description?:string
  categories: {
    id: number;
    title: string;
  }[];
  thumbnail: {
    url: string;
    alternativeText:string
  };
}

export interface IProductToEdit {
  id?: number;
  title?: string;
  price?: number;
  stock?: number;
  documentId?: string;
  description?: string;
  categories?: {
    id: number;
    title: string;
  }[];
  thumbnail?: {
    url: string; 
    id?: number;
  };
}
