import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { axiosInstance } from "@/lib/utils";
import type { QuizModel } from "@/types/quiz.model";
import { Dot, EllipsisVertical, SquarePen, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import errorImg from "../assets/images/errorImge.jpg";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState<QuizModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === "/";

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get<QuizModel[]>("/questions")
      .then((res) => {
        setQuizzes(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, [isDashboard]);

  const handleSubmit = (id: number) => {
    if (!selectedAnswer) {
      toast("Select an option");
      return;
    }
    const question = quizzes.find((a) => a.id === id);
    const chosen = question?.answers.find((a) => a.id === selectedAnswer);
    if (chosen?.isCorrect) {
      toast.success("Your answer is currect");
    } else {
      toast.error("Your answer is incurrect");
    }
  };

  const handleDeleteQuestion = async (quizId: number) => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`questions/${quizId}`);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
      toast.success("deleted question successfully");
    } catch {
      toast.error("failed to delete the question");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <img
        src={errorImg}
        alt="error"
        className="mx-auto size-1/2 rounded-2xl"
      />
    );
  }

  return (
    <section className="m-4 flex flex-col gap-4 px-3">
      <p className="font-Poppins text-2xl font-bold">
        {isDashboard ? "Quiz Dashboard" : "History Dashboard"}
      </p>
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="flex flex-col gap-4 rounded-md border-2 p-3"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <p className="font-Poppins text-sm font-normal text-nowrap">
                John Doe
              </p>
              <Dot />
              <p>{new Date(quiz.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="relative flex flex-row items-center">
              <Badge className="h-8 bg-Positive-Light font-Poppins text-Foreground-positive">
                Publish
              </Badge>

              {isDashboard && (
                <span
                  className="relative"
                  onClick={() =>
                    setOpenMenuId(openMenuId === quiz.id ? null : quiz.id)
                  }
                >
                  <EllipsisVertical className="cursor-pointer" />
                  {openMenuId === quiz.id && (
                    <div className="absolute right-1 bottom-10 w-20 rounded-sm bg-darker-background p-1">
                      <span className="flex flex-row justify-around gap-3">
                        <Trash
                          className="cursor-pointer"
                          onClick={() => handleDeleteQuestion(quiz.id)}
                        />
                        <SquarePen
                          className="cursor-pointer"
                          onClick={() => navigate(`edit/${quiz.id}`)}
                        />
                      </span>
                    </div>
                  )}
                </span>
              )}
            </div>
          </div>

          <hr className="mx-auto w-full border" />
          <p className="font-Poppins text-xl font-bold">{quiz.question}</p>
          <RadioGroup
            defaultValue={
              !isDashboard
                ? quiz.answers.find((ans) => ans.isCorrect)?.id.toString()
                : undefined
            }
            className="flex flex-col gap-6"
            onValueChange={(val) =>
              isDashboard && setSelectedAnswer(Number(val))
            }
          >
            {quiz.answers.map((ans) => (
              <div key={ans.id} className="flex items-center gap-4">
                <RadioGroupItem
                  value={`${ans.id}`}
                  id={`answer-${ans.id}`}
                  disabled={!isDashboard}
                />
                <Label htmlFor={`answer-${ans.id}`}>{ans.answerText}</Label>
              </div>
            ))}
          </RadioGroup>
          {isDashboard && (
            <>
              <hr className="mx-auto w-full border" />
              <Button
                className="w-36 bg-primary font-Poppins font-medium dark:text-white"
                size={"lg"}
                onClick={() => handleSubmit(quiz.id)}
              >
                Submit answer
              </Button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default Dashboard;
