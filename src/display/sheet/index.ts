import { Dialog as SheetPrimitive } from "bits-ui";
import Close from "./sheet-close.svelte";
import Content from "./sheet-content.svelte";
import Description from "./sheet-description.svelte";
import Footer from "./sheet-footer.svelte";
import Header from "./sheet-header.svelte";
import Overlay from "./sheet-overlay.svelte";
import Title from "./sheet-title.svelte";
import Trigger from "./sheet-trigger.svelte";

const Root = SheetPrimitive.Root;
const Portal = SheetPrimitive.Portal;

export const Sheet = {
  Root,
  Close,
  Trigger,
  Portal,
  Overlay,
  Content,
  Header,
  Footer,
  Title,
  Description
};
