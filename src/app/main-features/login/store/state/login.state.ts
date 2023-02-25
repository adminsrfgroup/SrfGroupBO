export interface LoginState {
    loading: boolean;
    errorMessage: any;
    token: string;
    refreshToken: string;
}

export const initLoginState: LoginState = {
    loading: false,
    errorMessage: null,
    token: '',
    refreshToken: '',
};
