export interface IPublicKey {
    id: string;
    owner: string;
    type: string;

    [value: string]: string;
}
