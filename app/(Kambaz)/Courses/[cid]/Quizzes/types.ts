export type Choice = {
  _id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  _id: string;
  type: "mcq" | "tf" | "fill";
  title: string;
  body: string;
  points: number;
  choices: Choice[];
  blanks?: { _id: string; answers: string[] }[];
};

export type QuizSettings = {
  quizType?: string;
  assignmentGroup?: string;
  shuffleAnswers?: boolean;
  timeLimitMinutes?: number;
  multipleAttempts?: boolean;
  maxAttempts?: number;
  showCorrectAnswers?: boolean | string;
  accessCode?: string;
  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockQuestionsAfterAnswering?: boolean;
};

export type Quiz = {
  _id: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
  published?: boolean;
  publishedBy?: string;
  publishedAt?: string;
  questions?: Question[];
  settings?: QuizSettings;
  createdBy?: string;
  createdAt?: string;
};

export type AttemptAnswer = {
  questionId: string;
  answer: any;
};

export type Attempt = {
  _id: string;
  quiz: string;
  user: string;
  answers?: AttemptAnswer[];
  score: number;
  totalPoints: number;
  attemptNumber: number;
  createdAt: string;
};

