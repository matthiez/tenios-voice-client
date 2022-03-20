import Resource from "./Resource";

export class CloudPBXResource extends Resource {
    async list(params: {
        page: number
        page_size: number
    }) {
        return this.httpClient.post<typeof params, {
            items: {
                call_history_enabled: boolean
                email: string
                first_name: string
                internal_extension: string
                last_name: string
                outbound_allowed: boolean
                sip_login_enabled: boolean
                user_name: string
            }[]
            page: number
            page_size: number
            success: boolean
            total_items: number
        }>('/cloud-pbx/list', params)
    }

    async upsert(params: {
        call_history_enabled: boolean
        email?: string
        first_name: string
        internal_extension?: string
        last_name: string
        outbound_allowed: boolean
        password: string
        sip_login_enabled: boolean
        user_name: string
    }) {
        return this.httpClient.post<typeof params, {
            success: boolean
        }>(`/cloud-pbx/upsert/${params.user_name}`, params)
    }
}