import { contrivedDate, createColumns } from './services';

export const makeScheduleData = (data: any, tab: number) => {
  if (data.length === 0) return [];
  const scheduleInfo = data[tab];
  const { services, start: scheduleStart, end: scheduleEnd } = scheduleInfo;

  const todaysServices: any = [];
  services.map((service: any) => {
    const { day, name, order, events } = service;
    const columns = createColumns([scheduleStart, scheduleEnd], day);
    const data: any = [];
    // creating data now
    events.map((event: any) => {
      const pushToData: any = [];
      const { time, duties } = event;
      duties.map((duty: any) => {
        const pushToPushToData: any = {};
        const { tasks, order, title } = duty;
        if (order === 1) pushToPushToData.time = { display: time };
        pushToPushToData.duty = { display: title };
        tasks.map((task: any) => {
          const { date, assignee } = task;
          const assignedDate = contrivedDate(date);
          pushToPushToData[assignedDate] = {
            display: `${assignee.firstName} ${assignee.lastName}`,
          };
        });
        pushToData.push(pushToPushToData);
      });
      data.push(...pushToData);
    });

    todaysServices.splice(order - 1, 1, { day, columns, name, data });
  });
  return todaysServices;
};
