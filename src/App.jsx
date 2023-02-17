import './App.css'
import React from "react";
import { Configuration, OpenAIApi } from "openai";
import { useState } from 'react';

export default function App() {

  const [text, setText] = useState("");
  const [summarizedText, setsummarizedText] = useState("");
  const [loading, setLoading] = useState(false)


  // SETTING CONFIGURATION
  const configuration = new Configuration(
    {
      apiKey: "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",

    }
  );

  const openai = new OpenAIApi(configuration);

  const HandleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(text),
      temperature: 0.6,
      max_tokens: 100,
    })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setsummarizedText(res?.data?.choices[0]?.text);
        }
      })
      .catch((err) => {
        console.log(err, "An error occured");

      });
  };

  function generatePrompt(text) {
    return `Summarize this ${text}. and break them into seperate lines`;
  }
  return (
    <div className='App'>
      <div className="header">
        <h1 className="header_text">
          Text<span className="text_active">Summarize</span>
        </h1>
        <br/>
        <h2 className="header_summary">Summarise your text into a shorter length.
        </h2>
      </div>
      <div className="conatiner">
        <div className="text_form">
          <form>
            <label>Enter your text</label>
            <textarea rows={14} cols={80}
              placeholder="Put your text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />


          </form>

        </div>
        <div>
          <button type="button" onClick={HandleSubmit}>
            {loading ? "loading..." : "Summarize"}
          </button>

        </div>
        <div className="summarized_text">
          <label>Summarized text</label>
          <textarea
            placeholder="Summarised Text"
            cols={80}
            rows={14}
            value={summarizedText}
            onChange={(e) => setText(e.target.value)} />
        </div>
      </div>

    </div>
  );
}
