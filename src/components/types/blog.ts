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
