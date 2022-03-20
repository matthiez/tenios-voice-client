import {httpClient} from '../utils'
import {RecordCallResource} from '../../src'

const recordCall = new RecordCallResource(httpClient)

const start: RecordCallResource['start'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? recordCall.start : jest.fn(async () => ({
        recording_uuid: '1',
    }))

const call_uuid = '1'

const stop: RecordCallResource['stop'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? recordCall.stop : jest.fn(async () => ({
        call_uuid,
        recording_uuid: '1',
    }))

describe('RecordCall', () => {
    it('should successfully start recording call', async () => {
        const res = await start({
            call_uuid: '',
        })
        console.debug({res})
        expect(res.recording_uuid).toEqual(expect.any(String))
    })

    it('should successfully stop recording call', async () => {
        const params = {
            call_uuid,
        }
        const res = await stop(params)
        console.debug({res})
        expect(res.call_uuid).toMatch(params.call_uuid)
        expect(res.recording_uuid).toEqual(expect.any(String))
        expect(res.recording_uuid.length > 0).toBeTruthy()
    })
})