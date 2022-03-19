import Resource from "./Resource";

export default class WrapUp extends Resource {
    async extend(params: {
        access_key: string
        agent_email: string
        end_time: string
    }) {
        return this.httpClient.post<typeof params, {
            success: boolean
            wrap_up_end_time: string
        }>('/wrap-up/extend', params)
    }

    async cancel(params: {
        access_key: string
        agent_email: string
    }) {
        return this.httpClient.post<typeof params, {
            success: boolean
        }>('/wrap-up/cancel', params)
    }
}