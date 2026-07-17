import { useEffect } from 'react';

function App() {
  useEffect(() => {
    window.location.href = "https://squareone.py50.tech/portal/lunch";
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Redirecting to Square One Portal...</h1>
      <p>If you are not redirected automatically, <a href="https://squareone.py50.tech/portal/lunch">click here</a>.</p>
    </div>
  );
}

export default App;
