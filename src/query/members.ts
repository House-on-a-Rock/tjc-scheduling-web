import { getAllLocalMembers, getUserRoles } from '../store/apis';
import { INewMembersData, IRolesData } from './types';

export const getChurchMembersData = async (key: string, churchId: number) => {
  const { data } = await getAllLocalMembers(churchId);
  const members: INewMembersData[] = await Promise.all(
    data.map(async (member: INewMembersData) => {
      const { data } = await getUserRoles(member.userId);
      return {
        ...member,
        roles: data.map(({ role, roleId }: IRolesData) => ({
          name: role.name,
          id: roleId,
        })),
      };
    }),
  );
  console.log('members', members);
  return members;
};
