'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

export default function JobSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search') || '';

  const [value, setValue] = useState(currentSearch);

  const debouncedUpdate = debounce((val: string) => {
    const url = new URL(window.location.href);
    if (val.trim() !== '') {
      url.searchParams.set('search', val);
    } else {
      url.searchParams.delete('search');
    }
    router.replace(url.toString());
  }, 300);

  useEffect(() => {
    debouncedUpdate(value);
    return () => debouncedUpdate.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    setValue(currentSearch);
  }, [currentSearch]);

  return (
    <Input
      type="text"
      value={value}
      placeholder="Search jobs..."
      onChange={(e) => setValue(e.target.value)}
      className="flex-1"
    />
  );
}
