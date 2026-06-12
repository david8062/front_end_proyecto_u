export type ServiceType =
  | 'CLASE_PERSONALIZADA'
  | 'REVISION_TAREA'
  | 'REVISION_PARCIAL'
  | 'TUTORIA_PROYECTO';

export type DegreeLevel =
  | 'BACHILLERATO'
  | 'PREGRADO'
  | 'ESPECIALIZACION'
  | 'MAESTRIA'
  | 'DOCTORADO';

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type SubjectLevel = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';

export type SessionStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Education {
  uniqueID: string;
  degree: DegreeLevel;
  institution: string;
  field: string;
  start_year: number;
  end_year?: number;
  is_current: boolean;
  profile_id: string;
}

export interface TeacherSubject {
  uniqueID: string;
  level: SubjectLevel;
  description?: string;
  profile_id: string;
  category_id: string;
  category?: { uniqueID: string; name: string; description: string };
}

export interface PricingPlan {
  uniqueID: string;
  service_type: ServiceType;
  price: number;
  description?: string;
  is_active: boolean;
  profile_id: string;
}

export interface Availability {
  uniqueID: string;
  day_of_week: DayOfWeek;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  is_active: boolean;
  profile_id: string;
}

export interface TeacherUser {
  primer_nombre: string;
  primer_apellido: string;
  email: string;
}

export interface Profile {
  UniqueID: string;
  description?: string;
  experience?: string;
  profile_img?: string;
  specialization?: string;
  web_site?: string;
  social_networks?: string;
  professional_certificates?: string;
  is_verified: boolean;
  is_active: boolean;
  user_id: string;
  user?: TeacherUser;
  education?: Education[];
  subjects?: TeacherSubject[];
  pricingPlans?: PricingPlan[];
  availability?: Availability[];
}

export interface TimeSlot {
  start_time: string;
  end_time: string;
  available: boolean;
}

export interface Session {
  uniqueID: string;
  student_id: string;
  profile_id: string;
  availability_id: string;
  service_type: ServiceType;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  status: SessionStatus;
  notes?: string;
  created_at: string;
  profile?: Profile;
  availability?: Availability;
}

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  CLASE_PERSONALIZADA: 'Clase personalizada',
  REVISION_TAREA: 'Revisión de tarea',
  REVISION_PARCIAL: 'Revisión de parcial',
  TUTORIA_PROYECTO: 'Tutoría de proyecto',
};

export const DEGREE_LABELS: Record<DegreeLevel, string> = {
  BACHILLERATO: 'Bachillerato',
  PREGRADO: 'Pregrado',
  ESPECIALIZACION: 'Especialización',
  MAESTRIA: 'Maestría',
  DOCTORADO: 'Doctorado',
};

export const DAY_LABELS: Record<DayOfWeek, string> = {
  MONDAY: 'Lunes',
  TUESDAY: 'Martes',
  WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves',
  FRIDAY: 'Viernes',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
};

export const LEVEL_LABELS: Record<SubjectLevel, string> = {
  BASIC: 'Básico',
  INTERMEDIATE: 'Intermedio',
  ADVANCED: 'Avanzado',
};

export const SESSION_STATUS_LABELS: Record<SessionStatus, string> = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  CANCELLED: 'Cancelada',
  COMPLETED: 'Completada',
};
