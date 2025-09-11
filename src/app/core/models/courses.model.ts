
export interface Course {
  uniqueID: string;
  name: string;
  description: string;
  title: string; // corregido
  level: string;
  url_image: string; // mantener snake_case si no usas transformaciones
  category_id: string;
  teachaer_user_id: string; // mantener como lo manda el backend
  teacher: Teacher;
}

export interface Teacher {
  uniqueID: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  cod_estudiante: string;
  email: string;
  has_password: string;
  faculty_uuid: string;
  rol_uuid: string;
  id_password_reset: string | null;
}