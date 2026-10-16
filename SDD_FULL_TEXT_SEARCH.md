# SDD Spec: Full-Text Task Search

## Overview
Real-time full-text filtering of tasks by title, description, tags via debounced input (>=3 chars), case-insensitive match highlighting, keyboard accessible.

## Current State
- SearchBar: status-only filter (all/completed/pending) via select dropdown
- Task fields: title, description, tags[], category, dueDate, checked
- HomePage: task list state + view/category filters; no text search yet

## Requirements
FR-01: Replace dropdown with combined text search + status filter (P0)
FR-02: Debounce 300ms after >=3 chars entered (P0)
FR-03: Case-insensitive substring match on title/description/tags[] (P0)
FR-04: Highlight matches with <mark> or .search-highlight CSS class (P1)
FR-05: Clear button when query non-empty; resets to empty & restores filtered tasks per current view/category filters

## Non-Functional
NFR-Accessibility: Full keyboard navigation; ARIA labels; focus management
NFR-Performance: Debounce prevents excessive filtering on each keystroke