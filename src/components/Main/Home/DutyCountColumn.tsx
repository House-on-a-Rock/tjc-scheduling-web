import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import GridListTile from '@material-ui/core/GridListTile';
import Divider from '@material-ui/core/Divider';

interface DutyCountType {
    role: string;
    count: number;
}

export interface DutyCountColumnProps {
    name: string;
    dutyCounts: DutyCountType[];
}

export const DutyCountColumn = ({name, dutyCounts}: DutyCountColumnProps) => {
    return (
        <GridListTile>
            <List dense={false}>
                <ListItem>
                    <ListItemText primary={name}/>
                </ListItem>
                <Divider />
                {dutyCounts.map((dutyCount) => (
                    <ListItem>
                        <ListItemText primary={dutyCount.role} secondary={dutyCount.count}/>
                    </ListItem>
                ))}
            </List>
        </GridListTile>
    )
}