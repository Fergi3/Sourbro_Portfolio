# Sourbro Changelog

## UI cleanup and mascot personalization phase

This phase addresses class feedback and issues found while using the app. Bootstrap and Vue remain the app's UI tools.

### 1. Personalize starters and loaves with "Mascots" 10/13/2026

- Added a shared `MascotPicker` component for choosing starter and loaf illustrations.
- Added mascot selection to both Add Starter and Edit Starter, with a preview and a text-style Change mascot action beneath the image.
- Added Cancel and Use This Mascot actions. Cancel restores the previous mascot choice and returns to the containing form.
- Placed the loaf preview and mascot action inside the planner's batch summary, alongside the recipe information and loaf quantity.
- Included the selected image in starter records and carried loaf images from planning into Active, History, and Bake Again.

**Why:** Give users ownership of their starters and batches while keeping the selection flow consistent.

### 2. Make the active baking workflow easier to follow 10/13/2026 - 10/14/2026

- Combined the duplicate progress displays into one progress-filled status pill in the accordion heading.
- Used a fern-colored fill and stronger walnut text. Showed the current step count instead of a separate percentage label.
- Grouped loaf quantity, current step, and Up next in the accordion heading. Removed the visible Started and Next check details to reduce clutter.
- Gave the expanded current-step instructions more room.
- Rewrote all seven steps with detailed, numbered directions based on my hands-on sourdough experience, including visual cues, stretch-and-fold technique, shaping, proofing, baking, cooling, and storage.
- Clarified the completion flow with Finish Bake, Completed Bake, and Save to History labels.

**Why:** Help users understand where they are, what to do now, and what comes next. Also simplifying labels for buttons helps clean up Mobile view. 

### 3. Simplify and standardize forms 10/15/2026

- Replaced free-text fermentation and proofing fields with a reusable `DurationControl` dropdown.
- Used whole hours, with bulk fermentation limited to 1–8 hours and cold proof to 1–48 hours. Included a Not recorded option.
- Put bulk fermentation and cold proof on separate rows in both completion and history editing forms.
- Removed editable hydration from the history form while retaining the recorded value.
- Simplified the loaf quantity control to minus, a read-only count, and plus.
- Moved Delete Starter and Delete Bake into separate areas within their forms. Kept Cancel and Save Changes spaced apart in the footer. This helped with proximity spacing for mobile.

**Why:** Reduce redundant controls, make units clear, and improve consistency on smaller screens.

### 4. Create UI components for the page layout consistency 10/15/2026

- Extracted repeated navigation into `AppNavbar`, with page-aware links and active states.
- Extracted the footer and Learn About Sourdough content into `AppFooter`.
- Reduced navigation and footer bulk, used compact pill-shaped navigation links, and removed the footer logo and tagline.
- Removed the static temperature display.
- Used Your Starter and Your Loaves as page headings, with Plan, Active, and History tabs on the bake page.
- Made the selected recipe name the batch summary heading instead of repeating Your bake.
- Added an explanatory planner placeholder before recipe selection.
- Refined spacing, responsive columns, and existing SCSS rules throughout the affected layouts.

**Why:** Reduce repeated markup and make page structure clearer across desktop and mobile.

### 5. Interaction and layout bugs 10/16/2026

- Kept the mascot's selected background and outline visible immediately after clicking, including while hovering or focusing the selected card.
- Corrected the first step's Complete Step placement when Back a step is absent.
- Adjusted active-step action sizing and spacing to prevent inconsistent mobile stacking and oversized completion buttons.
- Corrected the Add Starter image handoff so the selected mascot reaches the new starter record.
- Addressed the bake page's mobile background inconsistency.

**Why:** Make selections, saved records, and action placement behave predictably.

## Deferred work (WIP) and known limitations 10/16/2026

- Local storage is not implemented. User changes are held in memory and are lost when the app reloads or navigation loads the other HTML page.
- Baking conversions were removed from the active interface; an unused prototype component remains in the source.
- Feeding reminders remain a UI placeholder without scheduling timer behavior.
- Some sample history records still contain minutes, while the new duration selector displays whole hours.
- Rich emphasis within step directions and alternate instructions for baking without a Dutch oven remain future work.

