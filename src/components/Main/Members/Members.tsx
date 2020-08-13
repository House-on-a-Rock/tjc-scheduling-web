import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../shared/utilities';

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
import {
  onLoadMembers,
  onLoadUser,
  onDeleteMembers,
  onAddMember,
} from '../../../store/actions';

// other stuffs
import { isValidEmail } from '../../../shared/utilities/helperFunctions';

// types
import { MemberStateData } from '../../../store/types';

const styleHead: CSS.Properties = {
  fontWeight: 'bold',
};

export const Members = () => {
  // hooks
  const dispatch = useDispatch();

  // initial selected state
  const initialSelectedState: MemberStateData = {
    id: -1,
    firstName: '',
    lastName: '',
    email: '',
    church: { name: '' },
    disabled: false,
    roles: [],
  };
  // reducer state
  const members = useSelector(({ members }) => members.members);
  const selectedUser = useSelector(({ members }) => members.selectedUser);
  const localChurch = useSelector(({ members }) => members.localChurch);

  // component state
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchField, setSearchField] = useState<string>('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState<boolean>(false);
  const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;

  useEffect(() => {
    dispatch(onLoadMembers());
    dispatch(onLoadUser(initialSelectedState));
  }, []);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelectedRows = members.map((member) => member.id);
      setSelectedRows(newSelectedRows);
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteMembers = async () => {
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
    const selectedIndex = selectedRows.indexOf(row.id);
    let newSelectedRows: number[] = [];
    if (event.ctrlKey) {
      if (selectedIndex === -1) {
        newSelectedRows = [...selectedRows, row.id]; // all but first row
      } else if (selectedIndex === 0) {
        newSelectedRows = selectedRows.slice(1);
      } else if (selectedIndex === selectedRows.length - 1) {
        newSelectedRows = selectedRows.slice(0, -1); // all but last row
      } else if (selectedIndex > 0) {
        newSelectedRows = [
          ...selectedRows.slice(0, selectedIndex),
          ...selectedRows.slice(selectedIndex + 1),
        ];
      }
    } else {
      if (selectedIndex === -1) newSelectedRows = [row.id];
      else
        newSelectedRows = [
          ...selectedRows.slice(0, selectedIndex),
          ...selectedRows.slice(selectedIndex + 1),
        ];
    }
    dispatch(onLoadUser(row));
    setSelectedRows(newSelectedRows);
  };

  const filteredUsers = members.filter(function (row: any) {
    for (var key in row) {
      if (key === 'roles' || key === 'id' || key === 'ChurchId' || key === 'church')
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
          localChurch={localChurch}
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
