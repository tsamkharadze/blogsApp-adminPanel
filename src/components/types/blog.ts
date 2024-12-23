export interface BlogFormInputs {
  id?: number;
  created_at?: string | null;
  title_ka?: string | null;
  title_en?: string | null;
  description_ka?: string | null;
  description_en?: string | null;
  user_id?: string | null;
  image_url?: string | null;
  file?: FileList | null;
}

export interface Blog {
  id: string;
  created_at: string;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
  user_id: string;
  image_url: string;
}
