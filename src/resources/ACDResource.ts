import Resource from './Resource'

export type AgentState = 'NOT_READY' | 'READY'

export type ACDChangeAgentStateParams = {
    email: string
    nrr?: string
    state: AgentState
}

export type ACDChangeAgentStateResponse = {
    success: boolean
}

export type ACDRetrieveAgentStateParams = {
    email: string
}

export type ACDRetrieveAgentStateResponse = {
    email: string
    state: AgentState
}

export class ACDResource extends Resource {
    async changeAgentState(params: ACDChangeAgentStateParams) {
        return this.httpClient.post<ACDChangeAgentStateParams, ACDChangeAgentStateResponse>(
            '/acd/agent-state/change', params)
    }

    async retrieveAgentState(params: ACDRetrieveAgentStateParams) {
        return this.httpClient.get<ACDRetrieveAgentStateParams, ACDRetrieveAgentStateResponse>(
            '/acd/agent-state/retrieve', params)
    }
}