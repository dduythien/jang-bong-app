import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'report',
  initialState: { reportData: [] } as ReportState,
  reducers: {
    setReportData: (state, { payload }: ThemePayload) => {
      state.reportData = payload;
    },
  },
});

export const { setReportData } = slice.actions;

export default slice.reducer;

// type DarkProps<T> = {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   [K in keyof T]: K extends `${infer Prefix}_dark` ? K : never;
// }[keyof T];

// type PropsWithoutDark<T> = Omit<T, DarkProps<T>>;

export type ReportState = {
  reportData: any[];
};

type ThemePayload = {
  payload: Partial<any[]>;
};