## Continued improvements and cleanup 10/17/2026

**Mascots and personalization**

- Added mascot editing to Bake History to match the other form modals.
- Made the mascot images clickable in the forms and planner. Clicking the starter mascot on the dashboard now opens the picker as well.
- Made the starter mascot visible on mobile.
- Moved the starter and loaf mascot choices into one shared file, `js/data/mascots.js`, so the same lists are used across the forms.
- Added `aria-pressed` to the mascot buttons so screen readers can identify the selected mascot.

**Baking steps and ingredients**

- Broke Stretch & Folds, Shape, Bake, and Cool into smaller accordion sections to make the instructions easier to follow.
- Used the Mental Notes ideas of Chunking and Sequencing to break up longer instructions without removing the baking details.
- Changed Ingredients for this batch to Ingredients for this step. Mix shows the base ingredients, Shape shows selected add-ins, and the other steps hide the ingredient list.
- Added directions for adding ingredients before the first shaping, including reminders about overloading and tearing the dough.
- Moved the forgotten-salt reminder into Prepare for Stretch & Folds so users read it before starting.
- Added an `isAddIn` flag so custom add-ins are placed in the right step, even if their names match a base ingredient. Kept that information when saving to History.

**Navigation and save feedback**

- Added the NoMoreBread image and a Plan a bake action to the empty Active and History views.
- Added a bread-shaped toast with a small pop-up animation to confirm starter edits, feeding logs, completed bakes, and history edits.
- Updated the navbar logo to include the starter, loaf, wheat, and Sourbro name in a more compact image.
- Centered the Start and Bake links on desktop and improved the spacing in the mobile menu.
- Added `v-cloak` to prevent Vue syntax from briefly showing before the app loads. Added a short fade-in to make switching pages feel smoother.

## Continued improvements and cleanup 10/18/2026

**Forms and accessibility**

- Prevented an empty Bake Date from saving Invalid Date to History.
- Connected the footer Save buttons to the Add Starter, Edit Starter, Feed Starter, and Edit Bake forms so Enter can submit them without reloading the page.
- Connected the planner summary to its recipe heading for screen readers.
- Combined the reduced-motion rules so the page fade and toast animation respect the user's device settings in one place.

**Code cleanup and readability**

- Combined the duplicate loaf thumbnail rules and removed styling already handled by Bootstrap.
- Removed unused mascot, countdown, heading, footer, and star-rating styles, along with unnecessary repeated declarations.
- Fixed the mobile border rules so the vertical dividers disappear when the details stack.
- Removed the unused `activePage` state from app.js and the unused `basePath` prop from AppFooter.
- Corrected the DurationControl comment to say whole hours instead of hours and minutes.
- Moved the unfinished conversion component into `js/wip`.
- Reformatted index.html and bake.html and added short section comments to make the pages easier to navigate and maintain.
- Added section comments to the ActiveLoafItem template. Skipped the remaining JavaScript formatting and comments for now.

**Why:** Make the app easier to follow and maintain by improving feedback, showing content when it is needed, and cleaning up existing code instead of adding more.

## Validation and Bake Again improvements 10/20/2026

### Custom recipe validation

- Added validation for manually entered ingredient amounts.
- Starter, water, and flour must be valid numbers of at least 1 gram. Salt can be 0 grams or more.
- Added red field outlines and helpful messages for invalid amounts.
- Prevented saving a recipe or starting a bake with invalid amounts.

**Why:** Help users correct their amounts before saving or starting a bake. Incrementer handles this, however this is for users that might tab and manually enter.

### Bake Again and history details

- Updated Bake Again to restore the saved ingredient amounts, add-ins, loaf count, and mascot.
- Converted saved batch amounts back to amounts per loaf for the planner.
- Used custom recipe amounts when the original recipe was changed or deleted.
- Reused matching add-ins instead of creating duplicates.
- Split the restoration code into smaller methods to make it easier to read and maintain.
- Added the recorded loaf count to bake history headings.

**Why:** Make Bake Again recreate the saved batch and make history details easier to review.

### Bulk fermentation wording

- Changed the duration label to Bulk fermentation after folds in the completion and history editing forms.
- Added helper text explaining that users should record the time from the last stretch-and-fold round until shaping.
- Kept the 8-hour maximum.

