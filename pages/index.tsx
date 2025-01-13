import { useState, FormEvent } from 'react';
import { createParser, type EventSourceMessage } from 'eventsource-parser';

function HomePage() {
  const [prompt, setPrompt] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const postChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Clear the output
    setSuggestions([]);

    const {data} = await fetch('/api/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    }).then((res) => res.json());

    console.log('-------->>',data);
    setSuggestions(data);

    // Stream logic
  //   const reader = response.body?.getReader();
  //   const decoder = new TextDecoder();
  //   const onEvent = (event: EventSourceMessage) => {
  //     if (event) {
  //       try {
  //         const data = JSON.parse(event.data);
  //         data.choices
  //           .filter(({delta}: {delta: {content:any}}) => !!delta.content)
  //           .forEach(({delta}: {delta: {content: any}}) => {
  //             setOutput((prev) => `${prev}${delta.content}`);
  //           });
              
  //       } catch (e) {
  //         console.error('Error parsing JSON', e);
  //       }
  //     }
  //   }

  //   const parser = createParser({onEvent});

  //   while (true) {
  //     if (!reader) break;
  //     const { done, value } = await reader.read();
  //     const dataString = decoder.decode(value);
  //     if (done || dataString.includes("[DONE]")) break;
  //     parser.feed(dataString);
  //   }
  }

  return (
    <div>
      <h1>Hello, World!</h1>
      <form onSubmit={(e) => postChat(e)}>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button>submit</button>
      </form>
      <div>{suggestions.map((suggestion) => {
        return <div key={suggestion}>{suggestion}</div>;
      })}</div>
    </div>
  );
}

export default HomePage;