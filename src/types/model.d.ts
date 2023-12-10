declare namespace MODEL {
  export interface IAuthenticate {
    accessToken: string;
    refreshToken: string;
    userId: string;
    expiration: string;
  }

  export interface IChartDataSetProps {
    data: number[];
  }

  export interface ILineChartProps {
    labels: string[];
    datasets: IChartDataSetProps[];
    title: string;
  }

  export interface IListButtonButtonGroup {
    label: string;
    value: number | string;
  }

  export interface IButtonGroupProps {
    value: string | number;
    setValue: (value: string | number) => void;
    listButton: IListButtonButtonGroup[];
    label: string;
  }
}
