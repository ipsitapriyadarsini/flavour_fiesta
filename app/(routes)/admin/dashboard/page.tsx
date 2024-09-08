import React from 'react';
import dbConnect from '@/database/db';
import User from '@/database/model/user.model';
import Role from '@/database/model/role.model';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

type Props = {};

const AdminDashboard = async (props: Props) => {
  await dbConnect();

  const userRole = await Role.findOne({ name: 'user' });
  const usersCount = await User.find({
    roles: { $elemMatch: { $eq: userRole._id } },
  }).count();

  return (
    <section className="m-5">
      <Card sx={{ width: 200 }}>
        <CardContent>
          <Typography variant="h3" align="center">
            Users
          </Typography>
          <Typography variant="h4" align="center">
            {usersCount}
          </Typography>
        </CardContent>
      </Card>
    </section>
  );
};

export default AdminDashboard;
