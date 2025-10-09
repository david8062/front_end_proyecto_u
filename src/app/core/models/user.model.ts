export interface User {      // en lugar de uniqueID → más consistente
  firstName: string;
  middleName: string;
  lastName: string;
  secondLastName: string;
  studentCode: string;
  email: string;
  facultyId: string;
  roles: string;
  passwordResetId: string | null;
  password?: string;             // opcional si lo usas en registro
}
