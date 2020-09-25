import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import history from '../../../history';

// material UI
import Grid from '@material-ui/core/Grid';

import CSS from 'csstype';

// shared components
import { ConfirmationDialog } from '../../shared/ConfirmationDialog';
import { FormDialog } from '../../shared/FormDialog';

// member page components
import { MembersSidebar } from './MembersSidebar';
import { MembersHeader } from './MembersHeader';
import { MembersTable } from './MembersTable';

// actions
import { onDeleteMembers, onAddMember } from '../../../store/actions';

// other stuffs
import { isValidEmail } from '../../../shared/helper_functions';

// types
import { MemberStateData } from '../../../store/types';

// apis
import { getChurchMembersData, bootstrapMembersData } from '../../../query';

const styleHead: CSS.Properties = {
  fontWeight: 'bold',
};

const initialChurchProfile = {
  name: 'Hillsborough',
  churchId: 1,
};

export const Members = () => {
  // hooks
  const dispatch = useDispatch();

  // need to figure out what to do if there're errors or no members
  // need to useQuery for initialChurchProfile
  const { isLoading: membersLoading, error, data: members } = useQuery(
    ['memberData', initialChurchProfile.churchId],
    getChurchMembersData,
  );
  const { isLoading: rolesLoading, data } = useQuery(
    ['roleData', members],
    bootstrapMembersData,
    { enabled: members },
  );

  // component state
  const [selectedMember, setSelectedMember] = useState<MemberStateData>({
    userId: -1,
    firstName: '',
    lastName: '',
    email: '',
    church: '',
    disabled: false,
    roles: [],
  });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchField, setSearchField] = useState<string>('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState<boolean>(false);
  const isSelected = (id: number) => selectedRows.indexOf(id) !== -1;

  if (membersLoading || rolesLoading) return <h1>Loading</h1>;
  else if (error) history.push('/auth/login');

  const handleSelectAllClick = (checked: boolean) =>
    checked
      ? setSelectedRows(data.map(({ userId }: MemberStateData) => userId))
      : setSelectedRows([]);

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
    if (shouldAdd && firstName && lastName && email && password && isValidEmail(email)) {
      dispatch(onAddMember(firstName, lastName, email, password));
    }
    setIsAddMemberDialogOpen(false);
  };

  const handleRowClick = (event: React.MouseEvent<unknown>, row: MemberStateData) => {
    event.stopPropagation();
    const { userId: id, church } = row;
    const selectedIndex = selectedRows.indexOf(id);
    let newSelectedRows: number[] = [];
    if (event.ctrlKey) {
      if (selectedIndex === -1) {
        newSelectedRows = [...selectedRows, id];
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
      if (selectedIndex === -1) newSelectedRows = [id];
      else
        newSelectedRows = [
          ...selectedRows.slice(0, selectedIndex),
          ...selectedRows.slice(selectedIndex + 1),
        ];
    }
    setSelectedMember({ ...row, church });
    setSelectedRows(newSelectedRows);
  };
  const filteredMembers = data.filter(
    ({ email, firstName, lastName }: MemberStateData) => {
      const filterChar = searchField.toLowerCase();
      return (
        firstName.toLowerCase().includes(filterChar) ||
        lastName.toLowerCase().includes(filterChar) ||
        email.toLowerCase().includes(filterChar)
      );
    },
  );

  return (
    <Grid container spacing={3}>
      <MembersSidebar
        firstName={selectedMember.firstName}
        lastName={selectedMember.lastName}
        email={selectedMember.email}
        church={selectedMember.church}
        roles={selectedMember.roles}
      />
      <Grid item xs={9}>
        <MembersHeader
          localChurch={initialChurchProfile.name}
          onSearchChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchField(event.target.value);
          }}
          handleAddOpen={() => {
            setIsAddMemberDialogOpen(!isAddMemberDialogOpen);
          }}
          handleDeleteOpen={() => {
            if (selectedRows.length > 0) setIsConfirmDialogOpen(!isConfirmDialogOpen);
          }}
        />
        <MembersTable
          members={filteredMembers}
          isSelected={isSelected}
          selected={selectedRows.length > 0}
          handleCheck={handleSelectAllClick}
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
        isOpen={isAddMemberDialogOpen}
        handleClose={onCloseAddMemberDialog}
        title="Add User"
      />
    </Grid>
  );
};
