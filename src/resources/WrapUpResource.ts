import Resource from "./Resource";

export class WrapUpResource extends Resource {
    async cancel(params: {
        agent_email: string
    }) {
        return this.httpClient.post<typeof params, {
            success: boolean
        }>('/wrap-up/cancel', params)
    }

    async extend(params: {
        agent_email: string
        end_time: string
    }) {
        return this.httpClient.post<typeof params, {
            success: boolean
            wrap_up_end_time: string
        }>('/wrap-up/extend', params)
    }
}