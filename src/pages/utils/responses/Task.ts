// Define the type for a task
export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string; // Or Date, depending on your API
  courseId: number;
  departmentId: number;
  staffId: number;
  programmeId: number;
  completed: boolean;
};