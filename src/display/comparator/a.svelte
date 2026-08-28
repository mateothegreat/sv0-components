<script lang="ts">
  import { Comparator, createComparator, type Types } from "@sv0/components/display/comparator";

  const context = createComparator({
    header: {
      class: "font-bold text-emerald-500 underline",
      sticky: true,
      value: "Features",
      renderer: header,
      cells: [
        {
          id: "starter-package",
          value: "Starter Package"
        },
        {
          id: "pro-package",
          value: "Pro Package"
        },
        {
          id: "unlimited-package",
          value: "Unlimited Package"
        }
      ]
    },
    sections: [
      {
        // id is optional, useful for drilling down with click events trigger.
        id: "platform",
        // Clicking will collapse (hide) this section and it's rows (can be expanded later as well).
        collapsible: true,
        // Section headers are just a special row and will span the entire row unless columns are provided.
        header: {
          // Think the left side of the row like a heading but for this section.
          value: "Platform - Core features that enable seamless operations.",
          // Header columns are optional and if not provided will be empty.
          cells: [
            {
              // Plaintext value to render if no `render` snippet/component is passed in.
              value: "😭"
            },
            {
              value: "🤷‍♂️"
            },
            {
              value: "💪"
            }
          ]
        },
        // Rows are rendered below the header (if provided) and consist of cells.
        rows: [
          {
            // id is optional, useful for drilling down with click events trigger.
            id: "ad-free",
            // Think the left side of the row like a heading but for this section.
            value: "Ad-free Experience",
            renderer: fancyifyLabel,
            // Individual columns (after the left "label" column if present).
            cells: [
              {
                // type: CellType.ROW, // Not required, will be row if not specificed automatically.
                value: 0
              },
              {
                value: 10,
                renderer: cellRenderDiscounted
              },
              {
                value: "Unlimited"
              }
            ]
          }
        ]
      }
    ],
    footer: {
      class: "bg-gray-300",
      sticky: true,
      // Optional, will be the left most column otherwise empty.
      // label: "Ready to act?"
      rows: [
        {
          // id is optional, useful for drilling down with click events trigger.
          id: "footer-foo-row",
          // Think the left side of the row like a heading but for this section.
          value: "Act now!",
          // Individual columns (after the left "label" column if present).
          cells: [
            {
              renderer: footerButton
            },
            {
              renderer: footerButton
            },
            {
              renderer: footerButton
            }
          ]
        }
      ]
    }
  });
</script>

{#snippet header(context: Types.HeaderContext)}
  <p class="text-lg text-green-500">
    {context.this.value}
  </p>
{/snippet}

{#snippet fancyifyLabel(context: Types.RowContext)}
  <p class="text-lg text-green-500">
    Awesome Feature for
    {#if context.this.id === "ad-free"}
      Mo money for you! 🤑
    {/if}
  </p>
  {context.this.value}
{/snippet}

{#snippet cellRenderDiscounted(context: Types.CellContext)}
  <p class="text-lg text-green-500">
    {#if context.row.id === "packageType" && localStorage.get("user-type") === "special"}
      {context.this.value}
      <span class="text-pink-500 underline"> 50% discount! </span>
    {/if}

    {context.this.value}
  </p>
{/snippet}
{#snippet footerButton(context: Types.CellContext)}
  <!-- Example: three different CTAs per cell id -->
  {#if context.this.id === "starter-package"}
    <button
      onclick={(ev) =>
        context.row.cells?.[0]?.onclick?.({
          scope: "cell",
          event: ev,
          this: context.this
        })}
      class="rounded-md border-2 border-blue-500 bg-transparent p-2 text-gray-500">
      Get Started
    </button>
  {:else if context.this.id === "pro-package"}
    <button
      onclick={(ev) =>
        context.row.cells?.[1]?.onclick?.({
          scope: "cell",
          event: ev,
          this: context.this
        })}
      class="rounded-md border-2 border-blue-500 bg-blue-400 p-2 text-white">
      Get Pro
    </button>
  {:else if context.this.id === "unlimited-package"}
    <button
      onclick={(ev) =>
        context.row.cells?.[2]?.onclick?.({
          scope: "cell",
          event: ev,
          this: context.this
        })}
      class="rounded-md border-2 border-pink-500 bg-pink-400 p-2 text-white">
      Contact Us
    </button>
  {/if}
{/snippet}

<Comparator.Root {context} size={Size.LARGE} onclick={clickHandler} />
