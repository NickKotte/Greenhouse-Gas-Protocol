export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      egrid: {
        Row: {
          subregion_1: string
          subregion_2: string | null
          subregion_3: string | null
          zip_code: string
        }
        Insert: {
          subregion_1: string
          subregion_2?: string | null
          subregion_3?: string | null
          zip_code: string
        }
        Update: {
          subregion_1?: string
          subregion_2?: string | null
          subregion_3?: string | null
          zip_code?: string
        }
        Relationships: []
      }
      facilities: {
        Row: {
          city: string | null
          deleted_at: string | null
          egrid_subregion: string | null
          id: string
          name: string
          square_footage: number | null
          state: string | null
          street: string | null
          workbook_id: string
          zip: string | null
        }
        Insert: {
          city?: string | null
          deleted_at?: string | null
          egrid_subregion?: string | null
          id?: string
          name: string
          square_footage?: number | null
          state?: string | null
          street?: string | null
          workbook_id: string
          zip?: string | null
        }
        Update: {
          city?: string | null
          deleted_at?: string | null
          egrid_subregion?: string | null
          id?: string
          name?: string
          square_footage?: number | null
          state?: string | null
          street?: string | null
          workbook_id?: string
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facilities_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["workbook_id"]
          },
        ]
      }
      inventory_years: {
        Row: {
          deleted_at: string | null
          id: string
          note: string | null
          workbook_id: string
          year: number
        }
        Insert: {
          deleted_at?: string | null
          id?: string
          note?: string | null
          workbook_id: string
          year: number
        }
        Update: {
          deleted_at?: string | null
          id?: string
          note?: string | null
          workbook_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "inventory_years_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["workbook_id"]
          },
        ]
      }
      mobile_combustion: {
        Row: {
          activity_type: string | null
          facility_id: string | null
          fuel_amount: number | null
          fuel_type: string | null
          fuel_units: string | null
          id: string
          note: string | null
          results_id: string
          workbook_id: string
          year: number
        }
        Insert: {
          activity_type?: string | null
          facility_id?: string | null
          fuel_amount?: number | null
          fuel_type?: string | null
          fuel_units?: string | null
          id?: string
          note?: string | null
          results_id: string
          workbook_id: string
          year: number
        }
        Update: {
          activity_type?: string | null
          facility_id?: string | null
          fuel_amount?: number | null
          fuel_type?: string | null
          fuel_units?: string | null
          id?: string
          note?: string | null
          results_id?: string
          workbook_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "mobile_combustion_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mobile_combustion_results_id_fkey"
            columns: ["results_id"]
            isOneToOne: false
            referencedRelation: "results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mobile_combustion_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["workbook_id"]
          },
        ]
      }
      purchased_electricity: {
        Row: {
          electricity_amount: number | null
          electricity_units: string | null
          facility_id: string | null
          id: string
          note: string | null
          results_id: string
          workbook_id: string
          year: number
        }
        Insert: {
          electricity_amount?: number | null
          electricity_units?: string | null
          facility_id?: string | null
          id?: string
          note?: string | null
          results_id: string
          workbook_id: string
          year: number
        }
        Update: {
          electricity_amount?: number | null
          electricity_units?: string | null
          facility_id?: string | null
          id?: string
          note?: string | null
          results_id?: string
          workbook_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchased_electricity_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchased_electricity_results_id_fkey"
            columns: ["results_id"]
            isOneToOne: false
            referencedRelation: "results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchased_electricity_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["workbook_id"]
          },
        ]
      }
      results: {
        Row: {
          ch4: number | null
          co2: number | null
          co2e: number | null
          id: string
          kgco2e: number | null
          n2o: number | null
          workbook_id: string
        }
        Insert: {
          ch4?: number | null
          co2?: number | null
          co2e?: number | null
          id?: string
          kgco2e?: number | null
          n2o?: number | null
          workbook_id: string
        }
        Update: {
          ch4?: number | null
          co2?: number | null
          co2e?: number | null
          id?: string
          kgco2e?: number | null
          n2o?: number | null
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "results_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["workbook_id"]
          },
        ]
      }
      stationary_combustion: {
        Row: {
          facility_id: string | null
          fuel_amount: number | null
          fuel_type: string | null
          fuel_units: string | null
          id: string
          note: string | null
          results_id: string
          workbook_id: string
          year: number
        }
        Insert: {
          facility_id?: string | null
          fuel_amount?: number | null
          fuel_type?: string | null
          fuel_units?: string | null
          id?: string
          note?: string | null
          results_id: string
          workbook_id: string
          year: number
        }
        Update: {
          facility_id?: string | null
          fuel_amount?: number | null
          fuel_type?: string | null
          fuel_units?: string | null
          id?: string
          note?: string | null
          results_id?: string
          workbook_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "stationary_combustion_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stationary_combustion_results_id_fkey"
            columns: ["results_id"]
            isOneToOne: false
            referencedRelation: "results"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stationary_combustion_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["workbook_id"]
          },
        ]
      }
      user_workbook: {
        Row: {
          deleted_at: string | null
          user_id: string
          workbook_id: string
        }
        Insert: {
          deleted_at?: string | null
          user_id: string
          workbook_id: string
        }
        Update: {
          deleted_at?: string | null
          user_id?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_workbook_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workbook_workbook_id_fkey"
            columns: ["workbook_id"]
            isOneToOne: false
            referencedRelation: "workbook"
            referencedColumns: ["workbook_id"]
          },
        ]
      }
      workbook: {
        Row: {
          created_at: string
          name: string
          owner_id: string
          workbook_id: string
        }
        Insert: {
          created_at?: string
          name: string
          owner_id: string
          workbook_id?: string
        }
        Update: {
          created_at?: string
          name?: string
          owner_id?: string
          workbook_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workbook_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_workbook_to_user_metadata: {
        Args: {
          user_id: string
          workbook_id: string
        }
        Returns: undefined
      }
      assign_admin_role_rpc: {
        Args: {
          target_user_id: string
        }
        Returns: boolean
      }
      create_new_workbook: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      delete_users_rpc: {
        Args: {
          user_ids: string[]
        }
        Returns: undefined
      }
      get_all_admins_rpc: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_id: string
          email: string
          added_by: string
          added_at: string
        }[]
      }
      get_all_users_with_roles_rpc: {
        Args: Record<PropertyKey, never>
        Returns: {
          user_id: string
          email: string
          roles: string[]
        }[]
      }
      get_user_details_rpc: {
        Args: {
          input_user_id: string
        }
        Returns: {
          user_id: string
          email: string
          last_sign_in_at: string
          raw_app_meta_data: Json
          email_change: string
          email_confirmed_at: string
          user_created_at: string
          banned_until: string
          deleted_at: string
          confirmed_at: string
          last_session_created_at: string
          last_session_updated_at: string
          workbooks: Json
          roles: string[]
        }[]
      }
      invite_user_to_workbook: {
        Args: {
          p_invited_user_email: string
          p_workbook_id: string
        }
        Returns: boolean
      }
      remove_admin_role_rpc: {
        Args: {
          target_user_id: string
        }
        Returns: boolean
      }
      remove_user_from_workbook: {
        Args: {
          p_removed_user_email: string
          p_workbook_id: string
        }
        Returns: boolean
      }
      remove_workbook_from_user_metadata: {
        Args: {
          user_id: string
          workbook_id: string
        }
        Returns: undefined
      }
      update_user_metadata: {
        Args: {
          user_id: string
          workbook_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
