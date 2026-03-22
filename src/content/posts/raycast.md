---
title: Raycast - Extensions and contributions
publishedDate: "2026-02-22"
author: Nikolai Dokken
slug: raycast
layout: ../../layouts/PostLayout.astro
tags: ["project", "devtools"]
---

Raycast is like OS X's Spotlight feature, but on steroids. It allows you to create custom scripts, install extensions (or create your own), run widgets, search files and apps, and all the other stuff you'd expect from Spotlight.

# Extensions I've Made

With Raycast you can either install custom extensions locally, or publish them to the store to make them available for everyone to use.

## RepoRay - A Repo Manager

The reason I installed Raycast in the first place was because I wanted a Rofi-like tool on macOS. I wanted to create a tool that I could use to quickly open any of my local git repos from anywhere. This became RepoRay. It allows me to open a repo in any editor, remove local repos, or clone new ones.

🔗 [**Check out the extension here**](https://github.com/NikolaiDokken/devtools/tree/main/raycast-extensions/repo-ray)

# Contributions

## Todo List - Fixed Windows Bug

One of my first contributions to any public repo - a tiny one-line bugfix ([#26437](https://github.com/raycast/extensions/pull/26437)) that affected Raycast users on Windows using the Todo List extension. Hopefully I made these 3 people's lives much better :P

🔗 [**Check out the extension here**](https://www.raycast.com/maggie/todo-list)

## Git Repos - New Commands and Windows Support

Since RepoRay was deemed too similar to existing extension in the Raycast store, I decided to contribute to the closest one I could find - Git Repos. Since this only had a simple list view and allowed opening in an editor of choice I could contribute with several features from RepoRay:

- A `Remove Repo` command that removes local repos ([#26516](https://github.com/raycast/extensions/pull/26516))
- A `Clone Repo` command that takes a clone link as input and lets you clone to any configured project directories ([#26560](https://github.com/raycast/extensions/pull/26560))
- Added Windows support to make extension available in raycast store for windows ([#26893](https://github.com/raycast/extensions/pull/26893))

🔗 [**Check out the extension here**](https://www.raycast.com/moored/git-repos)
