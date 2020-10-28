import { getAllLocalMembers, getUserRoles } from '../store/apis';
import { MemberStateData } from '../store/types';
import { INewMembersData, IRolesData } from './types';

export const getChurchMembersData = async (key: string, churchId: number) => {
  return churchId ? (await getAllLocalMembers(churchId)).data : [];
};

export const bootstrapMembersData = async (key: string, members: MemberStateData[]) => {
  const newMembersData: INewMembersData[] = [];
  const promises = members.map(async (member: MemberStateData) => {
    const { data } = await getUserRoles(member.userId);
    const newData = { ...member, roles: data.map(({ role }: IRolesData) => role.name) };
    newMembersData.push(newData);
  });
  await Promise.all(promises);
  return newMembersData;
};
