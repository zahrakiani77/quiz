import type { Dispatch, SetStateAction } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const QuestionInput = ({
  question,
  setQuestion,
}: {
  question:string
  setQuestion: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="grid w-full items-center gap-3">
      <Label htmlFor="text" className="font-Montserrat font-semibold">
        Question
      </Label>
      <Textarea
        id="text"
        placeholder="Enter your Question Here..."
        value={question}
        className="h-32 w-full resize-none text-left font-Montserrat text-sm"
        onChange={(e) => setQuestion(e.target.value)}
      />
    </div>
  );
};

export default QuestionInput;
