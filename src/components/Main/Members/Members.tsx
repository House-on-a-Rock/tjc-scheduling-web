import React, { useState, useEffect } from 'react';
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
import { MembersHeader } from './MembersHeader';
import { MembersTable } from './MembersTable';

import { onDeleteMembers, onAddMember } from '../../../store/actions';
import { isValidEmail } from '../../../shared/utilities';
import { updateSelectedRows } from './utilities';
import { MemberStateData } from '../../../store/types';
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

  // how to handle errors or no members
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
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchField, setSearchField] = useState<string>('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState<boolean>(false);
  const [lastSelected, setLastSelected] = useState<number>(null);
  useEffect(() => console.log(data), [data]);

  if (membersLoading || rolesLoading) return <h1>Loading</h1>;
  else if (error) history.push('/auth/login');

  const isSelected: (arg: number) => boolean = (id: number) =>
    selectedRows.indexOf(id) !== -1;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelectedRows(data.map(({ userId }: MemberStateData) => userId))
      : setSelectedRows([]);
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
    if (shouldAdd && firstName && lastName && email && password && isValidEmail(email)) {
      dispatch(onAddMember(firstName, lastName, email, password));
    }
    setIsAddMemberDialogOpen(false);
  };

  const handleRowClick = (
    event: React.MouseEvent<unknown>,
    { userId: id }: MemberStateData,
  ) => {
    event.stopPropagation();
    const updatedRows: number[] = event.shiftKey
      ? updateSelectedRows(lastSelected, id, data)
      : [id];
    selectedRows.includes(id)
      ? setSelectedRows(selectedRows.filter((rowId) => !updatedRows.includes(rowId)))
      : setSelectedRows([...selectedRows, ...updatedRows]);
    setLastSelected(id);
  };

  const filteredMembers: MemberStateData[] = data.filter(
    ({ email, firstName, lastName }: MemberStateData) => {
      const filterChar: string = searchField.toLowerCase();
      return (
        firstName.toLowerCase().includes(filterChar) ||
        lastName.toLowerCase().includes(filterChar) ||
        email.toLowerCase().includes(filterChar)
      );
    },
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MembersHeader
          localChurch={initialChurchProfile.name}
          onSearchChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchField(event.target.value);
          }}
          handleAddOpen={() => setIsAddMemberDialogOpen(!isAddMemberDialogOpen)}
          handleDeleteOpen={() => {
            selectedRows.length > 0 && setIsConfirmDialogOpen(!isConfirmDialogOpen);
          }}
        />
        <MembersTable
          members={filteredMembers}
          selectedRowLength={selectedRows.length}
          isSelected={isSelected}
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
