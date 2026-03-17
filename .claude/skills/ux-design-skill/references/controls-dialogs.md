# Controls, Dialogs & Interaction Patterns Reference
## Source: About Face, 4th Ed. (Cooper et al.) — Chapter 21 + Chapters 15, 17

---

## Four Types of Controls

Every GUI control falls into one of four categories:

1. **Imperative controls**: Initiate a function (buttons, links, menu items)
2. **Selection controls**: Choose from valid options (checkboxes, radio buttons, dropdowns, lists)
3. **Entry controls**: Supply or set a value (text fields, sliders, spinners)
4. **Display controls**: Manage visual presentation of information (scrollbars, splitters)

---

## Imperative Controls

### Buttons

The quintessential imperative control. Click → action executes immediately.

**Flat design problem**: The raised 3D appearance historically signified pressability
(*visual pliancy*). Flat design removes this cue. The rounded-rectangle shape has enough
learned convention to survive without depth — but only because of decades of training.

**Dynamic visual hinting (pliant response)**: A button must visually change when pressed —
depressing, changing color, or both. Applications that don't animate button presses create
the question "Did that actually do anything?" Every button needs a pressed state.

**Default buttons**: In dialogs, the most likely user action should be pre-selected as the
default button (usually highlighted, activated by Enter key). The default button represents
the most common, sensible choice — not necessarily the most consequential one.

### Icon Buttons (Toolbar Buttons)

Half button, half icon. Evolved when buttons moved from dialogs to toolbars and labels gave
way to icons.

**The discoverability problem**: Icon clarity is often poor for first-time users. ToolTips
are essential — they provide just enough text to disambiguate without consuming permanent
pixels. Good icons are learned and remembered with repeated use by intermediates; they are
not immediately self-explanatory to beginners.

**Hover states**: Desktop icon buttons reveal their button affordance on mouseover (not
present in static state). On mobile — where hover doesn't exist — all interactive affordance
must be present in the static appearance.

### Hyperlinks

A web convention: blue underlined text, navigates to another location.

**The critical rule**: **Use links for navigation; use buttons for action.**

Users have deeply learned that clicking a link moves them somewhere. When a link triggers
an action (launching a dialog, executing a function), users are disoriented — they expected
to go somewhere, not do something. This confusion is a consistent usability failure.

