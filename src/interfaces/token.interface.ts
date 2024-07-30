export interface IToken {
    sub:string;
    exp:number;
    secret:string;
}

export interface DecodedToken {
    _id:string
}