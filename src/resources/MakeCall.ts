import Resource from "./Resource";

export default class MakeCal extends Resource {
    async init(params: {
        access_key: string
        destination_number: string
        tenios_number: string
        caller_id?: string
        callstate_info_url?: string
    }) {
        return this.httpClient.post<typeof params, {
            id: number
        }>('/makecall/init', params)
    }
}