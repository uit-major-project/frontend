export type Themes = 'dark' | 'light';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  image?: string;
  phone?: string;
  permanentAddress?: string;

  bookings?: [any];

  tasks: any;
}
