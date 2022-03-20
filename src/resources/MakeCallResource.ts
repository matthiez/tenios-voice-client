import Resource from './Resource'

export type MakeCallInitParams = {
    caller_id?: string
    callstate_info_url?: string
    destination_number: string
    tenios_number: string
}

export type MakeCallInitResponse = {
    id: number
}

export class MakeCallResource extends Resource {
    async init(params: MakeCallInitParams) {
        return this.httpClient.post<MakeCallInitParams, MakeCallInitResponse>('/makecall/init', params)
    }
}