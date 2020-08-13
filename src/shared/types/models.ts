export interface HttpError {
  status: number;
  message: string;
}

export interface HttpErrorProps {
  status: number;
  message: string;
}

export interface PasswordState {
  value: string;
  visible: boolean;
  valid: boolean;
  message: string;
}

export interface EmailState {
  value: string;
  valid: boolean;
  message: string;
}

export interface JWTDataType {
  iss: string;
  sub: string;
  exp: string;
  type: string;
}

export interface ColumnFields {
  title: string;
  field: string;
}

export type DayIndexOptions = {
  [key: string]: number;
};
