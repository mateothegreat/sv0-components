<script lang="ts">
  import { Demo } from "@sv0/components/demos";
  import { Quiz, type Types } from "@sv0/components/interactives/quiz";
  import { QuestionType } from "@sv0/components/interactives/quiz/types";

  const config: Types.ConfigProps = {
    title: "Sample Quiz",
    description: "Test your knowledge with this sample quiz.",
    grade: {
      min: 75,
      max: 100,
      attempts: 3
    },
    timer: {
      limit: 60
    },
    navigation: {
      previous: true
    },
    questions: [
      {
        title: "What is the capital of Texas?",
        description: "Select the correct city that serves as the capital of Texas.",
        hint: "It's not the most populous city, but it's known for its live music scene.",
        type: QuestionType.SingleChoice,
        explanation: "The capital of Texas is Austin, which is also known for its vibrant culture.",
        options: [
          {
            value: "Austin",
            correct: true,
            explanations: {
              correct: "Correct! Austin is the capital of Texas.",
              incorrect: "Austin is actually the correct answer. It is the capital city of Texas."
            }
          },
          {
            value: "Houston",
            explanations: {
              incorrect: "Incorrect. Houston is the largest city in Texas, but not the capital."
            }
          },
          {
            value: "Dallas",
            explanations: {
              incorrect: "Incorrect. Dallas is a major city in Texas, but it is not the capital."
            }
          },
          {
            value: "San Antonio",
            explanations: {
              incorrect:
                "Incorrect. San Antonio is known for the Alamo, but it is not the capital of Texas."
            }
          }
        ]
      },
      {
        id: "q1",
        title: "Which of these are real fruits?",
        description: "Select all that are actual fruits. One is a vegetable, one is a prank.",
        hint: "If you pick 'Spaghetti Code', you might be hungry, but not correct.",
        type: QuestionType.MultipleChoice,
        explanation:
          "Tomato and Banana are both fruits, even if your salad disagrees. Broccoli is a vegetable, and Spaghetti Code is only found in legacy projects.",
        options: [
          {
            value: "Tomato",
            correct: true,
            explanations: {
              correct: "Tomato is a fruit, even if it causes arguments at dinner.",
              incorrect: "Actually, tomato is a fruit. Yes, really. Science says so.",
              missed: "You missed Tomato. It's a fruit, not just a pizza topping."
            }
          },
          {
            value: "Banana",
            correct: true,
            explanations: {
              correct: "Banana is a fruit and also a classic for comedy slips.",
              incorrect: "Banana is a fruit. If you slipped on this one, don't worry, it happens.",
              missed: "You missed Banana. It's a fruit, and a staple in fruit salads."
            }
          },
          {
            value: "Broccoli",
            explanations: {
              correct: "Broccoli is not a fruit; it's a vegetable.",
              incorrect: "Nope! Broccoli is a vegetable. But nice try eating healthy.",
              missed:
                "You missed Broccoli. That's okay—it's not a fruit, so you didn't need to pick it."
            }
          },
          {
            value: "Spaghetti Code",
            explanations: {
              correct:
                "Spaghetti Code is not a fruit. It's a term for messy code, not something you eat.",
              incorrect:
                "Spaghetti Code is not a fruit, but it can make you cry like chopping onions.",
              missed:
                "You missed Spaghetti Code. That's good—it's not a fruit, just a developer's nightmare."
            }
          }
        ]
      }
    ]
  };
</script>

<Demo.Root title="Quiz" description="A quiz component.">
  <Demo.Section title="Default" description="A default quiz component." class="p-3">
    <div>
      <Quiz.Root {config}>
        <Quiz.Header title="Quiz Demo Title" description="Quiz Demo Description" />
        <Quiz.Question question={0} />
        <Quiz.Results />
        <Quiz.Evaluator />
        <Quiz.Controls
          previous="Previous Question"
          next="Next Question"
          submit="Submit Answer"
          complete="Complete Quiz"
          class="" />
      </Quiz.Root>
    </div>
  </Demo.Section>
</Demo.Root>
