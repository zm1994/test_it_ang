import { User } from './user.model'
export class Comment{
  id?: string;
  product?: string;
  rate?: number;
  text?: string;
  created_by: User;
  id_entry?: string;
  created_at: Date;
}
