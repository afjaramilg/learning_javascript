# modules
## commonJS
the chapter mention other files are loaded when `require()` is called, but it seems this only returns its exports. apparently, `require()` works similary to `eval()` and `Function()`: it takes the raw code, it interprets it within a function, and it returns it's exports. this ofc means that all things inside that module are inside a given scope and will not be visible to the rest of the program.

but of course, one might want to have things in the global scope of the program for some reason. an avenue i DIDNT explore in the code for this section was the `process` variable, specifically its `env` property. i have used `process` before, but i found in `[1]` that modifying it directly contains certain caveats.

an additional advantage of `require()` is it keeps a module cache so that it doesn't reload modules.

## ECMAscript modules
i once again went to the MDN docs to find more info about `import` (`[2]`). it seems it got integrated into the browser with firefox 60 (2018). i found this to be relatively recent and so i looked into transpiler options, and it indeed is something that is commonly handled.


## other
### webpack shenannigans
i found a stackoverflow answer about modular web-apps (`[3]`). its recommendation is to use webpack and other frameworks to achieve this and just use `require()` on top of it. i dislike this approach in a context which doesn't have frameworks. if language features are there, we should use them, not to mention the various disadvantages to `require()` mentioned in the book. 

the top responder suggested people use webpack. i've dealt with webpack to some capacity and have found it CAN be hard to configure it properly and to keep possible pit-falls in mind, tho this configuation provides new performance optimization opportunities which i personally find appealing.

additionally, just to further shit on that stackoverflow answer, i found a medium article (`[4]`) which portrays one of the common webpack pit-falls i had seen in the past, and in this case it is caused by using `require()`.


### including multiple files using html
it appears the 'traditional' way of having javascript code split into several files was simply by manually writing `<script>` tags that called each one of these files in the correct order. 

in a way, this is not so different from the way C does it, but it almost seems to enforce the condition that code in other files cant be code that runs, and rather just utilities (at least to guarantee that its always error free). this is similar to how in most compiled programming languages you're only allowed one `main()` function. 

on the other hand, unlike C, i dont think javascript has a linker, nor does it allow things to just be declared. with C, as long as you write self-contained headers that dont require other headers to compile, all you have to care about is having all your `.o's`


### global scopes: nodejs and javascript
i tried seeing how one could create inter-module global variables in nodejs and the browser respectively. 


## bibliography
1. `https://nodejs.org/api/process.html#processenv`
2. `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules`
3. `https://stackoverflow.com/questions/6971583/node-style-require-for-in-browser-javascript`
4. `https://insights.untapt.com/webpack-import-require-and-you-3fd7f5ea93c0`
5. `https://medium.com/codex/global-variables-and-javascript-modules-ce674a869164`

