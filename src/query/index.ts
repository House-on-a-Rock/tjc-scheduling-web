import { getAllLocalMembers, getUserRoles } from '../store/apis';
import { MemberStateData } from '../store/types';

export async function getChurchMembersData(key: string, churchId: number) {
  // these components should use usePaginatedQuery in the future
  let { data } = await getAllLocalMembers(churchId);
  return data;
}

interface UserId {
  name: string;
  id: number;
}
interface ReturnDataInterface {
  [key: string]: string[];
}
export async function getUserRolesData(key: string, users: UserId[]) {
  console.log('users', users);
  let returnData: ReturnDataInterface = {};
  users.map(async ({ id, name }: UserId) => {
    const { data } = await getUserRoles(id);
    console.log('const { data } = await getUserRoles(id);', data);
    returnData[name] = data.role.name;
  });
  console.log('getUserRolesData', users);
  return returnData;
}
