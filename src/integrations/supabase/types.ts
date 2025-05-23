export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          key: string
          service: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          key: string
          service: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          key?: string
          service?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      assets: {
        Row: {
          bedrooms: number | null
          bua: number | null
          building: string | null
          created_at: string | null
          id: number
          plot: number | null
          property_type: string | null
          sector_zone: string | null
          status: string | null
          type: string | null
          unit_no: string
          unit_type: string | null
          updated_at: string | null
          zone: string | null
        }
        Insert: {
          bedrooms?: number | null
          bua?: number | null
          building?: string | null
          created_at?: string | null
          id: number
          plot?: number | null
          property_type?: string | null
          sector_zone?: string | null
          status?: string | null
          type?: string | null
          unit_no: string
          unit_type?: string | null
          updated_at?: string | null
          zone?: string | null
        }
        Update: {
          bedrooms?: number | null
          bua?: number | null
          building?: string | null
          created_at?: string | null
          id?: number
          plot?: number | null
          property_type?: string | null
          sector_zone?: string | null
          status?: string | null
          type?: string | null
          unit_no?: string
          unit_type?: string | null
          updated_at?: string | null
          zone?: string | null
        }
        Relationships: []
      }
      contribution_calculations: {
        Row: {
          breakdown: Json | null
          building_share: number
          calculation_date: string | null
          created_at: string | null
          id: string
          master_share: number
          total_annual_contribution: number
          unit_no: string
          year: number
          zone_share: number
        }
        Insert: {
          breakdown?: Json | null
          building_share?: number
          calculation_date?: string | null
          created_at?: string | null
          id?: string
          master_share?: number
          total_annual_contribution: number
          unit_no: string
          year: number
          zone_share?: number
        }
        Update: {
          breakdown?: Json | null
          building_share?: number
          calculation_date?: string | null
          created_at?: string | null
          id?: string
          master_share?: number
          total_annual_contribution?: number
          unit_no?: string
          year?: number
          zone_share?: number
        }
        Relationships: []
      }
      contribution_rates: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: number
          property_type: string | null
          rate: number
          updated_at: string | null
          year: number
          zone: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id: number
          property_type?: string | null
          rate: number
          updated_at?: string | null
          year: number
          zone: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: number
          property_type?: string | null
          rate?: number
          updated_at?: string | null
          year?: number
          zone?: string
        }
        Relationships: []
      }
      operating_expenses: {
        Row: {
          allocation: string
          annual_cost: number
          category: string
          created_at: string | null
          description: string | null
          id: string
          month: number | null
          monthly_cost: number
          notes: string | null
          quarter: number | null
          service_provider: string
          service_type: string
          status: string
          updated_at: string | null
          year: number
        }
        Insert: {
          allocation?: string
          annual_cost: number
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          month?: number | null
          monthly_cost: number
          notes?: string | null
          quarter?: number | null
          service_provider: string
          service_type: string
          status: string
          updated_at?: string | null
          year?: number
        }
        Update: {
          allocation?: string
          annual_cost?: number
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          month?: number | null
          monthly_cost?: number
          notes?: string | null
          quarter?: number | null
          service_provider?: string
          service_type?: string
          status?: string
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      property_owners: {
        Row: {
          client_name: string
          client_name_arabic: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          id: string
          nationality: string | null
          region: string | null
          updated_at: string | null
        }
        Insert: {
          client_name: string
          client_name_arabic?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          id?: string
          nationality?: string | null
          region?: string | null
          updated_at?: string | null
        }
        Update: {
          client_name?: string
          client_name_arabic?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          id?: string
          nationality?: string | null
          region?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      property_transactions: {
        Row: {
          created_at: string | null
          id: string
          owner_id: string | null
          property_id: string | null
          spa_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          owner_id?: string | null
          property_id?: string | null
          spa_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          owner_id?: string | null
          property_id?: string | null
          spa_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_transactions_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "property_owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_transactions_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_service_charge_data"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "property_transactions_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_units"
            referencedColumns: ["id"]
          },
        ]
      }
      property_units: {
        Row: {
          anticipated_handover_date: string | null
          bua: number | null
          created_at: string | null
          handover_date: string | null
          has_lift: boolean | null
          id: string
          plot_size: number | null
          property_type: string | null
          sector: string | null
          status: string | null
          unit_no: string
          unit_type: string | null
          unit_value: number | null
          updated_at: string | null
          zone_code: string | null
        }
        Insert: {
          anticipated_handover_date?: string | null
          bua?: number | null
          created_at?: string | null
          handover_date?: string | null
          has_lift?: boolean | null
          id?: string
          plot_size?: number | null
          property_type?: string | null
          sector?: string | null
          status?: string | null
          unit_no: string
          unit_type?: string | null
          unit_value?: number | null
          updated_at?: string | null
          zone_code?: string | null
        }
        Update: {
          anticipated_handover_date?: string | null
          bua?: number | null
          created_at?: string | null
          handover_date?: string | null
          has_lift?: boolean | null
          id?: string
          plot_size?: number | null
          property_type?: string | null
          sector?: string | null
          status?: string | null
          unit_no?: string
          unit_type?: string | null
          unit_value?: number | null
          updated_at?: string | null
          zone_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_units_zone_code_fkey"
            columns: ["zone_code"]
            isOneToOne: false
            referencedRelation: "service_charge_zones"
            referencedColumns: ["code"]
          },
        ]
      }
      reserve_fund_rates: {
        Row: {
          created_at: string | null
          effective_date: string
          id: number
          notes: string | null
          rate: number
          zone_code: string
        }
        Insert: {
          created_at?: string | null
          effective_date: string
          id: number
          notes?: string | null
          rate?: number
          zone_code: string
        }
        Update: {
          created_at?: string | null
          effective_date?: string
          id?: number
          notes?: string | null
          rate?: number
          zone_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "reserve_fund_rates_zone_code_fkey"
            columns: ["zone_code"]
            isOneToOne: false
            referencedRelation: "service_charge_zones"
            referencedColumns: ["code"]
          },
        ]
      }
      service_charge_calculations: {
        Row: {
          base_rate: number
          calculation_date: string | null
          created_at: string | null
          has_lift_access: boolean
          id: string
          lift_rate: number
          lift_share: number
          monthly: number
          operating_share: number
          property_id: string | null
          property_size: number
          quarterly: number
          reserve_contribution: number
          reserve_rate: number
          total_annual: number
          zone_code: string
        }
        Insert: {
          base_rate: number
          calculation_date?: string | null
          created_at?: string | null
          has_lift_access?: boolean
          id?: string
          lift_rate?: number
          lift_share?: number
          monthly?: number
          operating_share?: number
          property_id?: string | null
          property_size: number
          quarterly?: number
          reserve_contribution?: number
          reserve_rate?: number
          total_annual?: number
          zone_code: string
        }
        Update: {
          base_rate?: number
          calculation_date?: string | null
          created_at?: string | null
          has_lift_access?: boolean
          id?: string
          lift_rate?: number
          lift_share?: number
          monthly?: number
          operating_share?: number
          property_id?: string | null
          property_size?: number
          quarterly?: number
          reserve_contribution?: number
          reserve_rate?: number
          total_annual?: number
          zone_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_charge_calculations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_service_charge_data"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "service_charge_calculations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "property_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_charge_calculations_zone_code_fkey"
            columns: ["zone_code"]
            isOneToOne: false
            referencedRelation: "service_charge_zones"
            referencedColumns: ["code"]
          },
        ]
      }
      service_charge_zones: {
        Row: {
          code: string
          created_at: string | null
          id: number
          name: string
          reserve_fund_rate: number
          service_charge_rate: number
          total_bua: number
          unit_count: number
        }
        Insert: {
          code: string
          created_at?: string | null
          id: number
          name: string
          reserve_fund_rate?: number
          service_charge_rate?: number
          total_bua?: number
          unit_count?: number
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: number
          name?: string
          reserve_fund_rate?: number
          service_charge_rate?: number
          total_bua?: number
          unit_count?: number
        }
        Relationships: []
      }
      stp_daily_data: {
        Row: {
          bod: number | null
          cod: number | null
          created_at: string | null
          date: string
          direct_sewage_mb: number | null
          expected_volume_tankers: number | null
          id: string
          nh4_n: number | null
          ph: number | null
          tanker_trips: number | null
          tn: number | null
          total_influent: number | null
          total_water_processed: number | null
          tp: number | null
          tse_to_irrigation: number | null
          tss: number | null
          updated_at: string | null
        }
        Insert: {
          bod?: number | null
          cod?: number | null
          created_at?: string | null
          date: string
          direct_sewage_mb?: number | null
          expected_volume_tankers?: number | null
          id?: string
          nh4_n?: number | null
          ph?: number | null
          tanker_trips?: number | null
          tn?: number | null
          total_influent?: number | null
          total_water_processed?: number | null
          tp?: number | null
          tse_to_irrigation?: number | null
          tss?: number | null
          updated_at?: string | null
        }
        Update: {
          bod?: number | null
          cod?: number | null
          created_at?: string | null
          date?: string
          direct_sewage_mb?: number | null
          expected_volume_tankers?: number | null
          id?: string
          nh4_n?: number | null
          ph?: number | null
          tanker_trips?: number | null
          tn?: number | null
          total_influent?: number | null
          total_water_processed?: number | null
          tp?: number | null
          tse_to_irrigation?: number | null
          tss?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      stp_monthly_data: {
        Row: {
          created_at: string | null
          direct_sewage_mb: number | null
          direct_sewage_percentage: number | null
          expected_volume_tankers: number | null
          id: string
          irrigation_utilization: number | null
          month: string
          processing_efficiency: number | null
          tanker_percentage: number | null
          tanker_trips: number | null
          total_influent: number | null
          total_water_processed: number | null
          tse_to_irrigation: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          direct_sewage_mb?: number | null
          direct_sewage_percentage?: number | null
          expected_volume_tankers?: number | null
          id?: string
          irrigation_utilization?: number | null
          month: string
          processing_efficiency?: number | null
          tanker_percentage?: number | null
          tanker_trips?: number | null
          total_influent?: number | null
          total_water_processed?: number | null
          tse_to_irrigation?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          direct_sewage_mb?: number | null
          direct_sewage_percentage?: number | null
          expected_volume_tankers?: number | null
          id?: string
          irrigation_utilization?: number | null
          month?: string
          processing_efficiency?: number | null
          tanker_percentage?: number | null
          tanker_trips?: number | null
          total_influent?: number | null
          total_water_processed?: number | null
          tse_to_irrigation?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      water_consumption_types: {
        Row: {
          created_at: string | null
          id: number
          month: string
          percentage: number | null
          type: string
          value: number | null
          year: number
        }
        Insert: {
          created_at?: string | null
          id: number
          month: string
          percentage?: number | null
          type: string
          value?: number | null
          year: number
        }
        Update: {
          created_at?: string | null
          id?: number
          month?: string
          percentage?: number | null
          type?: string
          value?: number | null
          year?: number
        }
        Relationships: []
      }
      water_distribution_master: {
        Row: {
          account_number: string | null
          apr_24: number | null
          aug_24: number | null
          created_at: string | null
          dec_24: number | null
          feb_24: number | null
          feb_25: number | null
          id: number
          jan_24: number | null
          jan_25: number | null
          jul_24: number | null
          jun_24: number | null
          mar_24: number | null
          mar_25: number | null
          may_24: number | null
          meter_label: string | null
          nov_24: number | null
          oct_24: number | null
          parent_meter: string | null
          sep_24: number | null
          total: number | null
          type: string | null
          zone: string | null
        }
        Insert: {
          account_number?: string | null
          apr_24?: number | null
          aug_24?: number | null
          created_at?: string | null
          dec_24?: number | null
          feb_24?: number | null
          feb_25?: number | null
          id: number
          jan_24?: number | null
          jan_25?: number | null
          jul_24?: number | null
          jun_24?: number | null
          mar_24?: number | null
          mar_25?: number | null
          may_24?: number | null
          meter_label?: string | null
          nov_24?: number | null
          oct_24?: number | null
          parent_meter?: string | null
          sep_24?: number | null
          total?: number | null
          type?: string | null
          zone?: string | null
        }
        Update: {
          account_number?: string | null
          apr_24?: number | null
          aug_24?: number | null
          created_at?: string | null
          dec_24?: number | null
          feb_24?: number | null
          feb_25?: number | null
          id?: number
          jan_24?: number | null
          jan_25?: number | null
          jul_24?: number | null
          jun_24?: number | null
          mar_24?: number | null
          mar_25?: number | null
          may_24?: number | null
          meter_label?: string | null
          nov_24?: number | null
          oct_24?: number | null
          parent_meter?: string | null
          sep_24?: number | null
          total?: number | null
          type?: string | null
          zone?: string | null
        }
        Relationships: []
      }
      water_meter_readings: {
        Row: {
          created_at: string | null
          direct_connection: number | null
          id: number
          l1_main_bulk: number | null
          l2_zone_bulk: number | null
          l3_individual: number | null
          loss: number | null
          month: string
          year: number
        }
        Insert: {
          created_at?: string | null
          direct_connection?: number | null
          id: number
          l1_main_bulk?: number | null
          l2_zone_bulk?: number | null
          l3_individual?: number | null
          loss?: number | null
          month: string
          year: number
        }
        Update: {
          created_at?: string | null
          direct_connection?: number | null
          id?: number
          l1_main_bulk?: number | null
          l2_zone_bulk?: number | null
          l3_individual?: number | null
          loss?: number | null
          month?: string
          year?: number
        }
        Relationships: []
      }
      water_payable_consumption: {
        Row: {
          consumption: number | null
          cost: number | null
          created_at: string | null
          id: number
          month: string | null
          type: string
          year: number
        }
        Insert: {
          consumption?: number | null
          cost?: number | null
          created_at?: string | null
          id: number
          month?: string | null
          type: string
          year: number
        }
        Update: {
          consumption?: number | null
          cost?: number | null
          created_at?: string | null
          id?: number
          month?: string | null
          type?: string
          year?: number
        }
        Relationships: []
      }
      water_summary_stats: {
        Row: {
          avg_daily_consumption: number | null
          created_at: string | null
          highest_consumption_month: string | null
          id: number
          loss_percentage: number | null
          lowest_consumption_month: string | null
          month: string | null
          payable_consumption: number | null
          payable_cost: number | null
          total_consumption: number | null
          total_loss: number | null
          water_rate: number | null
          year: number
        }
        Insert: {
          avg_daily_consumption?: number | null
          created_at?: string | null
          highest_consumption_month?: string | null
          id: number
          loss_percentage?: number | null
          lowest_consumption_month?: string | null
          month?: string | null
          payable_consumption?: number | null
          payable_cost?: number | null
          total_consumption?: number | null
          total_loss?: number | null
          water_rate?: number | null
          year: number
        }
        Update: {
          avg_daily_consumption?: number | null
          created_at?: string | null
          highest_consumption_month?: string | null
          id?: number
          loss_percentage?: number | null
          lowest_consumption_month?: string | null
          month?: string | null
          payable_consumption?: number | null
          payable_cost?: number | null
          total_consumption?: number | null
          total_loss?: number | null
          water_rate?: number | null
          year?: number
        }
        Relationships: []
      }
      water_type_monthly: {
        Row: {
          consumption: number | null
          created_at: string | null
          id: number
          month: string
          type: string
          year: number
        }
        Insert: {
          consumption?: number | null
          created_at?: string | null
          id: number
          month: string
          type: string
          year: number
        }
        Update: {
          consumption?: number | null
          created_at?: string | null
          id?: number
          month?: string
          type?: string
          year?: number
        }
        Relationships: []
      }
      water_zone_metrics: {
        Row: {
          consumption: number | null
          created_at: string | null
          id: number
          loss: number | null
          loss_percentage: number | null
          month: string
          year: number
          zone: string
        }
        Insert: {
          consumption?: number | null
          created_at?: string | null
          id: number
          loss?: number | null
          loss_percentage?: number | null
          month: string
          year: number
          zone: string
        }
        Update: {
          consumption?: number | null
          created_at?: string | null
          id?: number
          loss?: number | null
          loss_percentage?: number | null
          month?: string
          year?: number
          zone?: string
        }
        Relationships: []
      }
      water_zone_monthly: {
        Row: {
          consumption: number | null
          created_at: string | null
          id: number
          month: string
          year: number
          zone: string
        }
        Insert: {
          consumption?: number | null
          created_at?: string | null
          id: number
          month: string
          year: number
          zone: string
        }
        Update: {
          consumption?: number | null
          created_at?: string | null
          id?: number
          month?: string
          year?: number
          zone?: string
        }
        Relationships: []
      }
      "Zone 05": {
        Row: {
          "Acct #": number | null
          "Apr-25": string | null
          "Aug-25": string | null
          "Dec-25": string | null
          "Feb-25": string | null
          "Jan-25": string | null
          "Jul-25": string | null
          "Jun-25": string | null
          "Mar-25": string | null
          "May-25": string | null
          "Meter Label": string | null
          "Nov-25": string | null
          "Oct-25": string | null
          "Parent Meter": string | null
          "Sep-25": string | null
          Total: string | null
          Type: string | null
          Zone: string | null
        }
        Insert: {
          "Acct #"?: number | null
          "Apr-25"?: string | null
          "Aug-25"?: string | null
          "Dec-25"?: string | null
          "Feb-25"?: string | null
          "Jan-25"?: string | null
          "Jul-25"?: string | null
          "Jun-25"?: string | null
          "Mar-25"?: string | null
          "May-25"?: string | null
          "Meter Label"?: string | null
          "Nov-25"?: string | null
          "Oct-25"?: string | null
          "Parent Meter"?: string | null
          "Sep-25"?: string | null
          Total?: string | null
          Type?: string | null
          Zone?: string | null
        }
        Update: {
          "Acct #"?: number | null
          "Apr-25"?: string | null
          "Aug-25"?: string | null
          "Dec-25"?: string | null
          "Feb-25"?: string | null
          "Jan-25"?: string | null
          "Jul-25"?: string | null
          "Jun-25"?: string | null
          "Mar-25"?: string | null
          "May-25"?: string | null
          "Meter Label"?: string | null
          "Nov-25"?: string | null
          "Oct-25"?: string | null
          "Parent Meter"?: string | null
          "Sep-25"?: string | null
          Total?: string | null
          Type?: string | null
          Zone?: string | null
        }
        Relationships: []
      }
      "Zone 08": {
        Row: {
          "Acct #": number | null
          "Apr-25": string | null
          "Aug-25": string | null
          "Dec-25": string | null
          "Feb-25": number | null
          "Jan-25": number | null
          "Jul-25": string | null
          "Jun-25": string | null
          "Mar-25": string | null
          "May-25": string | null
          "Meter Label": string | null
          "Nov-25": string | null
          "Oct-25": string | null
          "Parent Meter": string | null
          "Sep-25": string | null
          Total: number | null
          Type: string | null
          Zone: string | null
        }
        Insert: {
          "Acct #"?: number | null
          "Apr-25"?: string | null
          "Aug-25"?: string | null
          "Dec-25"?: string | null
          "Feb-25"?: number | null
          "Jan-25"?: number | null
          "Jul-25"?: string | null
          "Jun-25"?: string | null
          "Mar-25"?: string | null
          "May-25"?: string | null
          "Meter Label"?: string | null
          "Nov-25"?: string | null
          "Oct-25"?: string | null
          "Parent Meter"?: string | null
          "Sep-25"?: string | null
          Total?: number | null
          Type?: string | null
          Zone?: string | null
        }
        Update: {
          "Acct #"?: number | null
          "Apr-25"?: string | null
          "Aug-25"?: string | null
          "Dec-25"?: string | null
          "Feb-25"?: number | null
          "Jan-25"?: number | null
          "Jul-25"?: string | null
          "Jun-25"?: string | null
          "Mar-25"?: string | null
          "May-25"?: string | null
          "Meter Label"?: string | null
          "Nov-25"?: string | null
          "Oct-25"?: string | null
          "Parent Meter"?: string | null
          "Sep-25"?: string | null
          Total?: number | null
          Type?: string | null
          Zone?: string | null
        }
        Relationships: []
      }
      "Zone FM": {
        Row: {
          "Acct #": number | null
          "Apr-25": string | null
          "Aug-25": string | null
          "Dec-25": string | null
          "Feb-25": number | null
          "Jan-25": number | null
          "Jul-25": string | null
          "Jun-25": string | null
          "Mar-25": string | null
          "May-25": string | null
          "Meter Label": string | null
          "Nov-25": string | null
          "Oct-25": string | null
          "Parent Meter": string | null
          "Sep-25": string | null
          Total: number | null
          Type: string | null
          Zone: string | null
        }
        Insert: {
          "Acct #"?: number | null
          "Apr-25"?: string | null
          "Aug-25"?: string | null
          "Dec-25"?: string | null
          "Feb-25"?: number | null
          "Jan-25"?: number | null
          "Jul-25"?: string | null
          "Jun-25"?: string | null
          "Mar-25"?: string | null
          "May-25"?: string | null
          "Meter Label"?: string | null
          "Nov-25"?: string | null
          "Oct-25"?: string | null
          "Parent Meter"?: string | null
          "Sep-25"?: string | null
          Total?: number | null
          Type?: string | null
          Zone?: string | null
        }
        Update: {
          "Acct #"?: number | null
          "Apr-25"?: string | null
          "Aug-25"?: string | null
          "Dec-25"?: string | null
          "Feb-25"?: number | null
          "Jan-25"?: number | null
          "Jul-25"?: string | null
          "Jun-25"?: string | null
          "Mar-25"?: string | null
          "May-25"?: string | null
          "Meter Label"?: string | null
          "Nov-25"?: string | null
          "Oct-25"?: string | null
          "Parent Meter"?: string | null
          "Sep-25"?: string | null
          Total?: number | null
          Type?: string | null
          Zone?: string | null
        }
        Relationships: []
      }
      "Zone VS": {
        Row: {
          "Acct #": number | null
          "Apr-25": string | null
          "Aug-25": string | null
          "Dec-25": string | null
          "Feb-25": string | null
          "Jan-25": string | null
          "Jul-25": string | null
          "Jun-25": string | null
          "Mar-25": string | null
          "May-25": string | null
          "Meter Label": string | null
          "Nov-25": string | null
          "Oct-25": string | null
          "Parent Meter": string | null
          "Sep-25": string | null
          Total: string | null
          Type: string | null
          Zone: string | null
        }
        Insert: {
          "Acct #"?: number | null
          "Apr-25"?: string | null
          "Aug-25"?: string | null
          "Dec-25"?: string | null
          "Feb-25"?: string | null
          "Jan-25"?: string | null
          "Jul-25"?: string | null
          "Jun-25"?: string | null
          "Mar-25"?: string | null
          "May-25"?: string | null
          "Meter Label"?: string | null
          "Nov-25"?: string | null
          "Oct-25"?: string | null
          "Parent Meter"?: string | null
          "Sep-25"?: string | null
          Total?: string | null
          Type?: string | null
          Zone?: string | null
        }
        Update: {
          "Acct #"?: number | null
          "Apr-25"?: string | null
          "Aug-25"?: string | null
          "Dec-25"?: string | null
          "Feb-25"?: string | null
          "Jan-25"?: string | null
          "Jul-25"?: string | null
          "Jun-25"?: string | null
          "Mar-25"?: string | null
          "May-25"?: string | null
          "Meter Label"?: string | null
          "Nov-25"?: string | null
          "Oct-25"?: string | null
          "Parent Meter"?: string | null
          "Sep-25"?: string | null
          Total?: string | null
          Type?: string | null
          Zone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      expense_summary_by_status: {
        Row: {
          count: number | null
          status: string | null
          total_annual_cost: number | null
          total_monthly_cost: number | null
        }
        Relationships: []
      }
      expense_summary_by_type: {
        Row: {
          count: number | null
          service_type: string | null
          total_annual_cost: number | null
          total_monthly_cost: number | null
        }
        Relationships: []
      }
      owners_by_nationality: {
        Row: {
          count: number | null
          nationality: string | null
        }
        Relationships: []
      }
      owners_by_region: {
        Row: {
          count: number | null
          region: string | null
        }
        Relationships: []
      }
      property_by_sector: {
        Row: {
          avg_size: number | null
          count: number | null
          sector: string | null
          total_value: number | null
        }
        Relationships: []
      }
      property_by_status: {
        Row: {
          avg_size: number | null
          count: number | null
          status: string | null
          total_value: number | null
        }
        Relationships: []
      }
      property_by_type: {
        Row: {
          avg_size: number | null
          count: number | null
          total_value: number | null
          unit_type: string | null
        }
        Relationships: []
      }
      property_service_charge_data: {
        Row: {
          allocation: string | null
          annual_cost: number | null
          bua: number | null
          expense_category: string | null
          has_lift: boolean | null
          monthly_cost: number | null
          owner_name: string | null
          property_id: string | null
          sector: string | null
          service_provider: string | null
          unit_no: string | null
          unit_type: string | null
          zone_code: string | null
          zone_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_units_zone_code_fkey"
            columns: ["zone_code"]
            isOneToOne: false
            referencedRelation: "service_charge_zones"
            referencedColumns: ["code"]
          },
        ]
      }
      water_consumption_by_type: {
        Row: {
          apr_24: number | null
          aug_24: number | null
          dec_24: number | null
          feb_24: number | null
          feb_25: number | null
          jan_24: number | null
          jan_25: number | null
          jul_24: number | null
          jun_24: number | null
          mar_24: number | null
          mar_25: number | null
          may_24: number | null
          nov_24: number | null
          oct_24: number | null
          sep_24: number | null
          total: number | null
          type: string | null
        }
        Relationships: []
      }
      water_consumption_by_zone: {
        Row: {
          apr_24: number | null
          aug_24: number | null
          dec_24: number | null
          feb_24: number | null
          feb_25: number | null
          jan_24: number | null
          jan_25: number | null
          jul_24: number | null
          jun_24: number | null
          mar_24: number | null
          mar_25: number | null
          may_24: number | null
          nov_24: number | null
          oct_24: number | null
          sep_24: number | null
          total: number | null
          zone: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_property_with_owner: {
        Args: {
          p_unit_no: string
          p_sector: string
          p_property_type: string
          p_status: string
          p_unit_type: string
          p_bua: number
          p_plot_size: number
          p_unit_value: number
          p_client_name: string
          p_client_name_arabic: string
          p_email: string
          p_nationality: string
          p_region: string
          p_dob: string
          p_spa_date: string
          p_handover_date: string
          p_anticipated_handover_date: string
        }
        Returns: undefined
      }
      refresh_all_materialized_views: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      refresh_water_consumption_views: {
        Args: Record<PropertyKey, never>
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
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
