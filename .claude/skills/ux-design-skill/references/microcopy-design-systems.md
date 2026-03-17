# Microcopy, UX Writing & Design Systems Reference
## Sources: Krug (DMMT), Cooper (About Face), Norman (DOET), Yablonski (Laws of UX)

---

# Part 1: Microcopy & UX Writing

## What Microcopy Is

Microcopy is the small-scale text that appears throughout an interface: button labels,
form field labels, placeholder text, error messages, empty states, tooltips, confirmation
dialogs, onboarding messages, and navigation labels. It is distinct from marketing copy
or long-form content.

Microcopy is not decoration. It IS the interface at the interaction level. Every word
a user reads while attempting a task contributes to (or detracts from) cognitive load,
trust, and success.

---

## The Core Principles

### 1. Use the User's Vocabulary

Krug's fundamental rule: use the words users would use to look for something. Your
internal terminology is irrelevant if users don't recognize it.

**How to find user vocabulary**:
- Listen to how users describe their goals in research sessions
- Analyze support tickets and chat logs (what language do users use when something breaks?)
- Read site search queries (what words do users type when looking for features?)
- Ask users to describe what a feature does in their own words

**Test**: Show the label to someone unfamiliar with the product. Ask them what they'd expect
to find if they clicked it. Surprise or confusion = wrong vocabulary.

### 2. Be Specific, Not Generic

Generic labels force users to evaluate and decide. Specific labels communicate purpose
and remove doubt.

**Generic** → **Specific**:
- "Click here" → "Download the report"
- "Submit" → "Create account" / "Send message" / "Complete purchase"
- "Error" → "Your credit card was declined"
- "Options" → "Notification settings"
- "More" → "See all 23 results"

**Norman's principle**: The label IS a signifier. It communicates the affordance.
"Submit" is an affordance-free label — it tells users what to do (push) but not what
will happen. "Create account" communicates the outcome.

### 3. Write for Scanning, Not Reading

Krug's core insight about users: they scan, they don't read. Microcopy must communicate
in a glance.

**Rules for scannable microcopy**:
- Most important word first: "Download" before "your report"
- Front-load nouns: "Settings > Notifications" not "Manage how you receive notifications"
- Keep it short: if you need more than 5 words, question whether the design needs to change
- Use parallel structure across similar elements (consistency = faster scanning)

### 4. Match the Emotional Register

Microcopy sets the emotional tone of interactions. The register should match:
- The seriousness of the action (confirmation dialogs for high-stakes actions should be
  calm and clear, not casual)
- The brand personality (startup vs. bank vs. healthcare have different voice registers)
- The user's emotional state (error messages should be helpful, not cheerful)

---

## Button Labels

Buttons are the most critical microcopy. They represent the action a user commits to.

**The verb-noun formula**: "[Verb] [what they're acting on]"
- "Save changes" (not "Submit")
- "Delete account" (not "Yes" or "OK")
- "Send message" (not "Send")

**When to use one word**: When the context makes the object obvious and the verb is the
clear differentiator. "Save" vs. "Cancel" in a clearly scoped dialog is acceptable.

**The "OK / Cancel" anti-pattern** (Cooper): OK and Cancel are content-free labels that
require users to re-read the dialog title to understand what they're confirming or canceling.

**Replace with**:
- Dialog: "Delete this file?" → Buttons: "Delete" / "Keep"
- Dialog: "Discard changes?" → Buttons: "Discard" / "Continue editing"
- Dialog: "Sign out?" → Buttons: "Sign out" / "Stay signed in"

The destructive action should be visually distinct (often red or outlined) and placed
consistently (right or left — pick one and maintain it across the product).

---

## Form Field Labels and Placeholder Text

**Labels above fields, not as placeholders**: Placeholder text disappears when the user
starts typing. Users forget what the field is for mid-entry, especially in multi-field forms.
(Norman: this increases knowledge-in-head requirement — don't do it if a persistent label
is possible.)

**Exception**: Single-field forms (search boxes) where the purpose is obvious from context
and users don't need to remember the label while typing.

**Label conventions**:
- Use sentence case for labels: "First name" not "First Name"
- End labels with a colon only in traditional form layouts (table-layout forms); not necessary
  in modern above-field label layouts
- Required field indicators: asterisk (*) with legend, or "(required)" text, or "(optional)"
  on optional fields (whichever is less common in the form)

**Help text / instructions**:
- Place help text below the field (not above), so it appears after the label has been read
  and is adjacent to the field it describes
