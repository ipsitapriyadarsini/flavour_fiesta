'use server';

import { signOut, auth } from '@/app/api/auth/login/auth';
import dbConnect from '@/database/db';
import Account from '@/database/model/account.model';

export const handleSignOut = async () => {
  const session = await auth();

  await dbConnect();

  // Deletes the accounts created for gauth during sign-out
  await Account.deleteMany({ userId: session?.user.id });

  await signOut();
};
