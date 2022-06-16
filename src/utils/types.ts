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

export enum TaskType {
  cleaning = 'cleaning',
  moving = 'moving',
  electrician = 'electrician',
  mechanic = 'mechanic',
  mounting = 'mounting',
  plumber = 'plumber',
  painter = 'painter',
  cook = 'cook',
  driver = 'driver',
  technician = 'technician',
}

export interface Tasker {
  id: string;
  createdAt: any;
  updatedAt: any;

  firstname: string;
  lastname: string;
  email: string;
  image: string;
  pincode?: string;
  phone?: string;
  permanentAddress?: string;

  pricePerHour?: number;
  ratings?: any;
  experience?: string;
  category?: TaskType;

  isVerified?: boolean;
  hasPaidOneTimeFee?: boolean;
  isActive?: boolean;

  inContact?: any;
  assigned?: any;
}