- Show only when needed (don't pre-explain fields that are self-explanatory)
- For complex fields: show a formatted example ("e.g., MM/DD/YYYY") rather than
  explaining the format in words

**Postel's principle application**: Before adding "format" instructions, ask: could the
system accept multiple formats instead? If yes, eliminate the instruction.

---

## Error Messages

Error messages are high-stakes microcopy because they appear exactly when users are most
frustrated. A well-written error message can transform a negative peak into a neutral one.

**The four-part error message**:
1. **What happened** (brief, clear, no jargon): "This email address is already registered"
2. **Why** (only if not obvious): "Each account requires a unique email address"
3. **What to do** (specific, actionable): "Sign in to your existing account, or use a different email"
4. **Link to the action** (when possible): "Sign in →"

**Never use**:
- Error codes ("Error 403") without explanation
- Vague language ("Something went wrong")
- Blaming the user ("You entered an invalid value")
- Jargon ("Null pointer exception", "Request timed out — retrying")
- Screaming all-caps ("INVALID EMAIL ADDRESS")

**Write errors for the user, not for the developer**: "The API returned status 422" explains
what went wrong for a developer. "We couldn't process your request. Please check your
information and try again." explains what to do for a user.

**Norman's principle**: The error message is the system image responding to a failure. If
the message helps users form a correct conceptual model of what happened and what to do,
it's a good message. If it exposes implementation details or assigns blame, it has failed.

**Validation vs. errors**:
- *Inline validation*: Real-time feedback as user types (green checkmark, red X)
  — shows validity before submission
- *Error summary*: After failed submission, list all errors at the top of the form AND
  highlight the specific fields — never only one or the other

---

## Empty State Copy

Empty states are first impressions or zero-data moments. They require:
- A reason for being empty ("You haven't created any projects yet")
- The value of what will be here ("Your projects will appear here so you can...")
- A clear action ("Create your first project →")
- Sometimes: social proof or examples ("Teams like yours use this to...")

**Don't write**: "No results found." / "Nothing here." / "Empty."
These communicate absence without direction.

---

## Confirmation and Success Messages

**Confirmations**: Appear immediately after a user action completes.
- Be specific about what happened: "Your password has been updated" not "Success"
- Match the scope: big actions deserve prominent confirmation; small actions can use
  inline feedback
- For irreversible actions: confirm clearly AND provide the undo action if one exists

**Toasts / snackbars**: For lightweight confirmations that don't require user action.
- Must be readable in 2-3 seconds (they auto-dismiss)
- Should confirm the action: "Message sent" not "Done"
- Should provide an undo when appropriate: "Email deleted · Undo"
- Don't use for errors that require user action (errors need to persist until resolved)

---

## Notification Copy

**Push notifications**: Must pass the "would a trusted friend send me this?" test.
- Value-first: lead with why the user should care, not the feature name
- Specific: "Your order shipped — arrives Friday" not "Order update"
- Non-manipulative: Don't use false urgency, FOMO, or social pressure

**Email subjects**: Same principles as push notifications. One clear, specific reason
to open. No clickbait. No deceptive "Re:" prefixes.

---

# Part 2: Design Systems

## What a Design System Is

A design system is a collection of reusable components, governed by standards and shared
vocabulary, that can be assembled to build any number of applications. It includes:

- **Design tokens**: Named variables for visual properties (colors, spacing, typography,
  shadows, border radii) that establish the visual language
- **Component library**: Reusable UI components (buttons, inputs, cards, modals, navigation)
  with defined states, variants, and usage guidelines
- **Pattern library**: Documented solutions to recurring design problems (empty states,
  error handling, data tables, form layouts)
- **Design principles**: The values and rules that govern design decisions across the system

---

## Why Design Systems Exist

### Consistency at Scale

Without a design system, each team, feature, and product makes independent decisions.
The result: visual inconsistency, behavioral inconsistency, and vocabulary inconsistency.

Jakob's Law (Yablonski): users develop expectations from prior experience. If your product
has four different visual styles for error messages, users can't build reliable mental models
of what an error looks like.

**The audit signal**: If a design system audit finds 12 different button styles across a
product, the product has a design system problem, not 12 design decisions.

### Speed and Efficiency

Assembling interfaces from established components is faster than designing from scratch.
Engineers implement standardized components once; the design token system propagates
changes across all applications automatically.

### Accessibility Built-In

When accessibility is baked into components (focus states, keyboard navigation, ARIA
attributes, color contrast), every implementation that uses those components inherits
accessibility. This is far more reliable than relying on individual implementations to
get accessibility right.

---

## Design Tokens

Design tokens are named variables that store visual design values.

**Examples**:
```
color-primary: #0066CC
color-error: #CC0000
spacing-base: 8px
spacing-md: 16px
border-radius-default: 4px
font-size-body: 16px
font-weight-bold: 600
shadow-card: 0 2px 8px rgba(0,0,0,0.12)
```

**Token categories**:
- *Color tokens*: Brand colors, semantic colors (success, error, warning), neutral scales
- *Spacing tokens*: A scale (usually multiples of 4 or 8px) that governs all whitespace
- *Typography tokens*: Font families, size scales, weight scales, line heights
- *Shape tokens*: Border radii, defining the visual "roundness" of the system
- *Shadow tokens*: Elevation levels

**The power of tokens**: Change `color-primary` once, and every component that uses it
updates automatically. This is how redesigns and brand updates can be executed efficiently.

---

## Component Library Structure

### Component Anatomy

Each component should be documented with:
- **Purpose**: What problem does this component solve?
- **Anatomy**: The parts of the component (label, icon, container, etc.)
- **Variants**: The different versions (primary, secondary, destructive buttons)
- **States**: How the component looks in different states (default, hover, focus, active,
  disabled, loading, error)
- **Behaviors**: How it responds to user interaction
- **Usage guidelines**: When to use this component, when not to
- **Accessibility notes**: ARIA roles, keyboard interactions, focus management

### Component Hierarchy

**Atoms**: The most basic UI elements (buttons, inputs, labels, icons). Cannot be broken
down further.

**Molecules**: Groups of atoms that work together (search box = input + button + icon).

**Organisms**: Larger, complex components composed of molecules and atoms (navigation bar,
data table, card grid).

**Templates**: Page-level structures without content (wireframe layout of a page type).

**Pages**: Specific instances of templates with real content.

(This hierarchy comes from Brad Frost's Atomic Design methodology, widely adopted in design
systems work.)

---

## When to Use the System vs. Deviate

**Use the system when**: The component or pattern already exists and serves the use case.
This is the default. Deviation is the exception that requires justification.

**When deviation may be appropriate**:
- The standard component cannot accommodate the specific use case even with variant/state expansion
- The component genuinely needs to serve a different user need that existing components don't address
- The deviation is documented and will inform an update to the system

**The contribution model**: When a team builds something new that doesn't exist in the
system, they should contribute it back. A design system that only takes from teams will
drift from reality; one that receives contributions stays current.

**Significant change must be significantly better** (Cooper's principle): A deviation from
the system must create meaningfully better user experience, not just different aesthetics.
The bar for breaking system consistency is high because consistency has real UX value (Jakob's Law).

---

## Pattern Library

Patterns are documented solutions to recurring design problems. Unlike components (which
are visual/interactive building blocks), patterns describe *when* and *how* to combine
components to solve a specific type of problem.

**Pattern documentation includes**:
- The problem it solves
- When to use it
- When not to use it
- Examples of correct usage
- Examples of incorrect usage (anti-patterns)
- Accessibility considerations

**Common pattern categories**:
- **Navigation patterns**: Tab bars, side navigation, breadcrumbs, pagination
- **Data entry patterns**: Multi-step forms, inline editing, bulk selection
- **Feedback patterns**: Loading states, error states, empty states, success confirmation
- **Layout patterns**: Grid systems, card layouts, list views, split panels
- **Communication patterns**: Alerts, toasts, modals, drawers, tooltips

---

## Design System Governance

**Who owns the system?** A central design systems team, or a federated model where teams
contribute components. Neither is universally correct — it depends on org size and maturity.

**The contribution process**: How do teams propose new components or changes to existing ones?
Without a clear process, the system either becomes a bottleneck (central team gatekeeps
everything) or diverges (no oversight).

**Versioning and breaking changes**: Components change over time. When a change is backward-
incompatible, all implementations must update. How is this communicated? How long is the
transition period?

**The "system tax"**: Building and maintaining a design system takes time and resources.
For small teams or early-stage products, the overhead may outweigh the benefits. The
inflection point is typically when:
- Multiple teams are building in the same product space
- Visual inconsistency is creating user confusion
- Accessibility issues keep recurring across implementations
- Redesign efforts are disproportionately expensive due to custom components everywhere

---

## Practical Design System Guidance for Designers

### Before creating a custom component

1. Does the standard component handle this use case with a variant or state?
2. Has another team already solved this problem? (Check the contribution backlog)
3. Is this genuinely a different use case, or just a visual preference?

### When implementing a component

1. Use the component exactly as documented (behavior and interactions, not just visuals)
2. Use design tokens, not hardcoded values
3. Include all required states in your design files
4. Document any deviations from the standard, even if you think they're small

### When contributing to the system

1. Document the problem this solves (not just the solution)
2. Show usage examples in real product contexts
3. Define all states and variants
4. Include accessibility requirements
5. Get review from at least one person outside your team (fresh eyes find documentation
   gaps that are invisible to the creator)
