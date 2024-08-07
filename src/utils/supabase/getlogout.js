export const logout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to logout');
    }
  
    const data = await response.json();
    return data;
  };