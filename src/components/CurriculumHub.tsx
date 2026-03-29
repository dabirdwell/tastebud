"use client";

import { useState } from "react";
import { CURRICULUM, type CurriculumModule, type Lesson, type QuizQuestion } from "@/data/curriculum";
import {
  CHALLENGES,
  CHALLENGE_TYPES,
  type Challenge,
  type ChallengeType,
  getChallengesByType,
} from "@/data/challenges";
import { getMentorById } from "@/data/mentors";

/* ── View types ─────────────────────────────────────────────── */

type View =
  | { kind: "modules" }
  | { kind: "lesson"; moduleId: string; lessonIndex: number }
  | { kind: "quiz"; moduleId: string; lessonIndex: number }
  | { kind: "challenges" }
  | { kind: "challenge"; challengeType: ChallengeType; challengeIndex: number };

/* ── Main hub ───────────────────────────────────────────────── */

export default function CurriculumHub() {
  const [view, setView] = useState<View>({ kind: "modules" });

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          <span className="text-copper">Learn</span> Flavor
        </h1>
        <p className="mt-2 text-foreground/60 max-w-2xl">
          5 modules, 15 lessons, and 25 challenges — from basic taste science to
          improvising your own recipes.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-4 mb-8 border-b border-border">
        <button
          onClick={() => setView({ kind: "modules" })}
          className={`pb-3 text-sm font-medium transition-colors ${
            view.kind !== "challenges" && view.kind !== "challenge"
              ? "text-copper border-b-2 border-copper"
              : "text-foreground/50 hover:text-foreground/80"
          }`}
        >
          Curriculum
        </button>
        <button
          onClick={() => setView({ kind: "challenges" })}
          className={`pb-3 text-sm font-medium transition-colors ${
            view.kind === "challenges" || view.kind === "challenge"
              ? "text-copper border-b-2 border-copper"
              : "text-foreground/50 hover:text-foreground/80"
          }`}
        >
          Challenges
        </button>
      </div>

      {/* Content */}
      {view.kind === "modules" && (
        <ModuleOverview onSelectLesson={(moduleId, lessonIndex) => setView({ kind: "lesson", moduleId, lessonIndex })} />
      )}
      {view.kind === "lesson" && (
        <LessonViewer
          moduleId={view.moduleId}
          lessonIndex={view.lessonIndex}
          onBack={() => setView({ kind: "modules" })}
          onQuiz={() => setView({ kind: "quiz", moduleId: view.moduleId, lessonIndex: view.lessonIndex })}
          onNextLesson={(moduleId, lessonIndex) => setView({ kind: "lesson", moduleId, lessonIndex })}
        />
      )}
      {view.kind === "quiz" && (
        <QuizRunner
          moduleId={view.moduleId}
          lessonIndex={view.lessonIndex}
          onBack={() => setView({ kind: "lesson", moduleId: view.moduleId, lessonIndex: view.lessonIndex })}
          onComplete={() => setView({ kind: "modules" })}
        />
      )}
      {view.kind === "challenges" && (
        <ChallengeOverview
          onSelect={(type, index) => setView({ kind: "challenge", challengeType: type, challengeIndex: index })}
        />
      )}
      {view.kind === "challenge" && (
        <ChallengeRunner
          challengeType={view.challengeType}
          challengeIndex={view.challengeIndex}
          onBack={() => setView({ kind: "challenges" })}
          onNext={(type, index) => setView({ kind: "challenge", challengeType: type, challengeIndex: index })}
        />
      )}
    </section>
  );
}

/* ── Module overview (5 cards) ──────────────────────────────── */

