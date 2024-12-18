import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase.types";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZGFmdWlscWZvd3VpZnFub2NnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjA5NTQzNiwiZXhwIjoyMDQ3NjcxNDM2fQ.62PK9-FKU4kOeMdmQm731impoh4OhV2zOoKc7_Gmcpo"

  // import.meta.env.VITE_SUPABASE_ANON_KEY,
);
