import {ACDResource, AgentState} from '../../src'
import {httpClient} from '../utils'

const acd = new ACDResource(httpClient)

const retrieveAgentState: ACDResource['retrieveAgentState'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? acd.retrieveAgentState : jest.fn(async () => ({
        email: 'test@test.com',
        state: 'NOT_READY' as AgentState
    }))

const changeAgentState: ACDResource['changeAgentState'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? acd.changeAgentState : jest.fn(async () => ({
        success: true,
    }))


describe('ACD', () => {
    it('should successfully retrieve agent state', async () => {
        const res = await retrieveAgentState({
            email: 'test@test.com'
        })
        console.debug(res)
        expect(res.email.length > 0).toBeTruthy()
        expect(['NOT_READY', 'READY'] as AgentState[]).toContain(res.state)
    })

    it('should successfully change agent state', async () => {
        const res = await changeAgentState({
            email: 'test@test.com',
            nrr: undefined,
            state: 'READY',
        })
        console.debug(res)
        expect(res.success).toEqual(true)
    })
})