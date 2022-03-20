import Resource from './Resource'

export type CloudPBXListParams = {
    page: number
    page_size: number
}

export type CloudPBXListResponse = {
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
}

export type CloudPBXUpsertParams = {
    call_history_enabled: boolean
    email?: string
    first_name: string
    internal_extension?: string
    last_name: string
    outbound_allowed: boolean
    password: string
    sip_login_enabled: boolean
    user_name: string
}

export type CloudPBXUpsertResponse = {
    success: boolean
}

export class CloudPBXResource extends Resource {
    async list(params: CloudPBXListParams) {
        return this.httpClient.post<CloudPBXListParams, CloudPBXListResponse>('/cloud-pbx/list', params)
    }

    async upsert(params: CloudPBXUpsertParams) {
        return this.httpClient.post<CloudPBXUpsertParams, CloudPBXUpsertResponse>(
            `/cloud-pbx/upsert/${params.user_name}`, params)
    }
}