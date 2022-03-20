import TeniosVoiceClient, {
    ACDResource,
    CallbackResource,
    CallResource,
    CDRSResource,
    CloudPBXResource,
    MakeCallResource,
    RecordCallResource,
    VerificationResource,
    WrapUpResource
} from '../src'
import {httpClient} from './utils'

const client = new TeniosVoiceClient(httpClient)

const referCall: TeniosVoiceClient['referCall'] = process.env.TENIOS_CLIENT_LIVE_TEST
    ? client.referCall : jest.fn(async () => ({
        success: true,
    }))

describe('TeniosVoiceClient', () => {
    it('should have all resources', () => {
        expect(client.acd).toBeInstanceOf(ACDResource)
        expect(client.call).toBeInstanceOf(CallResource)
        expect(client.callback).toBeInstanceOf(CallbackResource)
        expect(client.cdrs).toBeInstanceOf(CDRSResource)
        expect(client.cloudPBX).toBeInstanceOf(CloudPBXResource)
        expect(client.makeCall).toBeInstanceOf(MakeCallResource)
        expect(client.recordCall).toBeInstanceOf(RecordCallResource)
        expect(client.verification).toBeInstanceOf(VerificationResource)
        expect(client.wrapUp).toBeInstanceOf(WrapUpResource)
    })

    it('should successfully refer call', async () => {
        const res = await referCall({
            call_uuid: '',
            sip_uri: '',
        })

        expect(res.success).toEqual(true)
    })
})