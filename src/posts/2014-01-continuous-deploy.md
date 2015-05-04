---
title: Continuous deploy achievement unlocked
date: 2014-01-16
collection: posts
template: post.html
---
I've been working with the Rackspace Cloud Control Panel team for a while now and one of the things that I've learned and I'm proud
to have contributed to is how we shaped the continuous deployment pipeline for the project, which is rather simple if you overlook it
but it's quite intesive when you work with it, and after all it gives me a exhilarating feeling of achievement on every single deploy.

In this post I'll try to share how it works and the details of each step. There several steps before something gets to production,
although it's a lot, all of them are seamless and simple.

We work with a branch pull request method, which for me is one of the best methods to work with when you have distributed teams, this whole
process requires a separate post just to dig through it's details, but for now what matter is we have branches, thousands of them, and a rather particular one
the master branch, which is the production ready code, all other branches are either features or miscellaneous code and all this is piled up on top of Github we're we
create, review and discuss the pull requests.

Our process start when we create a branch with code for a given feature and a pull request for it to be merged into master, the code always contains
tests, which are part of our development process: we have a file system monitor that checks for changes on a give set of files and when it does it
execute a task that runs our unit tests. Once our code is ready we push them to the remote branch on Github, create the pull request and ask our
lovely IRC bot to "build that branch" using the command `!bb <branch_name>`. This will run our fast feedback jobs on jenkins, which include linting, unit
and integration tests, and will also deploy the last commit SHA in this branch to a node (we call it branch node) where basic smoke tests will be run,
if everything is well it marks the pull request as good to be merged, using the Github commit status api.

A pull request [](img)

In order to have this setup, we had to provide several branch nodes (currently 10) and a deploy script that selects which node to deploy to, the script
will always get the same node if previously used in a given branch, and will try to optimize and pick nodes that have not been changed in a while.
Although we had some branch node overrides, is rather rare to occur as we usually don't have 10 or more active pull requests concurrently active, or when
we have it, the branch node is not being used anymore.

When the pull request is reviewed and we got at least one "looks good to me" (LGTM) from the reviewers, we merge it to master. Now our deploys to
production are rather organized, in the past we were used to deploy to production every single merge into master, we then evolved into a more
organized way to deploy. Since merges into master would trigger a whole bunch of acceptance tests, we started to have conflicts in between merges,
tests where been run but for a different SHA, which could make for a false positive build.

To solve that we've decided to split the day into hourly deploys, every hour a jenkins job is triggered: collecting the latest hour merges into master,
deploying it to our environments and running our acceptance tests on it, all this is tracked by the lovely IRC bot, which is responsible of notifying
people who has changes that are possible going to production and how the deploy / testing on the lower environments are going, we also have
radiators (monitoring dashboards) to keep track of this process.

Once all the testing is done, the lovely IRC bot asks the authors of the current changes if it should proceed and deploy the changes to production,
and once everyone agrees by replying "!good", it would trigger the deploy task and once it's done it notifies everyone about it. During this phase
we have ways to prevent a deploy from happening like replying "!bad" to the bot, and we have ways to force the deploy in case the bot fails to ask
for a production deploy.

So in a nutshell:
branch pull request -> build branch checks and review -> merge into master -> wait for the next hourly deploy to lower environments -> deploy to production.

Reverts also goes through the same flow, and behind the scenes there's a lot going on, things like: monitoring of all the environments and its nodes
health, draining of sessions (keep user session alive), fallback node deploy first,

