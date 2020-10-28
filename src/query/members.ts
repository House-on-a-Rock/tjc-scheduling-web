import { getAllLocalMembers, getUserRoles } from '../store/apis';
import { MemberStateData } from '../store/types';
import { INewMembersData, IRole, IRolesData } from './types';

// export const getChurchMembersData = async (key: string, churchId: number) => {
//   const { data } = await getAllLocalMembers(churchId);
//   return data;
// };

export const getChurchMembersData = async (key: string, churchId: number) => {
  // previous implementation
  // const { data: membersData } = await getAllLocalMembers(churchId);

  // const newMembersData: INewMembersData[] = [];
  // const promises = data.map(async (member: MemberStateData) => {
  //   const { data } = await getUserRoles(member.userId);
  //   console.log('data', data);
  //   const newData = { ...member, roles: data.map(({ role }: IRolesData) => role.name) };
  //   newMembersData.push(newData);
  // });
  // await Promise.all(promises);

  // return newMembersData;

  const { data: membersData } = await getAllLocalMembers(churchId);
  const members: INewMembersData[] = await Promise.all(
    membersData.map(async (member: INewMembersData) => {
      const { data } = await getUserRoles(member.userId);
      return { ...member, roles: data.map(({ role }: IRolesData) => role.name) };
    }),
  );
  return members;
};
