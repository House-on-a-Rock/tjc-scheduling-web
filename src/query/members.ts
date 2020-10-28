import { getAllLocalMembers, getUserRoles } from '../store/apis';
// import { MemberStateData } from '../store/types';
import { INewMembersData, IRolesData } from './types';

export const getChurchMembersData = async (key: string, churchId: number) => {
  const { data: membersData } = await getAllLocalMembers(churchId);
  const members: INewMembersData[] = await Promise.all(
    membersData.map(async (member: INewMembersData) => {
      const { data } = await getUserRoles(member.userId);
      return { ...member, roles: data.map(({ role }: IRolesData) => role.name) };
    }),
  );
  return members;
};
