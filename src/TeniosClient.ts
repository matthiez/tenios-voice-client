import ACD from "./resources/ACD";
import CDRS from "./resources/CDRS";
import RecordCall from "./resources/RecordCall";
import WrapUp from "./resources/WrapUp";
import Verification from "./resources/Verification";
import MakeCall from "./resources/MakeCall";
import Call from "./resources/Call";
import CloudPBX from "./resources/CloudPBX";
import Callback from "./resources/Callback";
import HttpClient from "./HttpClient";

export * from './resources'

export default class TeniosClient {
    acd
    call
    callback
    cdrs
    cloudPBX
    makeCall
    recordCall
    verification
    wrapUp
    protected httpClient

    constructor(protected options: ConstructorParameters<typeof HttpClient>[0]) {
        this.httpClient = new HttpClient(options)
        this.acd = new ACD(this.httpClient)
        this.call = new Call(this.httpClient)
        this.callback = new Callback(this.httpClient)
        this.cdrs = new CDRS(this.httpClient)
        this.cloudPBX = new CloudPBX(this.httpClient)
        this.makeCall = new MakeCall(this.httpClient)
        this.recordCall = new RecordCall(this.httpClient)
        this.verification = new Verification(this.httpClient)
        this.wrapUp = new WrapUp(this.httpClient)
    }

    async referCall(params: {
        access_key: string
        call_uuid: string
        sip_uri: string
    }) {
        return await this.httpClient.post<typeof params, {
            success: boolean
        }>('/refer-call', params)
    }
}
