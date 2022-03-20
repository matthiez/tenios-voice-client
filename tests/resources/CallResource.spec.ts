import {CallResource} from '../../src'
import {httpClient} from '../utils'

const call = new CallResource(httpClient)

const startListenIn: CallResource['startListenIn'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? call.startListenIn : jest.fn(async () => ({
        success: true,
    }))

describe('Call', () => {
    it('should successfully start listening in', async () => {
        const res = await startListenIn({
            call_uuid: '',
            supervisor_destination: '',
            supervisor_key: '',
            whisper_to_agent: undefined,
        })
        console.debug(res)
        expect(res.success).toEqual(true)
    })
})