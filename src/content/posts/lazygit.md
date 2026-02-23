---
layout: ../../layouts/PostLayout.astro
author: Nikolai Dokken
title: Lazygit
slug: lazygit
publishedDate: "2024-06-24"
tags: ["post"]
---

Lazygit is a tool I use to make my life as a developer easier. Although I recommend everyone to understand the basics of git and common git operations before using it, it can make your life so much easier when it comes to performing regular tasks like switching branches, merging, rebasing, cherrypicking commits, and much more.

## The TUI components

Below you see the interface of Lazygit. Being a Text based User Interface (TUI), it renders right in the terminal and uses keyboard shortcuts (arrow keys) to navigate between the different panes:

1. **Status**: Displays the current repo and checked out branch
2. **Files**: Shows your changed files
3. **Local branches**: your local branches
4. **Commits**: The commmit history of the current branch
5. **Stash**: Your stash

```bash
╭─[1]─Status────────────╮╭─[0]─Unstaged changes───────────────────────────╮
│✓ advent-of-code → main││                                                │
╰───────────────────────╯│                                                │
╭─[2]─Files - Worktrees─╮│                                                │
│▼ 2025/day5            ││                                                │
│  ?? example_input.txt ││                                                │
│  ?? input.txt         ││                                                │
│  ?? solution.py       ││                                                │
│                       ││                                                │
│                       ││                                                │
╰────────────────1 of 4─╯│                                                │
╭─[3]─Local branches - ─╮│                                                │
│  * main ✓             ││                                                │
│                       ││                                                │
│                       ││                                                │
│                       ││                                                │
│                       ││                                                │
│                       ││                                                │
╰────────────────1 of 1─╯│                                                │
╭─[4]─Commits - Reflog──╮│                                                │
│9ec394af Ni ◯ Day 4    ││                                                │
│6b76fae7 Ni ◯ Day 3    ││                                                │
│7da5473e Ni ◯ Day 2    ││                                                │
│b6041a50 Ni ◯ Init 2025││                                                │
│34f6d523 Ni ◯ Day 12 an││                                                │
╰───────────────1 of 23─╯╰────────────────────────────────────────────────╯
╭─[5]─Stash─────────────╮╭─Command log────────────────────────────────────╮
│                       ││change!                                         │
╰────────────────0 of 0─╯╰────────────────────────────────────────────────╯
Stage: <space> | Commit: c | Stash: s | …        Donate Ask Question 0.55.1
```

The above is copied from a lazygit session in my AoC repo.
