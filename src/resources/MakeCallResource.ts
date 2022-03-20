import Resource from "./Resource";

export class MakeCallResource extends Resource {
    async init(params: {
        caller_id?: string
        callstate_info_url?: string
        destination_number: string
        tenios_number: string
    }) {
        return this.httpClient.post<typeof params, {
            id: number
        }>('/makecall/init', params)
    }
}