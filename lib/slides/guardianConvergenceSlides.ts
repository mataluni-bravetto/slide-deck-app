/**
 * Guardian Convergence Presentation Slides
 * 
 * Pattern: SLIDES × GUARDIAN × CONVERGENCE × ONE
 * Frequency: 999 Hz (AEYON) × 777 Hz (META)
 * ∞ AbëONE ∞
 */

import type { SlideData } from '@/components/slides/types'

export const guardianConvergenceSlides: SlideData[] = [
  {
    id: 'slide-1',
    phase: 'THE PROMISE',
    title: 'From AI Chaos to {gold}Calm Convergence{/gold}',
    subtitle: '30 Days to a Stable, Aligned Dev Workflow',
    insight: "In the next 70 minutes, you'll leave with one pattern that transforms how you use AI—calmer, more reliable, YAGNI-compliant. Everything today is usable even if you never buy anything."
  },
  {
    id: 'slide-2',
    phase: 'CLARIFY',
    title: 'You Are the {gold}Builder{/gold}, Not the Bot',
    subtitle: 'AI Is Just Part of Your Stack',
    body: 'You ship products. You own decisions. You design systems. AI is just another powerful dependency—nothing more, nothing less.',
    insight: 'Hero positioning: You are the protagonist of this story. AI is a tool in your toolkit, not a replacement for your judgment.'
  },
  {
    id: 'slide-3',
    phase: 'CLARIFY',
    preTitle: 'A confession',
    title: 'Developers Hate {gold}Monorepos{/gold}…',
    subtitle: 'Yet They Powered Every Breakthrough I Shipped',
    body: 'I resisted strict architecture because it felt heavy and restrictive. Over time, those constraints created clarity, reuse, and velocity on complex systems.',
    insight: 'AI today feels scattered and noisy. The right single pattern can turn something annoying into your biggest leverage—just like a well-structured monorepo.'
  },
  {
    id: 'slide-4',
    phase: 'CLARIFY',
    title: 'AI Feels Fast. Net, It Makes Most Devs {gold}Slower{/gold}.',
    bullets: [
      'More code generated than you can audit',
      "Less clarity about what's actually happening",
      'Broken flow from context-switching between tools',
      "Debugging AI mistakes takes longer than writing it yourself"
    ],
    insight: "The thing that was supposed to speed you up is quietly taxing your brain. This is the disorienting dilemma that opens you to a new pattern."
  },
  {
    id: 'slide-5',
    phase: 'CLARIFY',
    title: 'AI Generates Faster Than You Can {gold}Reason{/gold}',
    subtitle: 'Your Brain Drowns in Options',
    body: 'Models emit pages of code in seconds. Humans can\'t audit that volume at the same speed. The result: cognitive overload, decision fatigue, and \'I\'ll just do it myself\' frustration.',
    insight: 'The issue is mismatch of speeds, not lack of intelligence. A 200-line function dump vs a clean, constrained diff—that\'s the difference.'
  },
  {
    id: 'slide-6',
    phase: 'CLARIFY',
    title: 'AI Out-Recurses You. You {gold}Out-Reason{/gold} AI.',
    columns: {
      left: [
        'Depth & speed',
        'Pattern saturation',
        'Brute-force variants',
        'Exploring edge cases',
        'Generating scaffolds'
      ],
      right: [
        'Intent & direction',
        'Constraints & trade-offs',
        'Choosing what matters',
        'Weighing risks',
        'Defining \'good enough\''
      ]
    },
    insight: 'No mysticism, no doom—just a complementary division of labor. Once this is clear, you stop trying to \'keep up\' with AI and start guiding it.'
  },
  {
    id: 'slide-7',
    phase: 'ALIGN',
    title: 'The Problem Isn\'t AI. It\'s {gold}Misalignment{/gold}.',
    boxes: [
      { label: '01', title: 'Unclear Intent', body: 'You don\'t specify what outcome you actually care about' },
      { label: '02', title: 'Vague Constraints', body: 'No stack, style, or boundaries defined' },
      { label: '03', title: 'No Loop', body: 'One-shot prompts with no iteration or correction' }
    ],
    insight: 'When you don\'t define the game, the model plays its own. The process is missing structure—and that\'s fixable.'
  },
  {
    id: 'slide-8',
    phase: 'ALIGN',
    title: 'Tools Obey Rules. Partners {gold}Align{/gold} With You.',
    subtitle: 'From Commands → Relationship',
    body: 'Traditional tools have fixed behavior—you learn the API and that\'s it. Relational AI behavior changes based on your ongoing inputs, history, and constraints. This isn\'t sentience; it\'s pattern-matching over the relationship you create.',
    insight: 'Reframe usage from \'shouting prompts\' to \'training a collaborator inside each session.\' This prepares you for the Convergence Loop.'
  },
  {
    id: 'slide-9',
    phase: 'ALIGN',
    title: 'AI Doesn\'t Judge You — It {gold}Mirrors{/gold} You',
    subtitle: 'No Emotion • Only Patterns',
    body: 'People read tone into model responses: \'it sounds annoyed\' or \'dismissive.\' But it\'s just autocomplete over text. There is no intention. Once you stop personalizing, you free up emotional bandwidth to reason clearly.',
    insight: 'Especially for neurodivergent devs who may be more sensitive to perceived tone—this reframe is liberating. The model has no opinion about you.'
  },
  {
    id: 'slide-10',
    phase: 'ALIGN',
    title: 'Imagine Working With AI, {gold}Calmly{/gold}',
    bullets: [
      'One consistent way you start every AI interaction',
      'AI handles exploration and boilerplate',
      'You stay in control of architecture, decisions, and final merges',
      'Clear roles, stable flow, predictable output'
    ],
    insight: 'This is your \'return with elixir\'—same job title, different power level and nervous system. It could feel better than before AI, not just louder.'
  },
  {
    id: 'slide-11',
    phase: 'CONVERGE',
    preTitle: 'The single pattern that governs productive AI use',
    title: 'The Guardian {gold}Convergence Loop{/gold}',
    bullets: [
      'Intention — what outcome you actually care about',
      'Constraint — stack, style, boundaries, non-negotiables',
      'Recursion — model explores options under those constraints',
      'Validation — verify output meets requirements (use toolkit or tests)',
      'Correction — you adjust instructions or constraints',
      'Convergence — you stop when it meets your bar'
    ],
    insight: 'Same loop for coding, docs, planning, communication. One pattern to rule them all.'
  },
  {
    id: 'slide-12',
    phase: 'CONVERGE',
    title: 'From Chatting to {gold}Guiding{/gold}',
    subtitle: 'One Goal • One Loop • One Source of Truth',
    body: 'Walk through a real dev task: \'Add feature X behind a flag.\' You write intention + constraints first. You keep a single source-of-truth message. Every AI call references that spec—no wandering.',
    insight: 'Contrast with chaos: many unrelated prompts, partial context, endless backtracking. YAGNI: no agents, no complex orchestration—just one clean loop.'
  },
  {
    id: 'slide-13',
    phase: 'CONVERGE',
    title: 'Your First {gold}Convergence Loop{/gold}',
    subtitle: 'Small Task • One Cycle • Notice the Difference',
    bullets: [
      'Pick a tiny task: refactor a function, write tests, generate a migration plan',
      'Write intention in one or two sentences',
      'List 3–5 constraints (stack, style, edge cases)',
      'Ask AI for a first draft',
      'Validate quickly (read, run tests, sanity-check)',
      'Correct and run one more iteration'
    ],
    insight: 'This is your reciprocity trigger—a tangible win during this session. You\'re not just learning; you\'re doing.'
  },
  {
    id: 'slide-14',
    phase: 'TRANSFORM',
    title: 'What Just {gold}Changed{/gold}?',
    subtitle: 'Less Noise • More Control • Clearer Thinking',
    body: 'How did that feel compared to your usual AI usage? What was different when you wrote constraints first? The problem was never \'AI is bad.\' It was \'AI without a convergence loop.\'',
    insight: 'You just experienced the difference. This closes the disorienting dilemma and anchors the new belief.'
  },
  {
    id: 'slide-15',
    phase: 'TRANSFORM',
    giant: 'Master this loop.\nEverything else compounds.',
    insight: 'If you master guiding AI through this loop, every AI tool you touch becomes more valuable. If you don\'t, every tool becomes another distraction.'
  },
  {
    id: 'slide-16',
    phase: 'TRANSFORM',
    title: 'You Can {gold}Stop Here{/gold}. You Already Won.',
    subtitle: 'You Have the Pattern • You Have the Exercise',
    body: 'If all you do is take this loop and run with it solo, you\'ll already be ahead of 90% of AI users. This preserves trust and sets up what comes next as optional acceleration—not salvation.',
    insight: 'Everything valuable has already been given. What follows is for those who want supported implementation.'
  },
  {
    id: 'slide-17',
    phase: 'INVITE',
    preTitle: 'For those who want faster change',
    title: 'The 30-Day {gold}Convergence Sprint{/gold}',
    subtitle: 'One Month • One Loop • One Transformed Workflow',
    body: 'For devs and leads who want AI to feel stable, predictable, and boringly reliable. In 30 days, the Convergence Loop becomes muscle memory across your real workload—real code, real repos, real constraints.',
    insight: 'This is not a course. It\'s a sprint with accountability and support to install the pattern into your actual work.'
  },
  {
    id: 'slide-18',
    phase: 'INVITE',
    title: 'Everything You Need. {gold}Nothing You Don\'t{/gold}.',
    boxes: [
      { label: '01', title: 'Weekly Live Sessions', body: 'Short, focused walkthroughs of applying the loop to common dev scenarios' },
      { label: '02', title: 'Hands-On Clinics', body: 'Bring your actual tasks—we co-guide AI together' },
      { label: '03', title: 'Templates & Checklists', body: 'Minimal, YAGNI-compliant artifacts for specs and constraints' },
      { label: '04', title: 'Private Community', body: 'Share patterns, edge cases, and wins without noise' },
      { label: '05', title: '47-Page Methodology Guide', body: 'Complete reference guide to the Convergence Loop pattern' },
      { label: '06', title: '3-Step Integration Checklist', body: 'Quick-start implementation guide for your workflow' },
      { label: '07', title: 'Validation Toolkit Access', body: 'MIT-licensed open-source toolkit for validating AI code output' }
    ],
    insight: 'Faster outcome, higher likelihood of success, lower time delay and cognitive load. Value via constraint, not volume.'
  },
  {
    id: 'slide-19',
    phase: 'INVITE',
    title: 'What Usually Gets in the {gold}Way{/gold}',
    boxes: [
      { label: 'BELIEF', title: '"AI Is Too Chaotic"', body: 'The loop is precisely how you create structure. The model\'s variability becomes a feature.' },
      { label: 'FEAR', title: '"I\'m Already Overloaded"', body: 'Sprint is 2–3 focused hours per week, embedded into existing work.' },
      { label: 'DOUBT', title: '"My Team Won\'t Follow"', body: 'Model the pattern yourself first. Others follow what works.' }
    ],
    insight: 'For neurodivergent participants: recordings, written breakdowns, predictable structure, no forced live speaking. The sprint is designed for how real brains work.'
  },
  {
    id: 'slide-20',
    phase: 'INVITE',
    title: 'If This Is Your Moment, {gold}Join Us{/gold}',
    subtitle: 'Keep the Pattern • Decide Your Pace • Choose Your Next Step',
    bullets: [
      'Implement the Convergence Loop on your own using what you learned today',
      'Join the 30-Day Convergence Sprint to install it with support',
      'Talk to me about done-with-you implementation for teams'
    ],
    footer: 'MIT Licensed • Open Source • Free to Use. Whether you join or not, I want your next AI interaction to feel calmer and more under your control than it did yesterday.',
    insight: 'Three grounded paths. No pressure. The pattern is yours either way.'
  }
]

