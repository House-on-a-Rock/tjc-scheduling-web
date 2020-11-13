import { getSchedule, getTabs } from '../store/apis/schedules';

//why do we need this? query folder seems unnecessary
export const getScheduleData = async (key: string, scheduleId: number) =>
  (await getSchedule(scheduleId)).data;

export const getTabData = async (key: string, churchId: number) =>
  (await getTabs(churchId)).data;
