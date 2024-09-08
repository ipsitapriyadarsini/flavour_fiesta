'use client';
import { authenticate, authenticateAdmin } from '@/database/actions';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import Card from '@mui/material/Card';
import GoogleButton from '../inputs/GoogleButton';
import meal from '@/assets/images/meal.jpg';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '../inputs/Button';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from 'react-icons/ai';
import { IoIosLock } from 'react-icons/io';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import { useState } from 'react';

type Props = {
  authPage?: 'user' | 'admin';
};
const Login = ({ authPage = 'user' }: Props) => {
  const authAction = authPage === 'user' ? authenticate : authenticateAdmin;
  const { data: session, status } = useSession();
  const router = useRouter();

  const [errorMsg, dispatch] = useFormState(authAction, '');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  if (session) router.replace('/');

  if (status === 'loading') return <h2>Loading...</h2>;
  if (status === 'authenticated') return null;

  return (
    <div className="flex items-center justify-center py-4 bg-slate-50">
      <Card>
        <div className="grid grid-cols-2 gap-3">
          <section className="h-full relative">
            <Image
              src={meal}
              width={400}
              className="h-full"
              alt="Picture of the author"
            />
          </section>
          <section className="my-4 me-4 min-height">
            <div className="grid place-items-center">
              <GoogleButton />
            </div>
            <form action={dispatch} className="mt-4">
              <div className="flex items-center text-lg mb-6 md:mb-8 relative">
                {/* <AiOutlineMail className="absolute ml-3 text-black" size={24} /> */}
                <TextField
                  label="Email"
                  id="outlined-start-adornment"
                  name="email"
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AiOutlineMail className="text-black" size={22} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8 relative">
                {/* <IoIosLock className="absolute ml-3 text-black" size={24} /> */}
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    className="bg-gray-200 rounded pl-12 focus:outline-none w-full"
                    startAdornment={
                      <InputAdornment position="start">
                        <IoIosLock className="text-black" size={24} />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    name="password"
                  />
                </FormControl>
              </div>
              <Button label="login" className="w-full font-medium md:p-4" />
            </form>
            <span className="my-4">
              Don&apos;t have an account?
              <Link href="/signup" className="ml-2 underline">
                Sign up
              </Link>
            </span>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default Login;
