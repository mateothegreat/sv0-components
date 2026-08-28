<script lang="ts">
  import { FAQ } from "@sv0/components/content/faq";
  import type { FAQItem } from "@sv0/components/content/faq/types";
  import { Demo } from "@sv0/components/demos";
  import { Slider } from "@sv0/components/forms/slider";
  import { Button } from "@sv0/components/interactives/buttons/button";

  const sampleFAQItems: FAQItem[] = [
    {
      id: "ai-model-development",
      question: "AI Model Development",
      answer:
        "# Generative AI Solutions\n\nCutting-edge generative AI applications for text, image, and code generation. Leverage the power of AI to automate content creation and enhance creative workflows.",
      defaultExpanded: false,
      images: ["", "", ""], // Empty strings to show placeholder images
      tags: ["Text Generation", "Image Synthesis", "Code Generation", "Creative AI"]
    },
    {
      id: "generative-ai-solutions",
      question: "Generative AI Solutions",
      answer:
        "# Advanced AI Integration\n\nComprehensive solutions for integrating AI capabilities into your existing systems and workflows. Our expertise covers machine learning model deployment, API integrations, and custom AI tool development.",
      defaultExpanded: true,
      images: ["", "", ""],
      tags: ["Machine Learning", "API Integration", "Custom Solutions", "Deployment"]
    },
    {
      id: "ai-integration-apis",
      question: "AI Integration & APIs",
      answer:
        "# Seamless Integration\n\nConnect AI capabilities to your applications through robust APIs and integration frameworks. We provide scalable solutions that grow with your business needs.",
      defaultExpanded: false,
      tags: ["REST APIs", "GraphQL", "Webhooks", "Real-time Processing"]
    },
    {
      id: "ai-analytics-insights",
      question: "AI Analytics & Insights",
      answer:
        "# Data-Driven Decisions\n\nTransform your data into actionable insights using advanced AI analytics. Our platform provides comprehensive reporting, predictive analytics, and business intelligence tools.",
      defaultExpanded: false,
      tags: ["Analytics", "Reporting", "Predictive Modeling", "Business Intelligence"]
    }
  ];
</script>

<Demo.Root title="FAQ" description="A FAQ component.">
  <Demo.Section
    title="Programmatic Demo"
    description="Programmatically create a FAQ component by passing an items array.">
    <Demo.Controls title="Demo Controller" description="A demo controller for the FAQ component.">
      <Slider steps={[0, 5, 10, 15]} class="w-35" />
      <Button variant="secondary" size="sm">Reset</Button>
    </Demo.Controls>
    <FAQ.Root items={sampleFAQItems} />
  </Demo.Section>
  <Demo.Section title="Declarative Demo" description="Declaratively create a FAQ component.">
    <FAQ.Root items={sampleFAQItems} />
  </Demo.Section>
</Demo.Root>
