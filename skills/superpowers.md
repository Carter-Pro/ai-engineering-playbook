# Superpowers Skill Adapter

This file defines how this playbook adapts Superpowers-style agent methods.

## Role

Superpowers-style skills are used for:

- problem framing
- structured thinking
- planning before implementation
- identifying risk
- reducing unnecessary edits
- verifying work with evidence
- improving agent self-checking

## Applied by commands

### `/think`

Use Superpowers-style thinking to:

- restate the task in concrete terms
- identify unknowns and assumptions
- classify risk as LOW, MEDIUM, HIGH, or RELEASE
- define success criteria
- decide whether code changes are needed

### `/plan`

Use Superpowers-style planning to:

- inspect the existing project before proposing changes
- avoid introducing new conventions unnecessarily
- split work into small reviewable steps
- define verification commands
- call out decisions that require user confirmation

### `/implement`

Use Superpowers-style execution discipline to:

- follow the approved plan
- make minimal coherent changes
- avoid unrelated refactors
- preserve user changes
- stop when the task exceeds the approved scope

### `/fix`

Use Superpowers-style debugging to:

- reproduce or diagnose before editing
- identify the smallest likely cause
- make the smallest safe fix
- verify the bug no longer reproduces
- report the evidence

### `/verify`

Use Superpowers-style verification to:

- run the agreed checks
- collect evidence instead of making claims
- distinguish tested behavior from untested assumptions
- report failures honestly

### `/pr`

Use Superpowers-style review preparation to:

- summarize what changed
- list verification evidence
- highlight risks and follow-ups
- avoid hiding uncertainty

### `/finish`

Use Superpowers-style closure to:

- ensure worktree state is clear
- summarize final status
- preserve unresolved issues explicitly
- avoid silent cleanup that could lose user work

### `/release`

Use Superpowers-style release discipline to:

- require explicit user authorization
- verify version, changelog, tests, and artifacts
- avoid automatic publishing unless explicitly approved
- provide rollback or recovery notes where relevant

## Safety boundaries

This adapter does not allow the agent to:

- discard uncommitted user changes
- force push without explicit approval
- delete files without clear authorization
- change system-level configuration without approval
- publish releases without explicit user confirmation
