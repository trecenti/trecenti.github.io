---
title: Continuous deploy, achievement unlocked
date: 2014-05-05
collection: posts
template: post.html
---
I've been working with the Rackspace Cloud Control Panel team for a while now and one of the things that I've learned and I'm proud
to have contributed to is how we shaped the continuous deployment pipeline for the project. The whole system may be simple if you overlook it,
but in fact is quite complex under the hood, and after all it gives me a exhilarating feeling of achievement on every single deploy.

In this post I'll try to share how it works and the details of each step. To start off, there are several steps before any code gets to production,
although it's a lot, all of them are seamless and simple.

We work with branch pull requests, which for me is one of the best methods to work with when you have distributed teams, this
process requires a separate post just to dig through it's details, but for now what matter is that we have branches and a very particular one:
the master branch, which is the production ready code, all other branches are either features or miscellaneous code.

Our process start when we create a branch with code for a given feature and a pull request for that branch to be merged into master, the code always contains
tests, which are part of our development process that uses Karma test runner extensively. Once our code is ready we push them to the remote feature branch,
create the pull request and ask our lovely IRC bot to "build that branch" using a command `!bb <branch_name>`. This will run our fast feedback jobs on our CI,
which include lint, unit and integration tests, and will also deploy the last commit SHA for this branch to a node that starts application (we call it branch node)
where basic smoke tests will be run, if everything is well it marks the pull request as good to be merged.

In order to have this setup, we had to provision branch nodes (currently 10) and a deploy script that selects which node to deploy to, the script
will always get the same node if previously used in a given branch, and will try to optimize and pick nodes that have not been changed in a while.

When the pull request is reviewed and we got at least one "looks good to me" (LGTM) from the reviewers, we merge it to master and this trigger the
same fast feedback jobs on our CI except for the deploy on branch node, instead this SHA is allocated for a future deploy to prod, hold to that info.

In the past we were used to deploy to production every single merge into master, we then started using a different way to deploy because of conflicts
in the acceptance test runs which could output false positive green build.

To solve that we've decided to have hourly deploys: every hour a job is triggered collecting the latest commit SHA allocated to be deployed (remember),
it would them deploy it to our lower environments (staging, preview, pre-prod) and run our acceptance tests on it,
all this is tracked by the lovely IRC bot, which is responsible of notifying people who has changes that are possibly going to production and
how the deploy and tests on the lower environments are going, we also have radiators with dashboards to keep track of tests health.

Once all tests are done, the lovely IRC bot asks the authors of the current changes if it should proceed and deploy the changes to production,
and once everyone agrees by replying this build is good (using the command `!good`), the bot would trigger the deploy task and once it's done it
notifies everyone about it. During this phase we have ways to prevent a deploy from happening like replying "!bad" to the bot, and we have ways
to force a deploy in case the bot fails to ask for a production deploy.

So in a nutshell:
branch pull request -> build branch checks and reviews -> merge into master -> wait for the next hourly deploy to lower environments -> deploy to production.

Reverts also goes through the same flow, and behind the scenes there's a lot going on, things like: monitoring of all the environments and its nodes
health, draining sessions (keep user session alive), off-cycle node deploy first, log metrics and tracking, etc. All this carefully crafted by our teams
to provide the best experience for the end user and the developers.

Concluding, this process established for this project is for me the perfect example of one item in the agile manifesto "People and interactions over
process and tools", we managed to keep our interactions and the team (even with a bot being part of it) as the most valuable thing
while using a process and tools to help us achieve better results.
