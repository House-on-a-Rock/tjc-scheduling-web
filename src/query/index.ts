import { getAllLocalMembers, getUserRoles } from '../store/apis';
import { MemberStateData } from '../store/types';

export async function getChurchMembersData(key: any, churchId: number) {
  // these components should use usePaginatedQuery in the future
  let { data } = await getAllLocalMembers(churchId);
  console.log('data1', data);
  data.map(async (user: MemberStateData) => {
    const userId = user.userId;
    let roleList: string[] = [];
    await getUserRoles(userId).then((result) => {
      console.log('getUserRoles', result);
      result.data.map((userRole: any) => {
        roleList.push(userRole.role.name);
      });
      roleList = Array.from(new Set(roleList));
      console.log('roleList', roleList);
      user.roles = roleList;
    });
  });

  return data;
}
