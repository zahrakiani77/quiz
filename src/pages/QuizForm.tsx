import AnswerSection from "@/Components/AnswerSection";
import QuestionInput from "@/Components/QuestionInput";
import { Button } from "@/Components/ui/button";
import { Switch } from "@/Components/ui/switch";
import { axiosInstance } from "@/lib/utils";
import type { answerModel } from "@/types/answer.model";
import type { quiz } from "@/types/question.model";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const QuizForm = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<answerModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fullPath = useLocation().pathname;
  const createMode = fullPath === "/create" ? true : false;

  const quizId = fullPath.split("/")[2];

  useEffect(() => {
    if (createMode) {
      return;
    }

    setIsLoading(true);
    axiosInstance
      .get<quiz>(`/questions/${quizId}`)
      .then((res) => {
        setQuestion(res.data.question);
        setAnswers(res.data.answers);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [quizId, createMode]);

  const navigate = useNavigate();

  const resetForm = () => {
    setQuestion("");
    setAnswers([]);
  };

  const handleCreate = async () => {
    try {
      setIsLoading(true);
      const questionRes = await axiosInstance.post<quiz>("/questions", {
        question,
      });
      const quizId = questionRes.data.id;

      const updatedAnswers = answers.map((answer) => ({
        ...answer,
        quizId,
      }));

      const answerPromises = updatedAnswers.map((answer) =>
        axiosInstance.post("/answers", {
          answerText: answer.answerText,
          quizId: answer.quizId,
          isCorrect: answer.isCorrect,
          updatedAt: answer.updatedAt,
          createdAt: answer.createdAt,
        }),
      );

      const responses = await Promise.all(answerPromises);

      const newAnswers = responses.map((res, index) => ({
        ...updatedAnswers[index],
        ...res.data,
      }));

      setAnswers(newAnswers);

      setIsLoading(false);
      console.log("Quiz created successfully!");
      resetForm();
      toast.success("Quiz created successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error creating quiz:", err);
      resetForm();
      setIsLoading(false);
      toast.error("Error while creating quiz");
      navigate("/");
    }
  };

  const handleEdit = async () => {
    try {
      console.log(question);
      
      setIsLoading(true);
      await axiosInstance.patch<quiz>(`/questions/${quizId}`, {
        question
      });

      const updatePromises = answers.map((answer) =>
        axiosInstance.patch<answerModel>(`/answers/${answer.id}`, {
          answerText: answer.answerText,
          quizId,
          isCorrect: answer.isCorrect,
        }),
      );

      await Promise.all(updatePromises);

      setIsLoading(false);
      console.log("Quiz updated successfully!");
      resetForm();
      navigate("/")
      toast.success("Quiz updated successfully!");
    } catch (err) {
      console.error("Error updating quiz:", err);
      resetForm();
      setIsLoading(false);
      navigate("/")
      toast.error("Error while updating quiz");
    }
  };



  return (
    <>
      {isLoading ? (
        <div className="flex h-48 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-primary border-t-transparent"></div>
        </div>
      ) : (
        <main className="mx-auto w-[85%] max-w-lg space-y-6 py-4">
          <section className="flex items-start justify-between">
            <div>
              <h2 className="text-md font-Montserrat font-bold text-primary">
                {createMode ? "Create New QUIZ" : "Edit QUIZ"}
              </h2>
              {createMode && (
                <p className="w-54 font-Montserrat text-xs text-muted-foreground">
                  Fill in the details to create a new question with at least 4
                  answers.
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-1 space-x-2">
              <div className="flex items-center gap-2">
                <span className="font-Montserrat text-sm">Status</span>
                <Switch defaultChecked />
              </div>
              <p className="font-Montserrat text-xs font-normal text-muted-foreground">
                your post will be saved as a public
              </p>
            </div>
          </section>

          <section>
            <QuestionInput setQuestion={setQuestion} question={question} />
          </section>

          <AnswerSection
            type="correct"
            answers={answers}
            setAnswers={setAnswers}
            createMode={createMode}
          />
          <AnswerSection
            type="incorrect"
            answers={answers}
            setAnswers={setAnswers}
            createMode={createMode}
          />

          <section className="flex justify-end gap-4">
            <Button
              variant="outline"
              className="font-Montserrat font-semibold"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button
              className="font-Montserrat font-semibold"
              onClick={createMode ? handleCreate : handleEdit}
            >
              {createMode ? "Create Quiz" : " Update Quiz"}
            </Button>
          </section>
        </main>
      )}
    </>
  );
};

export default QuizForm;
