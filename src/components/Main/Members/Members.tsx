import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation } from 'react-query';
import history from '../../../history';

// material UI
import Grid from '@material-ui/core/Grid';

// shared components
import { ConfirmationDialog } from '../../shared/ConfirmationDialog';
import { FormDialog } from '../../shared/FormDialog';

// member page components
import { MembersHeader } from './MembersHeader';
import { MembersTable } from './MembersTable';

import { addUser, deleteUser } from '../../../store/apis';
import { isValidEmail, useSelector } from '../../../shared/utilities';
import { updateSelectedRows } from './utilities';
import { MemberStateData } from '../../../store/types';
import { getChurchMembersData } from '../../../query';
import { addUserProps } from '../../../shared/types';

export const Members = () => {
  // hooks
  const dispatch = useDispatch();
  const { churchId, name: churchName } = useSelector((state) => state.profile);

  //useQuery hooks
  // how to handle errors or no members
  const { isLoading, error, data } = useQuery(
    ['roleData', churchId],
    getChurchMembersData,
  );
  const [mutateAddUser] = useMutation(addUser);
  const [mutateRemoveUser] = useMutation(deleteUser);

  // component state
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchField, setSearchField] = useState<string>('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState<boolean>(false);
  const [lastSelected, setLastSelected] = useState<number>(null);

  if (isLoading) return <h1>Loading</h1>;
  else if (error) history.push('/auth/login');

  const isSelected: (arg: number) => boolean = (id: number) =>
    selectedRows.indexOf(id) !== -1;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) =>
    event.target.checked
      ? setSelectedRows(data.map(({ userId }: MemberStateData) => userId))
      : setSelectedRows([]);

  const handleDeleteMembers = async () => {
    // dispatch(onDeleteMembers(selectedRows));
    // await mutateRemoveUser(selectedRows);
    try {
      selectedRows.map(async (member) => {
        await mutateRemoveUser(member);
      });
    } catch (error) {
      console.log('uh oh cant dlete he too stonks');
    }
    setSelectedRows([]);
  };

  const onCloseAddMemberDialog = async (
    shouldAdd: boolean,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    if (shouldAdd && firstName && lastName && email && password && isValidEmail(email)) {
      const mutateAddUserVars: addUserProps = {
        email,
        firstName,
        lastName,
        password,
        churchId,
      };
      await mutateAddUser(mutateAddUserVars);
    }
    // dispatch(onAddMember(firstName, lastName, email, password));
    //email: string, firstName: string, lastName: string, password: string, churchId: number

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
          localChurch={churchName}
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
