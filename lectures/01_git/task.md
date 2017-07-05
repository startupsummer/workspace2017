## Lecture task

## Objective

The main goal of this task is to learn basic git commands + github pull request workflow

# Task

1. Create your own ssh key and connect it with your github account
2. Create github repository and clone it to your computer
3. Create file `file.txt`
4. Add random sentence from [here](https://randomwordgenerator.com/sentence.php)
5. Commit your changes
7. Put your full name to the end of `file.txt`(second line)
8. Stash changes
9. Create and checkout to the branch `solid-train`
10. Pop stash and commit it
11. Checkout to the master branch
12. Change your sentence to another, also from [here](https://randomwordgenerator.com/sentence.php)
13. Commit
14. Push `master` and `solid-train` branches
15. Create pull request from `solid-train` to `master`(it should contain conflicts)
16. Resolve conflicts locally and push it again(at the end, `file.txt` should contain only your full name)
18. Merge pull request(on github)
19. Checkout to `master` branch and pull latest changes
20. Inspect `git log master` and compare it with `git log solid-train`. Compare commit hashes and explain yourself commits sequence on `master` branch.
21. Clone this repository. Checkout to the new branch firstname-lastname. 
22. Create new file `lectures/01_git/{firstname-lastname.txt}`.
23. Put link to your repository and make pull request to master branch.
