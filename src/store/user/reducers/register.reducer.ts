const reducer = {
  registerUser: (state: any) => {
    state.register.loading = true;
    state.register.addSuccess = false;
  },
  registerUserSuccess: (state: any) => {
    state.register.loading = false;
    state.register.addSuccess = true;
  },
  registerUserFailure: (state: any) => {
    state.register.loading = false;
  },

  resetRegisterUser: (state: any) => {
    state.register.loading = false;
    state.register.addSuccess = false;
  }
};

export default reducer;
