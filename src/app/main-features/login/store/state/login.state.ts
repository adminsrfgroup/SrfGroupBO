export interface LoginState {
    loading: boolean;
    errorMessage: string;
    token: string;
    refreshToken: string;
}

export const initLoginState: LoginState = {
    loading: false,
    errorMessage: '',
    token: '',
    refreshToken: '',
};
