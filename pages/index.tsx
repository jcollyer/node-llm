import { useEffect, useState, FormEvent } from 'react';

function HomePage() {
  const [chat, setChat] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const postChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: chat }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setResponse(data.choices[0].message.content);
    });
  }

  return (
    <div>
      <h1>Hello, World!</h1>
      <form onSubmit={(e) => postChat(e)}>
        <input type="text" value={chat} onChange={(e) => setChat(e.target.value)} />
        <button>submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
}

export default HomePage;