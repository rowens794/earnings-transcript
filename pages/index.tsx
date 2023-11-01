import { Remarkable } from "remarkable";
import { useState } from "react";

import {
  renderMarkdownFT,
  renderMarkdownPT,
  renderMarkdownPrompt,
} from "../renderMD";

interface Props {
  content: any;
}

export default function Home({ content }: Props) {
  const [quarter, setQuarter] = useState("Q1 2023");

  return (
    <main className="bg-gray-100 flex flex-col h-screen overflow-hidden">
      <div className="p-4 flex gap-4 border-b border-gray-400 justify-center">
        <Button text="Q3 2022" quarter={quarter} setQuarter={setQuarter} />
        <Button text="Q4 2022" quarter={quarter} setQuarter={setQuarter} />
        <Button text="Q1 2023" quarter={quarter} setQuarter={setQuarter} />
        <Button text="Q2 2023" quarter={quarter} setQuarter={setQuarter} />
        <Button text="Q3 2023" quarter={quarter} setQuarter={setQuarter} />
        <Button text="Prompt" quarter={quarter} setQuarter={setQuarter} />
        <Button text="Projection" quarter={quarter} setQuarter={setQuarter} />
      </div>

      <div className=" grid grid-cols-2 flex-grow h-[calc(100%-100px)]">
        <div className="bg-gray-100 h-full w-full overflow-y-scroll border-r border-gray-500 flex">
          <div className="max-w-3xl ml-auto">
            {quarter !== "Prompt" && quarter !== "Projection" && (
              <>
                <h1 className="py-4 font-bold px-8">
                  Full Earnings Transcript - {quarter}
                </h1>
                <div className="w-full overflow-y-auto px-8 pb-24">
                  <div
                    dangerouslySetInnerHTML={{ __html: content[quarter].ft }}
                  />
                </div>
              </>
            )}

            {quarter === "Prompt" && (
              <p className="pt-24 px-24">
                In order to produce the summaries, I provided the following
                prompt along with a call transcript to the language model.
              </p>
            )}

            {quarter === "Projection" && (
              <p className="pt-24 px-24">
                Once call summaries are collected, this information can be used
                to perform interesting work. For example, you could ask the LLM
                to generate a set of questions based on the history of calls to
                generate ideas for questions that should be asked during
                upcoming conversations.
              </p>
            )}
          </div>
        </div>

        <div className="bg-gray-300 h-full w-full overflow-y-scroll border-r border-gray-500 flex">
          <div className="max-w-3xl mr-auto">
            {quarter !== "Prompt" && quarter !== "Projection" && (
              <>
                <h1 className="py-4 font-bold px-8">
                  Raw Summary Output - {quarter}
                </h1>
                <div className="w-full overflow-y-auto px-8 pb-24">
                  <div
                    dangerouslySetInnerHTML={{ __html: content[quarter].pt }}
                  />
                </div>
              </>
            )}

            {quarter === "Prompt" && (
              <>
                <h1 className="py-4 font-bold px-8"></h1>
                <div className="w-full overflow-y-auto px-8 pb-24">
                  <div dangerouslySetInnerHTML={{ __html: content[quarter] }} />
                </div>
              </>
            )}

            {quarter === "Projection" && (
              <>
                <h1 className="py-4 font-bold px-8"></h1>
                <div className="w-full overflow-y-auto px-8 pb-24">
                  <div dangerouslySetInnerHTML={{ __html: content[quarter] }} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Button({
  text,
  quarter,
  setQuarter,
}: {
  text: string;
  quarter: string;
  setQuarter: any;
}) {
  return (
    <button
      onClick={() => setQuarter(text)}
      className={`border rounded-md px-4 py-1 border-gray-500 ${
        text === quarter ? "bg-gray-300" : "bg-gray-100"
      } `}
    >
      {text}
    </button>
  );
}

export async function getStaticProps() {
  const Q32022FT = renderMarkdownFT("Q3 2022.md");
  const Q32022PT = renderMarkdownPT("Q3 2022.md");
  const Q42022FT = renderMarkdownFT("Q4 2022.md");
  const Q42022PT = renderMarkdownPT("Q4 2022.md");
  const Q12023FT = renderMarkdownFT("Q1 2023.md");
  const Q12023PT = renderMarkdownPT("Q1 2023.md");
  const Q22023FT = renderMarkdownFT("Q2 2023.md");
  const Q22023PT = renderMarkdownPT("Q2 2023.md");
  const Q32023FT = renderMarkdownFT("Q3 2023.md");
  const Q32023PT = renderMarkdownPT("Q3 2023.md");
  const prompt = renderMarkdownPrompt("prompt.md");
  const projection = renderMarkdownPrompt("projection.md");

  let content = {
    "Q3 2022": {
      ft: Q32022FT,
      pt: Q32022PT,
    },
    "Q4 2022": {
      ft: Q42022FT,
      pt: Q42022PT,
    },
    "Q1 2023": {
      ft: Q12023FT,
      pt: Q12023PT,
    },
    "Q2 2023": {
      ft: Q22023FT,
      pt: Q22023PT,
    },
    "Q3 2023": {
      ft: Q32023FT,
      pt: Q32023PT,
    },
    Prompt: prompt,
    Projection: projection,
  };

  return {
    props: {
      content,
    },
  };
}
