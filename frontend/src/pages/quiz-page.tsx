import { useEffect, useState } from "react";
import axios from "axios";
import {
  Leaf,
  Check,
  X,
  Award,
  ArrowRight,
  RotateCcw,
  HelpCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface Question {
  id: number;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  points: number;
  explanation: string;
}
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [points, setPoints] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [questions , setQuestions] = useState<Question[]>( []);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users/quiz",{});
        console.log(response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);``
      }
    }
    getData();
  },[])
  // const questions = [
  //   {
  //     id: 1,
  //     question:
  //       "Which of the following contributes most to greenhouse gas emissions globally?",
  //     options: [
  //       { id: "a", text: "Transportation" },
  //       { id: "b", text: "Electricity production" },
  //       { id: "c", text: "Agriculture" },
  //       { id: "d", text: "Residential heating" },
  //     ],
  //     correctAnswer: "b",
  //     points: 10,
  //     explanation:
  //       "Electricity production is the largest source of greenhouse gas emissions globally, primarily due to the burning of fossil fuels like coal and natural gas.",
  //   },
  //   {
  //     id: 2,
  //     question:
  //       "Which renewable energy source has seen the largest growth in the past decade?",
  //     options: [
  //       { id: "a", text: "Wind energy" },
  //       { id: "b", text: "Solar energy" },
  //       { id: "c", text: "Hydroelectric power" },
  //       { id: "d", text: "Geothermal energy" },
  //     ],
  //     correctAnswer: "b",
  //     points: 15,
  //     explanation:
  //       "Solar energy has experienced the most rapid growth globally in the past decade, with dramatic decreases in cost and increases in efficiency.",
  //   },
  //   {
  //     id: 3,
  //     question:
  //       "What is the most effective individual action to reduce carbon footprint?",
  //     options: [
  //       { id: "a", text: "Using public transportation" },
  //       { id: "b", text: "Eating less meat" },
  //       { id: "c", text: "Reducing air travel" },
  //       { id: "d", text: "Using renewable energy" },
  //     ],
  //     correctAnswer: "c",
  //     points: 20,
  //     explanation:
  //       "While all options help, reducing air travel has the single largest impact on an individual's carbon footprint due to the high emissions from aviation.",
  //   },
  //   {
  //     id: 4,
  //     question: "Which ecosystem is considered the 'lungs of the Earth'?",
  //     options: [
  //       { id: "a", text: "Amazon Rainforest" },
  //       { id: "b", text: "Coral Reefs" },
  //       { id: "c", text: "Arctic Tundra" },
  //       { id: "d", text: "Phytoplankton in oceans" },
  //     ],
  //     correctAnswer: "d",
  //     points: 25,
  //     explanation:
  //       "While the Amazon is often called the 'lungs of the Earth', marine phytoplankton actually produce 50-85% of the world's oxygen through photosynthesis.",
  //   },
  // ];

 
  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answerId });
  };

  const handleCheckAnswer = () => {
    const currentQuestionData = questions[currentQuestion];
    // Award points when checking the answer instead of when moving to next question
    if (
      selectedAnswers[currentQuestion] === currentQuestionData.correctAnswer
    ) {
      setPoints(points + currentQuestionData.points);
    }
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setPoints(0);
    setAnswered(false);
  };

  const currentQuestionData = questions[currentQuestion];
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const progress =
    ((currentQuestion + (answered ? 1 : 0)) / questions.length) * 100;

  // Calculate score percentage for results
  const scorePercentage = Math.round((points / totalPoints) * 100);

  // Function to determine badge and message based on score
  const getResultFeedback = () => {
    if (scorePercentage >= 80) {
      return {
        badge: "Sustainability Expert",
        message:
          "Impressive! You have excellent knowledge about environmental sustainability.",
        class:
          "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400",
      };
    }
    if (scorePercentage >= 60) {
      return {
        badge: "Eco-Conscious",
        message:
          "Good job! You have solid understanding of sustainability concepts.",
        class:
          "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
      };
    }
    return {
      badge: "Sustainability Novice",
      message:
        "You're on the right path to learning more about sustainability.",
      class:
        "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    };
  };

  return (
    <div className="w-full min-h-screen bg-background py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-2 text-center mb-8">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-500" />
            <h1 className="text-3xl font-bold tracking-tighter text-foreground">
              Environmental Sustainability Quiz
            </h1>
          </div>
          <p className="text-muted-foreground">
            Test your knowledge about sustainability and environmental
            conservation
          </p>
        </div>

        {!showResults ? (
          <Card className="w-full shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                >
                  Question {currentQuestion + 1} of {questions.length}
                </Badge>
                <Badge variant="secondary">
                  {currentQuestionData.points} Points
                </Badge>
              </div>
              <CardTitle className="text-xl">
                {currentQuestionData.question}
              </CardTitle>
              <Progress value={progress} className="h-2 mt-2" />
            </CardHeader>

            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestion] || ""}
                onValueChange={handleAnswerSelect}
                className="space-y-3"
                disabled={answered}
              >
                {currentQuestionData.options.map((option) => {
                  const isSelected =
                    selectedAnswers[currentQuestion] === option.id;
                  const isCorrect =
                    option.id === currentQuestionData.correctAnswer;
                  let optionClass = "border-2 p-4 rounded-md";

                  if (answered) {
                    if (isCorrect) {
                      optionClass += " border-green-500 bg-green-500/10";
                    } else if (isSelected && !isCorrect) {
                      optionClass += " border-red-500 bg-red-500/10";
                    }
                  } else if (isSelected) {
                    optionClass += " border-primary";
                  } else {
                    optionClass += " border-muted";
                  }

                  return (
                    <div key={option.id} className={optionClass}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label
                          htmlFor={option.id}
                          className="flex-grow cursor-pointer"
                        >
                          {option.text}
                        </Label>
                        {answered && isCorrect && (
                          <Check className="h-5 w-5 text-green-500" />
                        )}
                        {answered && isSelected && !isCorrect && (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>

              {answered && (
                <Alert className="mt-4 bg-blue-500/10 border-blue-200 dark:border-blue-800">
                  <HelpCircle className="h-4 w-4 text-blue-500" />
                  <AlertDescription>
                    {currentQuestionData.explanation}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>

            <CardFooter className="flex justify-between pt-4">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-amber-500 mr-1" />
                <span className="font-medium">
                  {points} / {totalPoints} points
                </span>
              </div>

              {!answered ? (
                <Button
                  onClick={handleCheckAnswer}
                  disabled={!selectedAnswers[currentQuestion]}
                >
                  Check Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  {currentQuestion < questions.length - 1 ? (
                    <>
                      Next Question <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "See Results"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full shadow-lg">
            <CardHeader className="text-center">
              <Leaf className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
              <CardDescription>
                You've completed the sustainability quiz
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl font-bold text-foreground">
                  {points} / {totalPoints}
                </div>
                <Progress
                  value={scorePercentage}
                  className="h-3 w-full max-w-md"
                />
                <div className="text-sm text-muted-foreground">
                  {scorePercentage}% Score
                </div>
              </div>

              <div className="flex flex-col items-center space-y-2 py-4">
                <Badge className={`px-3 py-1 ${getResultFeedback().class}`}>
                  {getResultFeedback().badge}
                </Badge>
                <p className="text-center text-muted-foreground">
                  {getResultFeedback().message}
                </p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Question Summary:</h3>
                <ul className="space-y-2">
                  {questions.map((q, index) => {
                    const isCorrect =
                      selectedAnswers[index] === q.correctAnswer;
                    return (
                      <li key={q.id} className="flex items-center">
                        {isCorrect ? (
                          <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mr-2 shrink-0" />
                        )}
                        <span className="text-sm">{q.question}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center pt-4">
              <Button onClick={resetQuiz} className="gap-2">
                <RotateCcw className="h-4 w-4" /> Take Quiz Again
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
