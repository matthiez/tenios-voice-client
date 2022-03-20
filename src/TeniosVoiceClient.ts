import {
    ACDResource,
    CallbackResource,
    CallResource,
    CDRSResource,
    CloudPBXResource,
    MakeCallResource,
    RecordCallResource,
    VerificationResource,
    WrapUpResource
} from './resources'
import {HttpClient, HttpClientOptions} from './HttpClient'

export default class TeniosVoiceClient {
    acd
    call
    callback
    cdrs
    cloudPBX
    makeCall
    recordCall
    verification
    wrapUp
    _httpClient

    constructor(protected options?: HttpClientOptions) {
        this._httpClient = new HttpClient(options)
        this.acd = new ACDResource(this._httpClient)
        this.call = new CallResource(this._httpClient)
        this.callback = new CallbackResource(this._httpClient)
        this.cdrs = new CDRSResource(this._httpClient)
        this.cloudPBX = new CloudPBXResource(this._httpClient)
        this.makeCall = new MakeCallResource(this._httpClient)
        this.recordCall = new RecordCallResource(this._httpClient)
        this.verification = new VerificationResource(this._httpClient)
        this.wrapUp = new WrapUpResource(this._httpClient)
    }

    async referCall(params: {
        call_uuid: string
        sip_uri: string
    }) {
        return await this._httpClient.post<typeof params, {
            success: boolean
        }>('/refer-call', params)
    }
}