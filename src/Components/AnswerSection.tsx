import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { axiosInstance } from "@/lib/utils";
import type { answerModel } from "@/types/answer.model";
import { Plus, Trash2 } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import toast from "react-hot-toast";

interface AnswerSectionProps {
  type: "correct" | "incorrect";
  answers: answerModel[];
  setAnswers: Dispatch<SetStateAction<answerModel[]>>;
  createMode: boolean;
}

const AnswerSection = ({
  type,
  answers,
  setAnswers,
  createMode,
}: AnswerSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () =>
    setAnswers([
      ...answers,
      {
        id: Date.now(),
        answerText: "",
        quizId: Date.now(),
        isCorrect: type === "correct" ? true : false,
        createdAt: "",
        updatedAt: "",
      },
    ]);

  const handleRemove = (id: number) => {
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.id !== id),
    );
  };

  const handleDeleteAnswer = async (answerId: number) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`answers/${answerId}`);
      setAnswers((prevAnswers) =>
        prevAnswers.filter((answer) => answer.id !== answerId),
      );
      setIsLoading(false);
      toast("answer deleted successfully!");
    } catch {
      setIsLoading(false);
      toast("failed to delete an answer.");
    }
  };

  const handleChange = (id: number, value: string) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, answerText: value } : answer,
      ),
    );
  };

  const borderStyle =
    type === "correct" ? "border-l-brand" : "border-l-negative";
  const label = type === "correct" ? "Correct Answer" : "Incorrect Answer";

  return (
    <>
      {isLoading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div
          className={`rounded-xl border p-3 ${borderStyle} relative space-y-3 border-l-[6px] font-Poppins`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-primary">{label}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleAdd}
              className="border-dashed border-gray-300 text-foreground-secondary"
            >
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>

          {answers
            .filter((answer) =>
              type === "correct" ? answer.isCorrect : !answer.isCorrect,
            )
            .map((answer) => (
              <div key={answer.id} className="flex items-center space-x-2">
                <Input
                  value={answer.answerText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(answer.id, e.target.value)
                  }
                  placeholder={`Enter ${label}`}
                  className="text-sm font-normal placeholder:font-normal"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={
                    createMode
                      ? () => handleRemove(answer.id)
                      : () => handleDeleteAnswer(answer.id)
                  }
                >
                  <Trash2 className="h-4 w-4 text-foreground-secondary" />
                </Button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default AnswerSection;
