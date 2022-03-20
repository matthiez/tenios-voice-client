import Resource from "./Resource";

export type CallType = "INBOUND" | "WEBRTCINBOUND" | "FORWARD" | "SIPFORWARD_USER" | "SIPFORWARD_PRFL" | "FAXOUT"

export type HangupCause =
    "NORMAL_CLEARING"
    | 'UNSPECIFIED'
    | 'UNALLOCATED_NUMBER'
    | 'NO_ROUTE_TRANSIT_NET'
    | 'NO_ROUTE_DESTINATION'
    | 'CHANNEL_UNACCEPTABLE'
    | 'CALL_AWARDED_DELIVERED'
    | 'USER_BUSY'
    | 'NO_USER_RESPONSE'
    | 'NO_ANSWER'
    | 'SUBSCRIBER_ABSENT'
    | 'CALL_REJECTED'
    | 'NUMBER_CHANGED'
    | 'REDIRECTION_TO_NEW_DESTINATION'
    | 'EXCHANGE_ROUTING_ERROR'
    | 'DESTINATION_OUT_OF_ORDER'
    | 'INVALID_NUMBER_FORMAT'
    | 'FACILITY_REJECTED'
    | 'RESPONSE_TO_STATUS_ENQUIRY'
    | 'NORMAL_UNSPECIFIED'
    | 'NORMAL_CIRCUIT_CONGESTION'
    | 'NETWORK_OUT_OF_ORDER'
    | 'NORMAL_TEMPORARY_FAILURE'
    | 'SWITCH_CONGESTION'
    | 'ACCESS_INFO_DISCARDED'
    | 'REQUESTED_CHAN_UNAVAIL'
    | 'FACILITY_NOT_SUBSCRIBED'
    | 'OUTGOING_CALL_BARRED'
    | 'INCOMING_CALL_BARRED'
    | 'BEARERCAPABILITY_NOTAUTH'
    | 'BEARERCAPABILITY_NOTAVAIL'
    | 'SERVICE_UNAVAILABLE'
    | 'BEARERCAPABILITY_NOTIMPL'
    | 'CHAN_NOT_IMPLEMENTED'
    | 'FACILITY_NOT_IMPLEMENTED'
    | 'SERVICE_NOT_IMPLEMENTED'
    | 'INVALID_CALL_REFERENCE'
    | 'INCOMPATIBLE_DESTINATION'
    | 'INVALID_MSG_UNSPECIFIED'
    | 'MANDATORY_IE_MISSING'
    | 'MESSAGE_TYPE_NONEXIST'
    | 'WRONG_MESSAGE'
    | 'IE_NONEXIST'
    | 'INVALID_IE_CONTENTS'
    | 'WRONG_CALL_STATE'
    | 'RECOVERY_ON_TIMER_EXPIRE'
    | 'MANDATORY_IE_LENGTH_ERROR'
    | 'PROTOCOL_ERROR'
    | 'INTERWORKING'
    | 'ORIGINATOR_CANCEL'
    | 'LOSE_RACE'
    | 'MANAGER_REQUEST'

export type SourceType = "FIXED_LINE" | string

export class CDRSResource extends Resource {
    async retrieve(params: {
        page: number
        page_size: number
        start_date_from: string
        start_date_to: string
    }) {
        return this.httpClient.post<typeof params, {
            items: {
                answer_stamp: string
                billing_status: null | string
                billusec: number
                bleg_uuid: null | string
                call_type: CallType
                callerid_name: string
                callerid_number: string
                cost: number
                destination_number: string
                duration: number
                end_stamp: string
                hangup_cause: HangupCause
                main_leg_uuid: null | string
                prepaid: boolean
                routing_status: null | string
                source_type: SourceType
                start_stamp: string
                uuid: string
            }[]
            page: number
            page_size: number
            total_items: number
        }>('/cdrs/retrieve', params)
    }

    async count(params: {
        start_date_from: string
        start_date_to: string
    }) {
        return this.httpClient.post<typeof params, {
            total_items: number
        }>('/cdrs/count', params)
    }
}