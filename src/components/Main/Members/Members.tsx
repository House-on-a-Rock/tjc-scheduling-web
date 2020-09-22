import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import history from '../../../history';
import { useSelector } from '../../../shared/types/useSelector';

// material UI
import Grid from '@material-ui/core/Grid';

import CSS from 'csstype';

// shared components
import { ConfirmationDialog } from '../../shared/ConfirmationDialog';
import { FormDialog } from '../../shared/FormDialog';

// member page components
import { MembersSidebar } from './MembersSidebar';
import { MembersHeader } from './MembersHeader';
import { MembersUsersTable } from './MembersUsersTable';

// actions
import { onDeleteMembers, onAddMember } from '../../../store/actions';

// other stuffs
import { isValidEmail, extractUserId } from '../../../shared/helper_functions';

// types
import { MemberStateData } from '../../../store/types';

// apis
import { getUser, getAllLocalChurchUsers, getUserRoles } from '../../../store/apis';

const styleHead: CSS.Properties = {
  fontWeight: 'bold',
};

export const Members = () => {
  // hooks
  const dispatch = useDispatch();

  // react query
  const accessToken = localStorage.getItem('access_token');
  const userId = extractUserId(accessToken);

  // component state
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchField, setSearchField] = useState<string>('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState<boolean>(false);
  const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;
  const [selectedUser, setSelectedUser] = useState<MemberStateData>({
    userId: -1,
    firstName: '',
    lastName: '',
    email: '',
    church: { name: '' },
    disabled: false,
    roles: [],
  });

  const { isLoading, error, data } = useQuery('queryData', async () => {
    const localChurchMembers = await getAllLocalChurchUsers(1); // this information should already be available and come from profile
    console.log('localChurchMembers.data:', localChurchMembers.data);
    localChurchMembers.data.map(async (user: MemberStateData) => {
      const userId = user.userId;
      let roleList: string[] = [];
      await getUserRoles(userId).then((result) => {
        // console.log(result);
        result.data.map((userRole: any) => {
          roleList.push(userRole.role.name);
        });
        roleList = Array.from(new Set(roleList));
        user.roles = roleList;
      });
    });
    let memberList: MemberStateData[] = localChurchMembers.data;
    return memberList;
  });

  if (isLoading) return <h1>Loading</h1>;
  else if (error) history.push('/auth/login');

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = data.map((member) => member.userId);
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteMembers = () => {
    dispatch(onDeleteMembers(selectedRows));
    setSelectedRows([]);
  };

  const onCloseAddMemberDialog = (
    shouldAdd: boolean,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    setIsAddUserDialogOpen(false);
    if (shouldAdd && firstName && lastName && email && password && isValidEmail(email)) {
      dispatch(onAddMember(firstName, lastName, email, password));
    }
  };

  const handleRowClick = (event: React.MouseEvent<unknown>, row: MemberStateData) => {
    event.stopPropagation();
    const selectedIndex = selectedRows.indexOf(row.userId);
    let newSelectedRows: number[] = [];
    if (event.ctrlKey) {
      if (selectedIndex === -1) {
        newSelectedRows = [...selectedRows, row.userId];
      } else if (selectedIndex === 0) {
        newSelectedRows = selectedRows.slice(1); // all but first row
      } else if (selectedIndex === selectedRows.length - 1) {
        newSelectedRows = selectedRows.slice(0, -1); // all but last row
      } else if (selectedIndex > 0) {
        newSelectedRows = [
          ...selectedRows.slice(0, selectedIndex),
          ...selectedRows.slice(selectedIndex + 1),
        ];
      }
    } else {
      if (selectedIndex === -1) newSelectedRows = [row.userId];
      else
        newSelectedRows = [
          ...selectedRows.slice(0, selectedIndex),
          ...selectedRows.slice(selectedIndex + 1),
        ];
    }
    // dispatch(onLoadUser(row));
    setSelectedUser(row);
    setSelectedRows(newSelectedRows);
  };
  console.log('data: ', data);

  const filteredUsers = data.filter(function (row: any) {
    // console.log('row: ', row);
    for (var key in row) {
      if (key === 'roles' || key === 'userId' || key === 'churchId' || key === 'church')
        continue;
      if (key === 'disabled') {
        if (row[key].toString().toLowerCase().includes(searchField.toLowerCase()))
          return true;
      } else {
        if (row[key].toLowerCase().includes(searchField.toLowerCase())) return true;
      }
    }
    return false;
  });
  console.log('filteredUsers: ', filteredUsers);

  return (
    <Grid container spacing={3}>
      <MembersSidebar
        firstName={selectedUser.firstName}
        lastName={selectedUser.lastName}
        email={selectedUser.email}
        church={selectedUser.church.name}
        roles={selectedUser.roles}
      />
      <Grid item xs={9}>
        <MembersHeader
          localChurch={data[0].church.name}
          onSearchChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchField(event.target.value);
          }}
          handleAddOpen={() => {
            setIsAddUserDialogOpen(!isAddUserDialogOpen);
          }}
          handleDeleteOpen={() => {
            if (selectedRows.length > 0) setIsConfirmDialogOpen(!isConfirmDialogOpen);
          }}
        />
        <MembersUsersTable
          selected={selectedRows.length > 0}
          handleCheck={handleSelectAllClick}
          members={filteredUsers}
          isSelected={isSelected}
          handleClick={handleRowClick}
        />
      </Grid>
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        handleClick={(shouldDelete: boolean) => {
          setIsConfirmDialogOpen(!isConfirmDialogOpen);
          shouldDelete && handleDeleteMembers();
        }}
        title="Confirm Delete Action"
      />
      <FormDialog
        isOpen={isAddUserDialogOpen}
        handleClose={onCloseAddMemberDialog}
        title="Add User"
      />
    </Grid>
  );
};