function ModuleOverview({
  onSelectLesson,
}: {
  onSelectLesson: (moduleId: string, lessonIndex: number) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {CURRICULUM.map((mod, mi) => {
        const isExpanded = expandedId === mod.id;
        return (
          <div
            key={mod.id}
            className="rounded-xl border border-border bg-surface overflow-hidden"
          >
            {/* Module header card */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : mod.id)}
              className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-surface-light transition-colors"
            >
              <span className="text-3xl">{mod.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-copper/70 uppercase tracking-wider">
                    Module {mi + 1}
                  </span>
                  {mod.unlockRequirement && (
                    <span className="text-xs text-foreground/30">
                      — requires {CURRICULUM.find((m) => m.id === mod.unlockRequirement)?.title}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold mt-0.5">{mod.title}</h3>
                <p className="text-sm text-foreground/50 mt-1 line-clamp-2">
                  {mod.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-foreground/40">
                  {mod.lessons.length} lessons
                </span>
                <svg
                  className={`w-5 h-5 text-foreground/40 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Expanded lesson list */}
            {isExpanded && (
              <div className="border-t border-border bg-background/50 px-6 py-4 space-y-2">
                {mod.lessons.map((lesson, li) => {
                  const mentor = getMentorById(lesson.mentorId);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(mod.id, li)}
                      className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-surface-light transition-colors group"
                    >
                      <span className="w-7 h-7 rounded-full bg-copper/15 text-copper text-xs font-bold flex items-center justify-center shrink-0">
                        {li + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium group-hover:text-copper transition-colors">
                          {lesson.title}
                        </p>
                        {mentor && (
                          <p className="text-xs text-foreground/40 mt-0.5">
                            {mentor.emoji} Suggested mentor: {mentor.name}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-foreground/30">
                        {lesson.quiz.length} quiz Q
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Lesson viewer ──────────────────────────────────────────── */

function LessonViewer({
  moduleId,
  lessonIndex,
  onBack,
  onQuiz,
  onNextLesson,
}: {
  moduleId: string;
  lessonIndex: number;
  onBack: () => void;
  onQuiz: () => void;
  onNextLesson: (moduleId: string, lessonIndex: number) => void;
}) {
  const mod = CURRICULUM.find((m) => m.id === moduleId)!;
  const lesson = mod.lessons[lessonIndex];
  const mentor = getMentorById(lesson.mentorId);

  // Determine next lesson
  const hasNextInModule = lessonIndex < mod.lessons.length - 1;
  const nextModuleIndex = CURRICULUM.indexOf(mod) + 1;
  const hasNextModule = nextModuleIndex < CURRICULUM.length;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-foreground/50 mb-6">
        <button onClick={onBack} className="hover:text-copper transition-colors">
          Curriculum
        </button>
        <span>/</span>
        <span>{mod.title}</span>
        <span>/</span>
        <span className="text-foreground/80">{lesson.title}</span>
      </div>

      {/* Mentor badge */}
      {mentor && (
        <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-surface-light border border-border inline-flex">
          <span className="text-lg">{mentor.emoji}</span>
          <span className="text-sm">
            <span className="text-foreground/50">Guided by</span>{" "}
            <span className="text-copper font-medium">{mentor.name}</span>
            <span className="text-foreground/40"> — {mentor.title}</span>
          </span>
        </div>
      )}

      {/* Lesson content (rendered from markdown-ish string) */}
      <article className="prose-tastebud">
        <MarkdownContent content={lesson.content} />
      </article>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap gap-3 border-t border-border pt-6">
        <button
          onClick={onQuiz}
          className="rounded-full bg-copper px-6 py-2.5 text-sm font-medium text-background hover:bg-copper-light transition-colors"
        >
          Take Quiz ({lesson.quiz.length} questions)
        </button>
        {hasNextInModule && (
          <button
            onClick={() => onNextLesson(moduleId, lessonIndex + 1)}
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground/70 hover:text-copper hover:border-copper transition-colors"
          >
            Next Lesson &rarr;
          </button>
        )}
        {!hasNextInModule && hasNextModule && (
          <button
            onClick={() => onNextLesson(CURRICULUM[nextModuleIndex].id, 0)}
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground/70 hover:text-copper hover:border-copper transition-colors"
          >
            Next Module: {CURRICULUM[nextModuleIndex].title} &rarr;
          </button>
        )}
        <button
          onClick={onBack}
          className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground/40 hover:text-foreground/70 transition-colors"
        >
          Back to Modules
        </button>
      </div>
    </div>
  );
}

/* ── Quiz runner ────────────────────────────────────────────── */

function QuizRunner({
  moduleId,
  lessonIndex,
  onBack,
  onComplete,
}: {
  moduleId: string;
  lessonIndex: number;
  onBack: () => void;
  onComplete: () => void;
}) {
  const mod = CURRICULUM.find((m) => m.id === moduleId)!;
  const lesson = mod.lessons[lessonIndex];
  const questions = lesson.quiz;

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  function handleAnswer() {
    if (selectedOption === null) return;
    setAnswered(true);
    if (selectedOption === q.correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  }

  if (finished) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">{score === questions.length ? "🎉" : score >= questions.length / 2 ? "👏" : "📚"}</div>
        <h2 className="text-2xl font-bold mb-2">
          {score}/{questions.length} Correct
        </h2>
        <p className="text-foreground/50 mb-8 max-w-md mx-auto">
          {score === questions.length
            ? "Perfect score! You've mastered this lesson."
            : score >= questions.length / 2
              ? "Good work! Review the lesson to strengthen the concepts you missed."
              : "Keep studying — revisit the lesson and try again."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onBack}
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground/70 hover:text-copper transition-colors"
          >
            Review Lesson
          </button>
          <button
            onClick={onComplete}
            className="rounded-full bg-copper px-6 py-2.5 text-sm font-medium text-background hover:bg-copper-light transition-colors"
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-sm text-foreground/50 hover:text-copper transition-colors">
          &larr; Back to Lesson
        </button>
        <span className="text-sm text-foreground/40">
          Question {currentQ + 1} of {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-border rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-copper rounded-full transition-all duration-300"
          style={{ width: `${((currentQ + (answered ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h2 className="text-xl font-semibold mb-6">{q.question}</h2>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {q.options.map((option, oi) => {
          let style = "border-border text-foreground/70 hover:border-copper/50 hover:text-foreground";
          if (answered) {
            if (oi === q.correctIndex) {
              style = "border-green-600 bg-green-600/10 text-green-400";
            } else if (oi === selectedOption && oi !== q.correctIndex) {
              style = "border-red-500/60 bg-red-500/10 text-red-400";
            } else {
              style = "border-border/50 text-foreground/30";
            }
          } else if (oi === selectedOption) {
            style = "border-copper bg-copper/10 text-copper";
          }

          return (
            <button
              key={oi}
              onClick={() => !answered && setSelectedOption(oi)}
              disabled={answered}
              className={`w-full text-left rounded-lg border px-5 py-3.5 text-sm transition-colors ${style}`}
            >
              <span className="font-medium mr-2 opacity-50">{String.fromCharCode(65 + oi)}.</span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation (after answering) */}
      {answered && (
        <div className="rounded-lg bg-surface-light border border-border px-5 py-4 mb-8">
          <p className="text-sm text-foreground/70">{q.explanation}</p>
        </div>
      )}

      {/* Action button */}
      {!answered ? (
        <button
          onClick={handleAnswer}
          disabled={selectedOption === null}
          className="rounded-full bg-copper px-8 py-2.5 text-sm font-medium text-background hover:bg-copper-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={handleNext}
          className="rounded-full bg-copper px-8 py-2.5 text-sm font-medium text-background hover:bg-copper-light transition-colors"
        >
          {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
        </button>
      )}
    </div>
  );
}

/* ── Challenge overview ─────────────────────────────────────── */

function ChallengeOverview({
  onSelect,
}: {
  onSelect: (type: ChallengeType, index: number) => void;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-foreground/50 mb-6">
        25 challenges across 5 types — test your flavor knowledge with real-world scenarios.
      </p>
      {CHALLENGE_TYPES.map((ct) => {
        const challenges = getChallengesByType(ct.type);
        return (
          <div
            key={ct.type}
            className="rounded-xl border border-border bg-surface overflow-hidden"
          >
            <div className="px-6 py-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{ct.icon}</span>
                <h3 className="text-lg font-semibold">{ct.title}</h3>
              </div>
              <p className="text-sm text-foreground/50 mb-4">{ct.description}</p>
              <div className="flex flex-wrap gap-2">
                {challenges.map((ch, ci) => (
                  <button
                    key={ch.id}
                    onClick={() => onSelect(ct.type, ci)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground/60 hover:text-copper hover:border-copper transition-colors"
                  >
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${
                        ch.difficulty === "easy"
                          ? "bg-green-500"
                          : ch.difficulty === "medium"
                            ? "bg-amber"
                            : "bg-red-500"
                      }`}
                    />
                    {ch.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Challenge runner ───────────────────────────────────────── */

function ChallengeRunner({
  challengeType,
  challengeIndex,
  onBack,
  onNext,
}: {
  challengeType: ChallengeType;
  challengeIndex: number;
  onBack: () => void;
  onNext: (type: ChallengeType, index: number) => void;
}) {
  const challenges = getChallengesByType(challengeType);
  const ch = challenges[challengeIndex];
  const typeInfo = CHALLENGE_TYPES.find((t) => t.type === challengeType)!;

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const hasNext = challengeIndex < challenges.length - 1;

  function handleReveal() {
    setRevealed(true);
  }

  function handleNext() {
    if (hasNext) {
      setSelectedAnswer(null);
      setRevealed(false);
      onNext(challengeType, challengeIndex + 1);
    } else {
      onBack();
    }
  }

  // Determine if this challenge has selectable options
  const isMultipleChoice =
    ch.type === "mystery-basket" ||
    ch.type === "speed-pairing" ||
    ch.type === "substitution-sprint";

  const mcOptions =
    ch.type === "mystery-basket"
      ? ["Sweet", "Salty", "Sour", "Bitter", "Umami", "Spicy"]
      : ch.data;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="text-sm text-foreground/50 hover:text-copper transition-colors">
          &larr; All Challenges
        </button>
        <span className="text-sm text-foreground/40">
          {typeInfo.icon} {typeInfo.title} — {challengeIndex + 1}/{challenges.length}
        </span>
      </div>

      {/* Challenge card */}
      <div className="rounded-xl border border-border bg-surface p-6 md:p-8 mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs font-medium uppercase tracking-wider ${
              ch.difficulty === "easy"
                ? "text-green-400"
                : ch.difficulty === "medium"
                  ? "text-amber"
                  : "text-red-400"
            }`}
          >
            {ch.difficulty}
          </span>
        </div>
        <h2 className="text-xl font-bold mb-4">{ch.title}</h2>
        <p className="text-foreground/70 mb-6">{ch.prompt}</p>

        {/* Ingredients / data display */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(ch.type === "mystery-basket" || ch.type === "flavor-fix"
            ? ch.data
            : ch.type === "cuisine-translator"
              ? ch.data
              : []
          ).map((item, i) => (
            <span
              key={i}
              className="rounded-full bg-surface-light border border-border px-4 py-1.5 text-sm text-foreground/80"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Answer selection */}
        {isMultipleChoice && (
          <div className="space-y-2 mb-6">
            {mcOptions.map((opt) => {
              let style = "border-border text-foreground/70 hover:border-copper/50";
              if (revealed) {
                if (opt === ch.correctAnswer) {
                  style = "border-green-600 bg-green-600/10 text-green-400";
                } else if (opt === selectedAnswer && opt !== ch.correctAnswer) {
                  style = "border-red-500/60 bg-red-500/10 text-red-400";
                } else {
                  style = "border-border/50 text-foreground/30";
                }
              } else if (opt === selectedAnswer) {
                style = "border-copper bg-copper/10 text-copper";
              }
              return (
                <button
                  key={opt}
                  onClick={() => !revealed && setSelectedAnswer(opt)}
                  disabled={revealed}
                  className={`w-full text-left rounded-lg border px-5 py-3 text-sm transition-colors ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {/* For non-MC challenges, show a reveal button */}
        {!isMultipleChoice && !revealed && (
          <div className="mb-6">
            <p className="text-sm text-foreground/40 mb-3 italic">
              Think about your answer, then reveal the solution.
            </p>
          </div>
        )}

        {/* Reveal / result */}
        {!revealed ? (
          <button
            onClick={handleReveal}
            disabled={isMultipleChoice && selectedAnswer === null}
            className="rounded-full bg-copper px-6 py-2.5 text-sm font-medium text-background hover:bg-copper-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isMultipleChoice ? "Check Answer" : "Reveal Answer"}
          </button>
        ) : (
          <div>
            <div className="rounded-lg bg-surface-light border border-border px-5 py-4 mb-6">
              <p className="text-sm font-medium text-copper mb-1">
                Answer: {ch.correctAnswer}
              </p>
              <p className="text-sm text-foreground/60">{ch.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="rounded-full bg-copper px-6 py-2.5 text-sm font-medium text-background hover:bg-copper-light transition-colors"
            >
              {hasNext ? "Next Challenge" : "Back to Challenges"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Simple markdown renderer ───────────────────────────────── */

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-2xl font-bold mb-4 mt-8 first:mt-0">
          {line.slice(2)}
        </h1>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-semibold mb-3 mt-8 text-copper">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold mb-2 mt-6">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Table
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(<MarkdownTable key={`table-${i}`} lines={tableLines} />);
      continue;
    }

    // List items
    if (line.trimStart().startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
        listItems.push(lines[i].trimStart().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-1.5 mb-4 ml-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-sm text-foreground/70 flex gap-2">
              <span className="text-copper/50 mt-0.5">&#8226;</span>
              <span><InlineMarkdown text={item} /></span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line.trimStart())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
        listItems.push(lines[i].trimStart().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-1.5 mb-4 ml-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-sm text-foreground/70 flex gap-2">
              <span className="text-copper/50 font-medium min-w-[1.25rem]">{idx + 1}.</span>
              <span><InlineMarkdown text={item} /></span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={i} className="text-sm text-foreground/70 mb-4 leading-relaxed">
        <InlineMarkdown text={line} />
      </p>
    );
    i++;
  }

  return <div>{elements}</div>;
}

function InlineMarkdown({ text }: { text: string }) {
  // Handle **bold** and *italic* inline
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground/90">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={i} className="italic text-foreground/60">
              {part.slice(1, -1)}
            </em>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function MarkdownTable({ lines }: { lines: string[] }) {
  const parseRow = (line: string) =>
    line.split("|").filter((_, i, arr) => i > 0 && i < arr.length - 1).map((cell) => cell.trim());

  const headers = parseRow(lines[0]);
  // Skip separator line (line[1])
  const rows = lines.slice(2).map(parseRow);

  return (
    <div className="overflow-x-auto mb-6 mt-2">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-3 py-2 text-foreground/60 font-medium border-b border-border text-xs uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/50">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-foreground/70">
                  <InlineMarkdown text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
