import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from "./../../../lib/supabase"

const ConfirmEmail = () => {
  const router = useRouter();
  const { token_hash, type } = router.query;
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      if (!token_hash || !type) return;

      try {
        const { error } = await supabase.auth.api.confirmEmail(token_hash, type);

        if (error) {
          throw new Error(error.message);
        }

        setMessage('Email confirmed successfully!');
      } catch (error) {
        setMessage(`Error confirming email: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [token_hash, type]);

  if (loading) return <p>Loading...</p>;

  return <p>{message}</p>;
};

export default ConfirmEmail;
