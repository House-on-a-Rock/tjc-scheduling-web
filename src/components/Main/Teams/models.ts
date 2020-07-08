export interface BackendTeamsData {
  role: string;
  members: TeamData[];
}
export interface TeamData {
  id: string;
  name: string;
}

export interface AllMembersData {
  id: string;
  name: string;
}

export interface TeamState {
  [key: string]: TeamData[];
}
