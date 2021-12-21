export interface IUser {
    id?: string;
    username?: string;
    email?: string;
    roles?: [];
    accessToken?: string;
    refreshToken?: string;
}