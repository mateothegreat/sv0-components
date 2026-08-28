<script lang="ts">
  import { Stepper, type Step } from ".";

  const steps: Step[] = [
    {
      id: 1,
      title: "Step 1",
      subtitle: "Getting started",
      description: ["This is the first step", "Learn the basics"]
    },
    {
      id: 2,
      title: "Step 2",
      subtitle: "Intermediate level", 
      description: ["Build on your knowledge", "Practice advanced concepts"]
    },
    {
      id: 3,
      title: "Step 3",
      subtitle: "Expert level",
      description: ["Master the topic", "Apply everything you learned"]
    }
  ];
</script>

<Stepper.Root {steps}>
  <div class="grid items-center gap-8 lg:grid-cols-[1fr_2fr]">
    <Stepper.Navigation />
    
    <div class="relative">
      <Stepper.Content />
      <Stepper.Controls />
    </div>
  </div>
  
  <Stepper.Indicators />
</Stepper.Root>
