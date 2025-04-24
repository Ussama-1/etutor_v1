import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
};

export const useTickets = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/contact-support/fetch-ticket', fetcher, {
    revalidateOnFocus: true, // Re-fetch on window focus
  });

 
  return {
    ticket: data,
    isLoading,
    error,
    mutate, // Can be used to manually revalidate the data
  };
};
