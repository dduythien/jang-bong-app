export namespace API {
  export interface IAuthenticateParams {
    userName: string;
    password: string;
  }

  export interface IRefreshTokenParams {
    accessToken: string;
    refreshToken: string;
  }

  export interface IUserParams {
    id?: string;
    name: string;
    birthday: string;
    email: string;
    phone: string;
    identity: string;
    address: string;
    roles: string;
    userName: string;
    password?: string;
    createdOn?: string;
    fullName?: string;
    gender: string;
    roleIds: string;
  }

  export interface IAPIResponse<T> {
    data: T;
    errorCode?: string;
    message?: string;
  }

  export interface IPaging<T> {
    firstItemOnPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    items: T[];
    pageCount: number;
    totalItemCount: number;
  }
}

export namespace MODEL {
  export interface IAuthenticate {
    accessToken: string;
    refreshToken: string;
    userId: string;
    expiration: string;
  }

  export interface IItemInverter {
    inverterId?: string;
    type: string;
    unitIds: string[];
    inverterName: string;
    typeName: string;
    calculationUnit: string;
  }

  export interface IQueryRoutine {
    inverterId: string;
    createOn: string;
  }

  export interface IInverterRountineByUnit {
    typeName: string;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    h7: string;
    h8: string;
    h9: string;
    h10: string;
    h11: string;
    h12: string;
    h13: string;
    h14: string;
    h15: string;
    h16: string;
    h17: string;
    h18: string;
    h19: string;
    h20: string;
    h21: string;
    h22: string;
    h23: string;
    h24: string;
    unitId: string;
    unitName: string;
  }

  export interface IInverterRountineDetail {
    unitRoutines: IInverterRountineByUnit[];
    createdOn: string;
    inverterId: string;
    inverterName: string;
    inverterRoutineId: string;
    type: string;
    typeName: string;
    updateOn: string;
  }

  export interface IInverterRountineDetail {
    unitRoutines: IInverterRountineByUnit[];
    createdOn: string;
    inverterId: string;
    inverterName: string;
    inverterRoutineId: string;
    type: string;
    typeName: string;
    updateOn: string;
  }

  export interface IUpdateInverterRoutineParams {
    inverterRoutineId: string;
    unitRoutines: IInverterRountineByUnit[];
  }
}
