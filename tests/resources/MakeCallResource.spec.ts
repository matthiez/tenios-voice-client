import {httpClient} from '../utils'
import {MakeCallResource} from '../../src'

const makeCall = new MakeCallResource(httpClient)

const init: MakeCallResource['init'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? makeCall.init : jest.fn(async () => ({
        id: 0,
    }))

describe('MakeCall', () => {
    it('should successfully init', async () => {
        const res = await init({
            destination_number: '',
            tenios_number: '',
            caller_id: undefined,
            callstate_info_url: undefined,
        })
        console.debug(res)
        expect(res.id).toEqual(0)
    })
})