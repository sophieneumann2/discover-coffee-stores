'use client';

import React from 'react';
import Image from 'next/image';
import { upvoteAction } from '@/actions';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="bg-purple-951 min-w-[120px]"
    >
      {pending ? (
        <Image
          src={'/static/icons/loading-spinner.svg'}
          width={30}
          height={30}
          alt="Loading"
          className="m-auto"
        />
      ) : (
        'Up vote!'
      )}
    </button>
  );
}

export default function Upvote({ voting, id }: { voting: number; id: string }) {
  const initialState = { id, voting };
  const [state, dispatch] = useFormState(upvoteAction, initialState);

  return (
    <form action={dispatch}>
      <div className="mb-6 flex">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2">{state.voting}</p>
      </div>
      <SubmitButton />
    </form>
  );
}
