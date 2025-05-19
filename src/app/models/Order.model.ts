import { Product } from "./Product.model";

export default interface Order {
  id: string;       
  uid: string;      
  items: Product[];      
  total: number;
  date: string;       
  status: 'Placed' | 'OnTheWay' | 'Delivered' | 'Processing'; 
}
