---
title: Words
publishedDate: 2023-06-29 12:00:00
author: Nikolai Dokken
slug: word-game
layout: ../../layouts/PostLayout.astro
type: project
---

🔗 [Play the game here](https://mp-wordle.web.app/)

## Master Thesis

My master's thesis project. The finished product is an online multiplayer word game used as a means to research AI opponents and difficulty scaling resulting in our thesis with the following title:

> The Role of AI Opponents in Online Multiplayer Games: Exploring Difficulty Scaling and Adaptive Strategies for Player Motivation and Engagement

The thesis was written in collaboration with a fellow student and friend Ian Evangelista and aimed to figure out how to increase motivation and engagement through dynamic game difficulty scaling in AI opponents.

### Game rules

The aim of the game is to get as many points as possible by creating words in a 5x5 grid. Each player has **their own** grid in which they will take turns selecting and placing letters in. Player 1 starts by selecting any letter, and placing it in their own grid. Player 2 must then place the same letter in their grid before selecting a letter of their own choice and placing this in their own grid. This goes on untill both grids are full, and the player with the most points is the winner. Points are calculated as follows:

-   3-letter words: 3 points
-   4-letter words: 4 points
-   5-letter words: 10 points

### AI Adversaries

Different AI adversaries were developed to answer the question: How complex AI opponents are needed to pose a tough, but rewarding challenge to players? As it turned out, they did not nessesarily need to be as complex as expected.

##### Easy Opponent - Simple Reflex Agent

The easy opponent would act as a simple baseline, and did not consider anything before making a move. It simply chose a random letter out of a selection of common letters, and placed it in the first available cell in its grid (searching left to right, top to bottom). When receiving a letter from its opponent, it also places it in the first available cell.

##### Medium Opponent - Greedy Agent

The medium agent would consider its grid with regards to the possibility of creating a word before placing a letter. However, it would do so in a greedy manner. For every cell, it would check if placing any letter there would form a 5 letter word. If not, it would move on to the next cell. If no letter in any cell forms a 5-letter word, repeat the process for 4, and then 3-letter words.

##### Hard Opponent - MiniMax with AlphaBeta Pruning

This algorithm was implemented after finishing the Monte Carlo Search Tree (MCTS) algorithm, to see which of them would be more efficient. The MiniMax algorithm works by traversing a tree, simulating each player's move. It always assumes that each player plays their best with regards to maximizing their score. As traversing the complete game tree would take a really long time and would be computationally infeasible, the algorithm uses AlphaBeta pruning to prune nodes not worthy of expansion. This essentially means not expanding nodes (examining moves) that are not relevant because the other player will not allow the move to be made - given that they are playing optimally.

##### Extreme Opponent - Monte Carlo Tree Search

This adversary works by examining every possible move from the current game state, and simulating a bunch of games from each possible move. The move that results in the most amount of simulated wins after x time, is the move the adversary will make. A benefit of this algorithm is that it can simulate games for as long as we want it to - it can stop its simulations at any time and see what move led to the most wins. For our game we had to make a trade off between waiting time and how difficult we wanted the adversary to be.
