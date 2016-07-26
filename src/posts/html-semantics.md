---
title: HTML Semantics
date: 2016-07-26
collection: posts
draft: true
layout: post.html
---

Not long ago, when pages looked like a complete mess of elements such that it was incomprehensible, people started
talking about semantic HTML. Fast-forward today, we still have the same problem with little to no evolution on this topic,
even though there is plenty of sources to claim that a clean understandable code is essential to a developer's life.

The HTML markup language has been marginalized since it's creation as one of it's purpose was to decouple the
UI (User Interface) from the web application and logic behind it, the logic and application being the most important
piece of the software during that time. HTML was, since then, not treated equally as important as most first
class languages, most notably when it comes to semantics.

Only a few years back that the IT industry realized that the UI is as important as the whole thing behind it,
and some important changes that enabled more semantic code was introduced. Although it seemed like a revolution
not many changes was observed on the codebases: we have now pretty websites but with a ugly complex HTML code.

Let me bring some examples to the table, ideally when I look at the source code of a web page I would
like to be able to understand exactly what a given piece of code will generate in the browser, instead I often
get tangled and find myself counting how many `div`s that piece of code has. Sometimes I even try to get a clue
by looking at the `class` attribute and even that it's not clear. It's also common to find things like `class="span4"`
or `class="well"` out there, which by the way are real live examples of one of the most used UI frameworks.

Another thing that bothers me are those "Getting Started" tutorials, while I understand the purpose is not
to showcase HTML, there's no harm in being semantic and using `<ul>` or `<ol>` instead of a `<div class="list">`,
or using `<header>` instead of `<div class="header">` and many other bad examples. What bothers me it's not the non
semantic HTML, but it being part of tutorial that a lot of new developers will read and take those examples for
granted as practices, and further increasing the number of less semantic websites and codebases.

Now people usually asks me, what's wrong with a lot of `div`s or weird class names, and my answer is always
"Nothing, until you have to do some changes on it". There's no doubt that it's increasingly hard to maintain
an ever growing codebase when itself is not ubiquitous, everyone that had to re-factor a big complex dubious codebase will sympathize,
and for me that was literally every HTML codebase I worked with.

It's not hard to write semantic HTML, start by taking a look at the new tags introduced by HTML5, then checkout
examples of how and when to better use them, the [MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
guide is a good place to go. But most importantly: HTML is code and the way you organize, clean and
carefully name things within your code matters.
