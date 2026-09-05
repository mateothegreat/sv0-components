<script lang="ts">
  import Plus from "~icons/lucide/plus";
  import { Demo } from "@sv0/components/demos";
  import { Button } from ".";
</script>

<Demo.Root title="Button" description="A button component.">
  <Demo.Section
    title="Small Variant"
    description="Tiny but mighty."
    variants={[
      { name: "size", value: "sm" },
      { name: "intent", value: ["default", "secondary", "destructive", "outline", "ghost", "link"] }
    ]}>
    <div class="flex items-center gap-4">
      <Button size="sm">Default</Button>
      <Button size="sm" intent="secondary">Secondary</Button>
      <Button size="sm" intent="destructive">Destructive</Button>
      <Button size="sm" intent="outline">Outline</Button>
      <Button size="sm" intent="ghost">Ghost</Button>
      <Button size="sm" intent="link">Link</Button>
    </div>
  </Demo.Section>
  <Demo.Section
    title="Default Variant"
    description="Just right. Not too big, not too small."
    variants={[
      { name: "size", value: "default" },
      { name: "intent", value: ["default", "secondary", "destructive", "outline", "ghost", "link"] }
    ]}>
    <div class="flex items-center gap-4">
      <Button>Default</Button>
      <Button size="default" intent="secondary">Secondary</Button>
      <Button size="default" intent="destructive">Destructive</Button>
      <Button size="default" intent="outline">Outline</Button>
      <Button size="default" intent="ghost">Ghost</Button>
      <Button size="default" intent="link">Link</Button>
    </div>
  </Demo.Section>
  <Demo.Section
    title="Large Variant"
    description="For when you need to make a statement."
    variants={[
      { name: "size", value: "lg" },
      { name: "intent", value: ["default", "secondary", "destructive", "outline", "ghost", "link"] }
    ]}>
    <div class="flex items-center gap-4">
      <Button size="lg">Default</Button>
      <Button size="lg" intent="secondary" focus="accessible">Secondary</Button>
      <Button size="lg" intent="destructive">Destructive</Button>
      <Button size="lg" intent="outline">Outline</Button>
      <Button size="lg" intent="ghost">Ghost</Button>
      <Button size="lg" intent="link">Link</Button>
    </div>
  </Demo.Section>
  <Demo.Section
    title="Icon Variant"
    description="Icon-only buttons for compact interfaces."
    variants={[
      { name: "size", value: "icon" },
      { name: "intent", value: ["default", "secondary", "destructive", "outline", "ghost", "link"] }
    ]}>
    <div class="flex items-center gap-4">
      <Button size="icon"><Plus /></Button>
      <Button size="icon" intent="secondary"><Plus /></Button>
      <Button size="icon" intent="destructive"><Plus /></Button>
      <Button size="icon" intent="outline"><Plus /></Button>
      <Button size="icon" intent="ghost"><Plus /></Button>
      <Button size="icon" intent="link"><Plus /></Button>
    </div>
  </Demo.Section>
  <!-- Effects -->
  <div class="flex flex-wrap gap-5">
    <Demo.Section
      title="Press Effect"
      description="Triggered on interaction causing the button to press."
      class="flex w-90 justify-center p-5"
      variants={[
        { name: "intent", value: "default" },
        { name: "effect", value: "press" }
      ]}>
      <Button
        effect="press"
        intent="default"
        onclick={(e) => {
          /**
           * Wait for press animation to complete (100ms based on animations.css).
           * (This is only for the demo purposes so you can continuously click the button.)
           */
          setTimeout(() => {
            (e.target as HTMLElement).blur();
          }, 100);
        }}>Press</Button>
    </Demo.Section>
    <Demo.Section
      title="Ripple Effect"
      description="Triggered on interaction causing the button to ripple."
      class="flex w-90 justify-center p-5"
      variants={[
        { name: "intent", value: "secondary" },
        { name: "effect", value: "ripple" }
      ]}>
      <Button
        effect="ripple"
        intent="secondary"
        onclick={(e) => {
          /**
           * Wait for ripple animation to complete (700ms based on animations.css).
           * (This is only for the demo purposes so you can continuously click the button.)
           */
          setTimeout(() => {
            (e.target as HTMLElement).blur();
          }, 700);
        }}>Ripple</Button>
    </Demo.Section>
    <Demo.Section
      title="Shake Effect"
      description="Triggered on interaction causing the button to shake."
      class="flex w-90 justify-center p-5"
      variants={[
        { name: "intent", value: "default" },
        { name: "effect", value: "shake" }
      ]}>
      <Button
        effect="shake"
        intent="destructive"
        onclick={(e) => {
          /**
           * Wait for shake animation to complete (400ms based on animations.css).
           * (This is only for the demo purposes so you can continuously click the button.)
           */
          setTimeout(() => {
            (e.target as HTMLElement).blur();
          }, 400);
        }}>Shake</Button>
    </Demo.Section>
    <Demo.Section
      title="Bounce Effect"
      description="Triggered on interaction causing the button to bounce."
      class="flex w-90 justify-center p-5"
      variants={[
        { name: "intent", value: "outline" },
        { name: "effect", value: "ripple" }
      ]}>
      <Button
        effect="bounce"
        intent="outline"
        onclick={(e) => {
          /**
           * Wait for bounce animation to complete (500ms based on animations.css).
           * (This is only for the demo purposes so you can continuously click the button.)
           */
          setTimeout(() => {
            (e.target as HTMLElement).blur();
          }, 500);
        }}>Bounce</Button>
    </Demo.Section>
    <Demo.Section
      title="Wobble Effect"
      description="Triggered on interaction causing the button to wobble."
      class="flex w-90 justify-center p-5"
      variants={[
        { name: "intent", value: "link" },
        { name: "effect", value: "ripple" }
      ]}>
      <Button
        effect="wobble"
        intent="link"
        onclick={(e) => {
          /**
           * Wait for wobble animation to complete (800ms based on animations.css).
           * (This is only for the demo purposes so you can continuously click the button.)
           */
          setTimeout(() => {
            (e.target as HTMLElement).blur();
          }, 800);
        }}>Wobble</Button>
    </Demo.Section>
  </div>
</Demo.Root>
