export interface IRequestResponse<T> {
    Success: boolean;
    Message: string;
    Data: Array<T>;
}