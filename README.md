# The Minimax Algorithm

### in game theory
The maximin value of a player is the largest value that the player can be sure to get without knowing the actions of the other players; equivalently, it is the smallest value the other players can force the player to receive when they know his action.

The player running the algorithm is the maximizing player

```
01 function minimax(node, depth, maximizingPlayer)
02     if depth = 0 or node is a terminal node
03         return the heuristic value of node

04     if maximizingPlayer
05         bestValue := −∞
06         for each child of node
07             v := minimax(child, depth − 1, FALSE)
08             bestValue := max(bestValue, v)
09         return bestValue

10     else    (* minimizing player *)
11         bestValue := +∞
12         for each child of node
13             v := minimax(child, depth − 1, TRUE)
14             bestValue := min(bestValue, v)
15         return bestValue
```
```
(* Initial call for maximizing player *)
minimax(origin, depth, TRUE)
```
sources: https://en.wikipedia.org/wiki/Minimax

