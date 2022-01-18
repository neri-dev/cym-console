export interface PhishingStatus {
    to: string | undefined;
    status: boolean | undefined;
    content: string | undefined;
}

export interface PhishingStatusResponse {
    data : PhishingStatus[];
    totalLength : number;
}