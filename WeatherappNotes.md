## Learningss

### Tech stack

These are my learnings from making this weather app. I was initially going to pick a bit complicated stack with - Reactquery, Typescript and Recoild but it was adding complexity for a simple application I am thinking of building. I will try to inculcate TS once I am done with making it in JS, that way, I will get a bit more idea on where and how to make changes (because TS has a lot of features). <br>
Current tech stack - React and Tailwind

### Adding icons to placeholder

I ran into a problem when I wanted to add the search icon too along with my placeholder. The search icon is an SVG tag so we cannot exactly use it in the placeholder. <br>
First approach that I found on SO was to use the unicode value for the search icon - "&#xF002", but this did not really work in the browsers. It just showed a box. <br>
The second approach involved using positioning. So we have the main div with relative positioning and then the search icon had an absolute positioning, coming on top of the search bar.