**Why:** Make it clear which part of the process users are recording.

### Keep user changes between visits

- Added local storage for starters, recipes, custom add-ins, active loaves, and bake history.
- Saved ID counters so new records continue using unique IDs after refreshing.
- Restored saved data when refreshing or switching between Start and Bake.
- Kept temporary modal drafts out of storage.
- Added error handling so a storage problem does not stop the app.

**Why:** Let users keep their progress and make the full app flow easier to demonstrate. Data stays in the browser where it was saved.

### Organize SCSS

- Moved the shared colors into `_variables.scss`.
- Split styles into base, buttons, forms, layout, starter, bake, and toast files.
- Moved responsive rules alongside the styles they adjust.
- Kept `main.scss` as the entry point.
- Removed duplicate reduced-motion rules and outdated heading selectors.
- Removed spacing and borders that were no longer needed after the planner layout changed.

**Why:** Make styles easier to find, edit, and debug without adding unnecessary overrides.

### Separate application data

- Moved baking directions into `bakeSteps.js`.
- Moved recipe defaults into `recipes.js`.
- Moved suggested add-ins and their categories into `addIns.js`.
- Removed sample active loaves, sample history records, and the sample saved recipe.

**Why:** Shorten `app.js` and make room for records created through the actual app flow.

### Improve the planner layout

- Placed recipe selection above the bake overview and optional add-ins.
- Kept the recipe dropdown full width before and after selection.
- Positioned the overview on the left and Add-ins on the right for desktop.
- Placed Add-ins below the overview on mobile.
- Removed the repeated Your Bake placeholder.
- Hid the overview and Add-ins until a recipe is selected.
- Removed a redundant visibility condition.

**Why:** Keep the main recipe details together and improve the order of content on smaller screens.

### Keep editing behavior consistent

- Gave each recipe its own mascot choice and saved it with the recipe.
- Updated Manage Saved Recipe to match the other editing modals.
- Moved Delete Recipe into a separate area inside the modal.
- Kept Cancel and Save Changes spaced apart in the footer.
- Carried edited History names through Bake Again into the planner, confirmation modal, and new active bake.
- Kept the original saved recipe name unchanged when reusing a renamed bake.

**Why:** Make personalization and editing behave consistently throughout the app.


## References

- [Mental Notes — WCTC](https://bitlamp.wctc.edu/mental-notes/) — Ideas for grouping content, guiding users, and providing feedback.
- [Vue — Component Basics](https://vuejs.org/guide/essentials/component-basics.html) — Reusable components, props, events, and slots.
- [Vue — v-cloak](https://vuejs.org/api/built-in-directives.html#v-cloak) — Hiding unfinished Vue syntax while the app loads.
- [Vue — Watchers](https://vuejs.org/guide/essentials/watchers.html) — Watching for changes, including changes inside arrays and objects, to save updated data.
- [Vue — Lifecycle Hooks](https://vuejs.org/api/options-lifecycle.html#created) — Loading saved data when the app is created.
- [Bootstrap — Grid System](https://getbootstrap.com/docs/5.3/layout/grid/) — Organizing the planner into responsive rows and columns.
- [Bootstrap — Collapse](https://getbootstrap.com/docs/5.3/components/collapse/) — Showing and hiding grouped instructions and navigation.
- [Bootstrap — Modals](https://getbootstrap.com/docs/5.3/components/modal/) — Modal structure and opening and closing behavior.
- [Bootstrap — Toasts](https://getbootstrap.com/docs/5.3/components/toasts/) — Save confirmations and automatic dismissal.
- [MDN — localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — Saving data in the browser between visits.
- [MDN — JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) — Converting arrays and objects into text for storage and back into usable data.
- [MDN — JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) — Moving data into separate files and importing it into app.js.
- [MDN — aria-pressed](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-pressed) — Communicating mascot selections to screen readers.
- [MDN — prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) — Respecting the user's preference for less animation.
- [Sass — Style Rules](https://sass-lang.com/documentation/style-rules/) — Organizing and nesting SCSS selectors.
- [Sass — @use](https://sass-lang.com/documentation/at-rules/use/) — Sharing variables and loading styles from separate files.