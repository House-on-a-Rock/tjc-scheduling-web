import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MaterialTable from 'material-table';

import { useDispatch } from 'react-redux';
// import { logout } from '../../../store/actions';

import { SCHEDULE } from './database';
import { Container } from '@material-ui/core';

// function that figures out all the weekends

export const Home = () => {
  // const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {SCHEDULE.map((schedule: any) => {
          return <Tab label={schedule.title} />;
        })}
        <Tab label="+" />
      </Tabs>
      <Container component="main" style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Time', field: 'time' },
            { title: 'Duties', field: 'duties' },
            { title: '6/30', field: 'June30' },
            { title: '7/4', field: 'July4' },
            { title: '7/11', field: 'July11' },
            { title: '7/18', field: 'July18' },
            { title: '7/25', field: 'July25' },
            { title: '8/1', field: 'Aug1' },
            { title: '8/8', field: 'Aug8' },
            { title: '8/15', field: 'Aug15' },
            { title: '8/22', field: 'Aug22' },
            { title: '8/29', field: 'Aug29' },
            { title: '9/5', field: 'Sept5' },
            { title: '9/12', field: 'Sept12' },
            { title: '9/19', field: 'Sept19' },
          ]}
          options={{
            paging: false,
            fixedColumns: {
              left: 2,
              right: 0,
            },
            search: false,
            sorting: false,
            draggable: false,
          }}
          data={[
            {
              time: '10:30AM',
              duties: 'Usher',
              team: 'Church council',
              June30: 'Kevin Wang',
              July4: 'Kevin Wang',
              July11: 'Sun-yu Yang',
              July18: 'Kevin Wang',
              July25: 'Sun-yu Yang',
              Aug1: 'Kevin Wang',
              Aug8: 'Sun-yu Yang',
              Aug15: 'Kevin Wang',
              Aug22: 'Sun-yu Yang',
              Aug29: 'Kevin Wang',
              Sept5: 'Sun-yu Yang',
              Sept12: 'Kevin Wang',
              Sept19: 'Sun-yu Yang',
            },
            {
              time: '10:45AM',
              duties: 'Hymn Leading',
              team: 'Hymn Leader',
              June30: 'Shenney Lin',
              July4: 'Chloe Lin',
              July11: 'Vinnie Lin',
              July18: 'Qianwei Liu',
              July25: 'Xingru Wang',
              Aug1: 'Shaun Tung',
              Aug8: 'Shenney Lin',
              Aug15: 'Chloe Lin',
              Aug22: 'Vinnie Lin',
              Aug29: 'Qianwei Liu',
              Sept5: 'Xingru Wang',
              Sept12: 'Shaun Tung',
              Sept19: 'Shenney Lin',
            },
            {
              duties: 'Piano',
              team: 'Pianists',
              June30: 'Shouli Tung',
              July4: 'Shaun Tung',
              July11: 'Rebecca Lin',
              July18: 'Shenney Lin',
              July25: 'Joseph Wu',
              Aug1: 'Chloe Lin',
              Aug8: 'Vinnie Lin',
              Aug15: 'Shouli Tung',
              Aug22: 'Shaun Tung',
              Aug29: 'Rebecca Lin',
              Sept5: 'Shennely Lin',
              Sept12: 'Joseph Wu',
              Sept19: 'Chloe Lin',
            },
            {
              time: '11:00AM',
              duties: 'Sermon Speaker',
              team: 'Church Council',
              June30: 'Yvonne Wong',
              July4: 'Sun-yu Yang',
              July11: 'Pr G. Chen',
              July18: 'Kevin Wang',
              July25: 'Yvonne Wong',
              Aug1: 'Sun-yu Yang',
              Aug8: 'Pr G. Chen',
              Aug15: 'Kevin Wang',
              Aug22: 'Yvonne Wong',
              Aug29: 'Sun-yu Yang',
              Sept5: 'Pr G. Chen',
              Sept12: 'Kevin Wang',
              Sept19: 'Yvonne Wong',
            },
            {
              duties: 'Interpreter',
              team: 'Interpreter',
              June30: 'Joseph Wu',
              July4: 'Thomas Hsu',
              July11: 'QianWei Liu',
              July18: 'Rebecca Lin',
              July25: 'Joseph Wu',
              Aug1: 'Thomas Hsu',
              Aug8: 'QianWei Liu',
              Aug15: 'Rebecca Lin',
              Aug22: 'Joseph Wu',
              Aug29: 'Thomas Hsu',
              Sept5: 'QianWei Liu',
              Sept12: 'Rebecca Lin',
              Sept19: 'Joseph Wu',
            },
            {
              time: '12:00PM',
              duties: 'Announcer',
              team: 'Church Council',
              June30: 'Brenda Ong',
              July4: 'Kevin Wang',
              July11: 'Sun-yu Yang',
              July18: 'Yvonne Wong',
              July25: 'Brenda Ong',
              Aug1: 'Kevin Wang',
              Aug8: 'Sun-yu Yang',
              Aug15: 'Yvonne Wong',
              Aug22: 'Brenda Ong',
              Aug29: 'Kevin Wang',
              Sept5: 'Sun-yu Yang',
              Sept12: 'Yvonne Wong',
              Sept19: 'Brenda Ong',
            },
            {
              duties: 'Grace',
              team: 'any',
              June30: 'Shenney Lin',
              July4: 'Vinnie Lin',
              July11: 'Shaun Tung',
              July18: 'Shouli Tung',
              July25: 'Brenda Ong',
              Aug1: 'Kevin Wang',
              Aug8: 'Sun-yu Yang',
              Aug15: 'Yvonne Wong',
              Aug22: 'Rebecca Lin',
              Aug29: 'Thomas Hsu',
              Sept5: 'Qianwei Liu',
              Sept12: 'Chloe Lin',
              Sept19: 'Joseph Wu',
            },
            {
              duties: 'Cooking',
              team: 'any',
              June30: 'Team A',
              July4: 'Team B',
              July11: 'Team A',
              July18: 'Team B',
              July25: 'Team A',
              Aug1: 'Team B',
              Aug8: 'Team A',
              Aug15: 'Team B',
              Aug22: 'Team A',
              Aug29: 'Team B',
              Sept5: 'Team A',
              Sept12: 'Team B',
              Sept19: 'Team A',
            },
          ]}
          title="Morning Service"
        />
        <MaterialTable
          columns={[
            { title: 'Time', field: 'time' },
            { title: 'Duties', field: 'duties' },
            { title: '6/30', field: 'June30' },
            { title: '7/4', field: 'July4' },
            { title: '7/11', field: 'July11' },
            { title: '7/18', field: 'July18' },
            { title: '7/25', field: 'July25' },
            { title: '8/1', field: 'Aug1' },
            { title: '8/8', field: 'Aug8' },
            { title: '8/15', field: 'Aug15' },
            { title: '8/22', field: 'Aug22' },
            { title: '8/29', field: 'Aug29' },
            { title: '9/5', field: 'Sept5' },
            { title: '9/12', field: 'Sept12' },
            { title: '9/19', field: 'Sept19' },
          ]}
          options={{
            paging: false,
            fixedColumns: {
              left: 2,
              right: 0,
            },
            search: false,
            draggable: false,
          }}
          data={[
            {
              time: '1:45 PM',
              duties: 'Hymn Leading',
              team: 'Hymn Leader',
              June30: 'Shenney Lin',
              July4: 'Chloe Lin',
              July11: 'Vinnie Lin',
              July18: 'Qianwei Liu',
              July25: 'Xingru Wang',
              Aug1: 'Shaun Tung',
              Aug8: 'Shenney Lin',
              Aug15: 'Chloe Lin',
              Aug22: 'Vinnie Lin',
              Aug29: 'Qianwei Liu',
              Sept5: 'Xingru Wang',
              Sept12: 'Shaun Tung',
              Sept19: 'Shenney Lin',
            },
            {
              duties: 'Piano',
              team: 'Pianists',
              June30: 'Shouli Tung',
              July4: 'Shaun Tung',
              July11: 'Rebecca Lin',
              July18: 'Shenney Lin',
              July25: 'Joseph Wu',
              Aug1: 'Chloe Lin',
              Aug8: 'Vinnie Lin',
              Aug15: 'Shouli Tung',
              Aug22: 'Shaun Tung',
              Aug29: 'Rebecca Lin',
              Sept5: 'Shennely Lin',
              Sept12: 'Joseph Wu',
              Sept19: 'Chloe Lin',
            },
            {
              time: '2:00 PM',
              duties: 'Sermon Speaker',
              team: 'Church Council',
              June30: 'Yvonne Wong',
              July4: 'Sun-yu Yang',
              July11: 'Pr G. Chen',
              July18: 'Kevin Wang',
              July25: 'Yvonne Wong',
              Aug1: 'Sun-yu Yang',
              Aug8: 'Pr G. Chen',
              Aug15: 'Kevin Wang',
              Aug22: 'Yvonne Wong',
              Aug29: 'Sun-yu Yang',
              Sept5: 'Pr G. Chen',
              Sept12: 'Kevin Wang',
              Sept19: 'Yvonne Wong',
            },
            {
              duties: 'Interpreter',
              team: 'Interpreter',
              June30: 'Joseph Wu',
              July4: 'Thomas Hsu',
              July11: 'QianWei Liu',
              July18: 'Rebecca Lin',
              July25: 'Joseph Wu',
              Aug1: 'Thomas Hsu',
              Aug8: 'QianWei Liu',
              Aug15: 'Rebecca Lin',
              Aug22: 'Joseph Wu',
              Aug29: 'Thomas Hsu',
              Sept5: 'QianWei Liu',
              Sept12: 'Rebecca Lin',
              Sept19: 'Joseph Wu',
            },
          ]}
          title="Afternoon Service"
        />
      </Container>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
