'use client';
import Card from '@mui/material/Card';
import Link from 'next/link';
import { useState } from 'react';
import GoogleButton from '../inputs/GoogleButton';
import meal from '@/assets/images/meal.jpg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button from '../inputs/Button';

type Props = {
  authPage?: 'user' | 'admin';
};

const SignUp = ({ authPage = 'user' }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      setError('All the fields are mandatory');
      return;
    }
    try {
      const signupUrl =
        authPage === 'user' ? '/api/auth/signup' : '/api/auth/admin/signup';
      const res = await fetch(signupUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username: userName, email, password }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
      } else {
        console.log('Registation failed');
      }
    } catch (error) {
      console.log('registation failed:', error);
    }
  };

  if (session) router.replace('/');

  if (status === 'loading') return <h2>Loading...</h2>;
  if (status === 'authenticated') return null;

  return (
    <section className="flex items-center justify-center py-4 bg-slate-50">
      <Card>
        <div className="grid grid-cols-2 gap-3">
          <section className="h-full relative">
            <Image
              src={meal}
              width={400}
              className="h-full"
              // layout="responsive"
              // objectFit="contain"
              alt="Picture of the author"
            />
          </section>
          <section className="my-4 me-4">
            {authPage === 'user' && (
              <div className="grid place-items-center">
                <GoogleButton />
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                  <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                </svg>
                <input
                  type="text"
                  id="username"
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Your full name"
                />
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Your email id"
                />
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                </svg>
                <input
                  type="text"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                  placeholder="Password"
                />
              </div>
              <Button label="Sign up" className="w-full font-medium md:p-4" />
              {error && (
                <div className="my-4 bg-red-500 pl-3 rounded shadow-lg">
                  {error}
                </div>
              )}
            </form>
            <span className="inline-block my-3">
              Already have an account?
              <Link
                href={`${authPage === 'user' ? '' : '/admin'}/login`}
                className="underline"
              >
                Login
              </Link>
            </span>
          </section>
        </div>
      </Card>
    </section>
  );
};

export default SignUp;
