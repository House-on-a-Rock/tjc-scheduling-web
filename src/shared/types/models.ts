export interface HttpError {
  status: number;
  message: string;
}

export interface HttpErrorProps {
  status: number;
  message: string;
}

export interface PasswordState {
  valid: boolean;
  message: string;
  value: string;
  visible: boolean;
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
  access: string;
}

export interface ColumnFields {
  Header: string;
  accessor: string;
  onClick?: () => void;
  Cell?: any;
}

export type DayIndexOptions = {
  [key: string]: number;
};

export interface WeeklyAssignmentInterface {
  title: string;
  view: string;
  role: any;
  columns: any;
  services: any;
}
export interface MappedScheduleInterface {
  day: string;
  name: string;
  columns: ColumnFields[];
  data: WeeklyAssignmentInterface[];
  role: any;
}

export interface WeeklyAssignment {
  [key: string]: string;
}

export interface TaskData {
  date: string;
  assignee: string;
}
export interface DutyData {
  title: string;
  tasks: TaskData[];
  team?: string;
}
export interface EventData {
  time: string;
  duties: DutyData[];
  tag?: string;
}
export interface WeeklyEventData {
  day: string;
  events: EventData[];
  dividers: Divider[];
  order: number;
}
export interface TimeRange {
  start: string;
  end: string;
}
export interface Divider {
  name: string;
  timerange: TimeRange;
}
export interface ScheduleData {
  title: string;
  id: string;
  view: string;
  daterange: string[];
  weeklyEvents: WeeklyEventData[];
  specificEvents?: any[];
}

export interface ScheduleInterface {
  columns: ColumnFields[];
  day: string;
}
interface CellIndexType {
  index: number;
}

interface CellColumnType {
  id: string;
}
export interface UpdatableCellProps {
  value: any;
  row: CellIndexType;
  column: CellColumnType;
  updateMyData: (rowIndex: number, columnId: string, value: string) => void;
}
export interface DataCellProps {
  data: any;
  row?: number;
  column?: number;
  onCellClick: any;
  isSelected: boolean;
  service: any;
  members?: any;
}

type AccessTypes = 'read' | 'write';

export interface TableProps {
  data: WeeklyAssignmentInterface;
  updateMyData?: (rowIndex: number, columnId: string, value: string) => void;
  access: AccessTypes;
  selectedCell: any;
  onCellClick: (cellKey: any) => void;
  // members: any;
}

export interface SchedulerProps {
  service: MappedScheduleInterface;
  role: any;
}

export interface ScheduleTabsProps {
  titles: string[];
  tabIdx: number;
  onTabClick: (e: React.ChangeEvent, value: number) => void;
}

export interface AddUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  churchId: number;
}

export interface AddScheduleProps {
  scheduleTitle: string;
  startDate: string;
  endDate: string;
  view: string;
  team: number;
  churchId: number;
}

export interface AddServiceProps {
  name: string;
  order: number;
  dayOfWeek: number;
  scheduleId: number;
}

export interface ValidatedFieldState<T> {
  valid: boolean;
  message: string;
  value: T;
}

// export interface PasswordState extends ValidatedFieldState<string>  {
//   visible: boolean;
// }

export interface useAlertProps {
  message: string;
  status: string;
}

export interface cellManagementProps {
  isSelected: boolean;
  isEditable: boolean;
  onCellClick: (cellKey: any) => void;
}