**The button+link combo anti-pattern**: Showing a button for the default choice and a link
for the alternative (to save space) is effective for visual weight — but has been so
frequently used to manipulate users (making them "think" there's only one choice) that it
erodes trust. Use with extreme caution.

---

## Selection Controls

### Checkboxes

Binary selection (checked/unchecked) or multi-selection from a group.

**Shape convention**: Always square. Round checkboxes are confused with radio buttons.
The convention is arbitrary but universal — never deviate from it.

**When to prefer checkboxes**: Small groups of non-mutually-exclusive options. Text-based
labels that can precisely describe each option.

**The earmarking solution**: When a list has scrolling and multiple selection is needed,
standard list selection idiom fails (users forget what's selected off-screen, mutual
exclusion confusion). Solution: add checkboxes to each list item. Checkboxes are
unambiguously non-mutually-exclusive, visible in any scroll position.

### Toggle Buttons

An icon button that stays in its pressed state until clicked again. Replaces the checkbox
in toolbar contexts. Space-efficient; relies on icon recognition rather than text labels.
ToolTips compensate for icon opacity.

### State-Switching Buttons — An Idiom to Avoid

A button that shows the *current state* (e.g., "Playing") OR the *available action*
(e.g., "Play to start playback") — but tries to do both with the same control.

**The play/pause problem**: Does the play triangle icon mean "this is playing" or "press
to play"? These are contradictory interpretations. The control cannot serve as both state
indicator and state switcher.

**Solutions**: Two separate buttons (Play / Pause, always visible, one highlighted to
show current state) OR a toggle button with distinct visual states. The state must be
unambiguous at all times, independent of the action available.

Most audio apps now use the broken idiom because convention has made users adapt. New
designs in contexts without this entrenched expectation should avoid it entirely.

### Radio Buttons

Mutually exclusive selection from a group. Named after car radio presets — pressing one
button mechanically releases the previously pressed one.

**Always circular** (convention); always in groups of 2+; one always selected.

**When to prefer radio buttons**: Infrequent, pedagogic contexts where label clarity matters.
For daily-use sovereign applications, dropdown lists are usually better — they take less space
and are faster for intermediates.

**Radio button upgrade**: A bank of latching (toggle) icon buttons where only one can be
active at a time = radio icon buttons. Microsoft Word's alignment controls are the canonical
example. More space-efficient; requires icons to be recognizable.

### Switch Controls

A compact, explicit binary choice: physically slides between labeled On/Off (or similar)
states. Both states are always visible and labeled. Clearer than a single unlabeled checkbox.

**Best use**: Settings screens with many on/off toggles (iOS Settings paradigm). Awkward
outside of settings-type contexts on desktop.

### Dropdowns (Pop-up Lists)

A compact single-selection control. Shows only current selection until clicked; reveals
full list on demand. Replaces groups of radio buttons where space is constrained.

**Dropdown vs. radio buttons**: When space is limited and options exceed ~4, use a dropdown.
When all options should be simultaneously visible and the context is pedagogic (infrequent
use, complex choices), use radio buttons.

**Navigation dropdowns (anti-pattern)**: Using a dropdown as a navigation widget (selecting
a page/section from a dropdown) is disorienting — users expect dropdowns to configure, not
navigate. Prefer explicit nav links.

### Combo Boxes

Combination of text entry field + dropdown list. Allows both selecting from existing options
AND entering new values. Excellent for single-selection with possible new entries.

**Key advantage**: Shows current selection without a click; the text field makes the current
value always visible and directly editable.

**Inherently single-selection**: Because the text field shows one current value, no
multiple-selection combo box exists.

**Use in toolbars**: Combo boxes are among the most space-efficient controls for sovereign
applications — they fit on a toolbar, show their current value, and allow rapid changes.

### Tree Controls

Hierarchical data presented as an expandable/collapsible "sideways tree."

**The tree trap**: Developers overuse tree controls because hierarchical data structures
match their mental model of the data. Most users do *not* think in hierarchical trees.
Forcing non-hierarchical data into a tree creates usability problems.

**Only appropriate when**: Data is *genuinely* hierarchical and users naturally think of it
that way (file system navigation, organizational charts, nested categories).

**The usability test**: Can the user correctly predict whether an item is "inside" or
"outside" another item, based on their mental model? If not — don't use a tree.

---

## Entry Controls

### Bounded vs. Unbounded Controls

**Bounded controls**: Restrict input to valid values (sliders, spinners, dropdowns).
Users cannot enter invalid values — they're presented with the valid range.

**Unbounded controls**: Accept any text input (text fields). The application may
subsequently reject entries, but the control itself doesn't prevent invalid entries.

**The critical principle**: **Use bounded controls for bounded input.**

If a field accepts only numbers between 4 and 8, provide a control that *shows* the
range and prevents entry outside it — don't provide a text field that beeps "invalid"
when the user enters 9. Bounded controls communicate valid ranges; text fields do not.

### Validation Approaches

**Active validation**: Rejects individual keystrokes in real time. Must always explain
the rejection — not just refuse silently. "Only numeric characters allowed" is a
valid active validation message.

**Passive validation (half-second timer pattern)**: Set a countdown timer; reset on each
keystroke. When the timer hits zero (~500ms after last keystroke), validate. The effect:
validation runs continuously as the user pauses — responsive without validating every
single character. Ideal for patterns like email addresses or phone numbers.

**Hint pattern**: A ToolTip-like popup that appears adjacent to an entry field when invalid
input is detected. Non-blocking, non-modal, adjacent to the field. More humane than an error
dialog — it informs without stopping the proceedings. Disappears when the issue is resolved.

**Color coding for validation state**: The entry field itself changes color to reflect
validity (green = valid, pink = invalid, white/neutral = unchecked). Users understand
validity state without any explicit message.

### Spinners

Numeric entry with +/- buttons. The bounded portion (buttons) prevents out-of-range values;
the text field portion allows direct numeric entry.

**Best use**: Bounded numeric input with a clear range where users may want to fine-tune
(font size, quantity, zoom level). Shows that a numeric range exists; facilitates
precise control.

### Sliders

Visual, continuous (or stepped) range selection. Excellent for conveying the range of
valid values and current position within that range.

**Best use**: Continuous values where the relative position matters as much as the exact
value (volume, brightness, zoom). Especially good when both endpoints have meaning
(0% ↔ 100% opacity).

**Interaction principle**: Sliders should accept linear mouse/touch input in two dimensions,
not force circular arc motion like a physical dial. Drag right/up = increase; left/down = decrease.

**Avoid horizontal scrolling for text**: Sliders for data navigation should not force
horizontal text scrolling — it hides the beginning of every line. If horizontal movement
is needed, use truncation with ToolTips or text wrapping before resorting to horizontal scroll.

---

## Display Controls

### Scrollbars

Navigate content larger than the visible viewport. The thumb (draggable portion) communicates
both current position and proportion of visible content to total content.

**Proportional thumbs**: The thumb should be sized proportionally to what fraction of the
content is visible. A thumb that is 1/3 of the scrollbar height = 1/3 of the document is
currently visible. This provides essential orientation information.

**Hiding scrollbars (mobile and modern OS)**: Acceptable — with caveats:
- Partial content visibility at scroll edges must signal that more content exists
- Fine position control requires scrollbars to be visible — hiding them prevents precise positioning
- On large screens, hidden scrollbars may disappear before the mouse reaches them

**Enhanced scrollbars for documents**: For long text documents, the best scrollbars also show:
total page count, current page number (while dragging), thumbnail of page at drag position,
visual markers for search results, jump controls (beginning/end of document).

**Avoid horizontal text scrolling**: Text lists with horizontal scrollbars hide the start
of every entry. Solutions (in order of preference): widen the control, wrap text to next
line, truncate with ellipsis + ToolTip.

### Splitters

Divide a sovereign application into multiple panes. Must advertise movability with cursor
changes on hover. Should have stops preventing panes from being collapsed to unusable sizes.

---

## Dialogs — Full Taxonomy

### The Core Rule: Put Primary Interactions in the Primary Window

Dialogs are supporting actors, not lead players. A UI consisting primarily of modal dialogs
signals poor interaction framework design. The pantry analogy: dialogs are the pantry —
they play a secondary role, and although they move the action forward, they should not be
the engine of motion.

**When dialogs are appropriate**:
- Functions that are out of the normal flow (confusing, dangerous, rarely used)
- Actions making major, dislocating changes to application state (wholesale document reformatting)
- Gathering all information related to a specific domain object (invoice properties, print settings)
- Providing a pedagogic, step-by-step interface for complex infrequent tasks

**When dialogs are inappropriate** (use rich modeless feedback instead):
- Reporting normal application status
- Providing information the user didn't request and doesn't urgently need
- Confirming routine, easily-reversible actions
- Displaying errors that the application itself caused or could have prevented

### Modal vs. Modeless

**Modal dialogs**: Application cannot continue until dialog is dismissed. All controls in
the parent application are deactivated. Clear behavioral contract: "Deal with me now."

**Modal dialog rules**:
- Must have terminating command buttons (OK / Cancel or equivalent verb-based labels)
- Must NOT have a Close control in the title bar (ambiguous: does Close = Cancel or = Confirm?)
- OK means: "Accept my input and close this dialog"
- Cancel means: "Abandon my input and close this dialog"
- Never dynamically change the labels of terminating buttons (OK → Close, Cancel → Apply)
- Title bar should contain the function verb for function dialogs ("Print", "Export")
- Title bar should contain the object name for property dialogs ("Invoice Properties")

**Modeless dialogs**: Application continues while dialog is open. Selection can change.
Used for persistent tools, palettes, find-and-replace, property inspectors.

**Modeless dialog rules**:
- Should NOT have OK/Cancel buttons — Close via window title bar close control only
- All actions are immediate (no "pending" state that OK would commit)
- Undo works application-wide during modeless dialog use (no "cancel everything")
- Changes are live and real-time
- Must be conservative with screen space (they persist; they compete with content)
- Are often better replaced by sidebars/task panes in modern sovereign applications

### Five Types of Dialog by Purpose

**1. Property dialogs**: View and change settings/attributes of a selected object or application.
Usually modeless. Better as a sidebar/task pane for frequently accessed properties.
Title: object name + "Properties".

**2. Function dialogs**: Control a single function launched from a menu (print, find, insert).
Usually modal. Separate configuration from invocation when users frequently use default settings.
Title: the action verb ("Print", "Find", "Export to PDF").

**3. Process dialogs**: Report ongoing time-consuming operations. Launched by the application,
not the user. Must show: (a) that a process is happening, (b) that things are normal,
(c) how much remains, (d) how to cancel.
Better alternative: animate the process indicator *within* the main window (Chrome tab spinner
model) rather than blocking with a separate dialog.

**4. Notification dialogs**: Report triggered events or communications (appointments, messages).
Should collect into a notification center. Should be non-blocking (transient) for notifications
that don't require immediate action. Should persist visibly until acknowledged for anything
requiring action.

**5. Bulletin dialogs**: Application-generated reports of internal state — errors, alerts,
confirmations. The most frequently misused dialog type. **Usually should be eliminated entirely.**

---

## Eliminating Errors, Alerts, and Confirmations

This is where Cooper's guidance diverges most sharply from common practice. Most bulletin
dialogs should not exist. Here's why, and what to do instead.

### Error Dialogs — Why They're Wrong

**The fundamental misconception**: Developers believe error messages tell users when they
made a mistake. In most cases, error messages report when *the application* couldn't handle
what the user provided.

**What error messages actually communicate to users**: "You are stupid." The phrasing is
often polite. The effect is always humiliating. Users know intellectually it's software —
but they cannot prevent the emotional response of being told they did something wrong.

**Error messages don't prevent errors**: They prevent the *application* from getting into
trouble. They do nothing to prevent users from entering the wrong values (just the invalid
ones). The most useful protection — preventing conceptually wrong inputs — is beyond the
capability of an error message.

**The developer's error**: Treating the user as an input device whose job is to provide
correct data. The actual job description: the developer's job is to satisfy users, not
vice versa. The application should adapt to the user; the user should not adapt to the application.

### How to Eliminate Error Dialogs

**Make errors impossible**: Use bounded controls. If a field accepts numbers 1-10, use
a spinner with range 1-10. The user physically cannot enter 11. No error possible.
No message needed.

**Make the application smart enough to not need the error**: If the application knows what
format it needs, why can't it normalize the input itself? Accept "nine" as numeric input.
Accept "5in" as 5 inches. Accept phone numbers in any format and normalize internally.

**Substitute the valid value silently**: If a user enters 25 where the maximum is 22, substitute
22. Show a hint explaining what happened. The user gets the closest valid result without being
stopped. They can adjust if they want to.

**Provide positive feedback instead of negative**: Reward correct input. Show a green
checkmark or a color change when an entry is valid. Users learn from positive feedback
more effectively than from error messages. They feel good about the software, not punished.

**Accept incomplete input temporarily**: Many "errors" are just input that isn't finished yet.
An invoice without a customer ID is not an error — it might be a new customer being created,
or a lookup in progress. Accept the transaction, use RVMF to show the incomplete state,
and ensure the user addresses it before closing the session. Don't stop the proceedings
because the sequence isn't what the database expects.

### Alert Dialogs

Alerts report conditions that aren't errors per se — warnings, status updates, things the
application "wants" the user to know. Most of them shouldn't exist as dialogs.

**The test for a legitimate alert**: Would a genuinely competent, caring colleague interrupt
you to tell you this? If the information can wait, use a status area, notification indicator,
or badge. Reserve dialogs for genuinely urgent, important, actionable information.

**Transitory alerts are never acceptable for errors**: A dialog that auto-dismisses may
be missed entirely. If something is worth a dialog, ensure the user definitely gets the message.
Error/alert bulletins must be blocking — they stay until acknowledged.

### Confirmation Dialogs

The most overused bulletin dialog type. "Are you sure?" asks the user to confirm an action
they just deliberately requested. Most confirmation dialogs are pure excise.

**The "ask forgiveness, not permission" principle** (Cooper):
- When users take a reversible action, let them proceed without confirmation
- Provide Undo as the safety net instead
- Users get what they asked for, they can see the result, and they can reverse it

**When confirmations are legitimate**:
- Irreversible, high-consequence actions (deleting 47 contacts, emptying the trash,
  sending an email to 10,000 subscribers)
- Actions with non-obvious far-reaching consequences
- Actions that are about to consume significant external resources (major cloud operations)

**When confirmations are pure noise** (and should be replaced by Undo):
- Deleting a single reversible item
- Closing a file (if auto-save exists)
- Navigating away from an unsaved form (if the state can be recovered)
- Any action the user just deliberately performed and can immediately reverse

**Writing confirmation dialogs that work**: When you must use a confirmation:
- The title should state the consequence, not the question: "Delete 47 contacts?" not "Confirm"
- Buttons should be labeled with actions, not "OK/Cancel": "Delete" vs. "Keep" (not "OK" vs. "Cancel")
- The destructive button should be visually distinct (often red)
- The default button should be the *non-destructive* option

### Tabbed Dialogs

Tabs organize related controls across multiple panes within a single dialog.

**When appropriate**: Gathering properties of a domain object with many settings that would
overflow a single pane. The tabs must have a meaningful rationale for being together.

**The stacking abuse**: Never stack tabs two or more rows deep. When the number of tabs
requires stacking, the dialog has structural problems — the scope of "one dialog" is
too broad. Break it into separate, more focused dialogs.

**Tab count limit**: 5-6 tabs is a reasonable upper bound. Beyond that, find other structures
(sidebar sections, accordion panes, separate dialogs).

**The "All interaction idioms have practical limits" principle**: Five radio buttons = fine.
Fifty radio buttons = ridiculous. Five tabs = fine. Stacked tabs = a design failure.

---

## Rich Visual Modeless Feedback (RVMF) — The Alternative to Dialogs

The principle: provide status, progress, and state information *within the main interface*
rather than through dialogs. Rich in depth, visual in form, modeless in access.

**Key property**: RVMF never stops the proceedings. Users can read it when they want;
ignore it when they don't. It requires no decision, no acknowledgment, no mode shift.

**Design examples**:
- iOS App Store: download progress appears as an animated progress arc on the app icon
  in the Home screen — no blocking dialog
- Chrome: page load indicator within the browser tab itself — no process dialog
- Availability indicator next to a contact name in email — no need to open a separate app
- Form field color changes as user types (pink = invalid, green = valid) — no error popup
- Healthcare dashboard using color coding, icons, and numbers in the main view — no alerts

**RVMF replaces**:
- Progress dialogs for ongoing background operations
- Status alerts for non-urgent information
- Some confirmation dialogs (preview-before-commit can replace "are you sure?")
- Error dialogs that are really just input-state notifications

**RVMF does NOT replace**:
- Confirmations for genuinely irreversible, high-consequence actions
- Notifications for urgent communications that require immediate action
- Property/function dialogs where focused configuration is genuinely needed

---

## Design Principles Summary from Chapter 21

From Cooper's Appendix A (the distilled design rules):

**On controls**:
- Use links for navigation and buttons for action
- Use bounded controls for bounded input
- Distinguish important text items in lists with graphic icons
- Avoid scrolling text horizontally
- Use noneditable (display) controls for output-only text

**On dialogs**:
- Put primary interactions in the primary window
- Dialogs are appropriate for functions out of the main interaction flow
- Dialogs are appropriate for organizing controls about a single domain object
- Never use transitory dialogs as error messages, alerts, or confirmations
- Use verbs in function dialog title bars
- Use object names in property dialog title bars
- Don't dynamically change the labels of terminating buttons
- Differentiate modeless dialogs from modal dialogs
- Do not use terminating button commands for modeless dialogs
- Don't stack tabs

**On errors**:
- Most error dialogs stop the proceedings with idiocy
- Make errors impossible (bounded controls > validation > error messages)
- Users get humiliated when software tells them they failed
- Ask forgiveness, not permission (Undo > confirmation dialogs)
- Inform without stopping the proceedings (RVMF > blocking dialogs)
