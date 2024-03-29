import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyboardEvent, useEffect, useRef } from "react";

type HowToPlayProps = {
  closeHowToPlay: () => void;
};

const HowToPlay = (props: HowToPlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const { closeHowToPlay } = props;

  const escToClose = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") closeHowToPlay();
  };

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.focus();
    }
  }, []);

  return (
    <div
      className="absolute top-0 left-0 h-full w-full flex justify-center items-center z-20"
      onKeyDown={escToClose}
      tabIndex={0}
      ref={overlayRef}
    >
      <div className="absolute h-full w-full bg-[#fafafa] opacity-60"></div>
      <div className="relative opacity-100 bg-fake-white shadow h-fit w-[650px] animate-slideIn">
        <FontAwesomeIcon
          icon={faXmark}
          className="absolute right-4 top-4 cursor-pointer"
          onClick={closeHowToPlay}
        />
        <div className="p-12">
          <div className="text-3xl font-bold mb-3">How to Play</div>
          <div className="text-xl font-bold">
            Everyone is trying to draw the word that the question master comes
            up with one line at a time.
          </div>
          <ul className="list-disc list-inside">
            <li>
              The question master picks a word for everyone to draw (the
              "title") and a category that the title fits into.
            </li>
            <li>
              The twist: one player doesn't know the word! They only know the
              category of the word (a hint from the question master)
            </li>
          </ul>
          <br />
          <div className="text-xl font-bold">
            After two rounds of drawing, the artists all vote on the fake
            artist.
          </div>
          <ul className="list-disc list-inside">
            <li>
              If the fake artist does NOT receive the most votes (they can tie
              for most!), they win.
            </li>
            <li>
              If the fake artist DOES receive the most votes, they have one more
              chance to win: guessing the word right. If the question master
              decides the word is right, the fake artist wins!
            </li>
            <li>
              So...if you're a real artist, don't make the word too obvious for
              the fake artist!
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
