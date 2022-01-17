export interface PhishingStatus {
    email: string | undefined;
    status: boolean | undefined;
    contentId: string | undefined;
}

export interface PhishingStatusResponse {
    data : PhishingStatus[];
    totalLength : number;
}