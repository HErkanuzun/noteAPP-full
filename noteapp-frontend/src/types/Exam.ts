export interface Exam {
  id: number;
  subject: string;
  storage_link?: string;  // Make it optional with ?
  imageUrl?: string;
  // Add other properties as needed
}
