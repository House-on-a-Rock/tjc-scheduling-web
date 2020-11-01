import { getSchedule } from '../store/apis/schedules';

export const getScheduleData = async (key: string, churchId: number) =>
  churchId ? (await getSchedule(churchId)).data : [];
