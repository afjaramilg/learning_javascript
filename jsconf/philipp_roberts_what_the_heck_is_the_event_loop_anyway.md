# What the heck is the event loop anyway? | Philip Roberts | JSConf EU
- the event loop is not part of the v8 engine but a part of the browser
- he mentions briefly that webapis act basically like threads. i found a list of all the different webAPIs `[1]` and the inmediate question that comes to mind is: can i treat all the function ones as starting a separate thread? a question in stackoverflow says "yes" `[2]`. later on i will have to spend time playing with all those webAPIs to see what is up.
- when you use one of these webAPIs, the callback function doesnt move to the stack (duh) but to a separate space. is there one such space for every webAPI? if not, which ones of them do have one?
- when webAPIs are done, they push the callback into the task queue. the event loop is the thing in charge of looking for an opportune moment to put the callback back in the stack




# bibliography
1. [list of all webapis](https://developer.mozilla.org/en-US/docs/Web/API)
2. [question asking about webapis and threads](https://stackoverflow.com/questions/50283281/do-the-javascript-web-apis-run-on-a-different-thread-than-the-call-stack-thread)
3. [the guy made an event loop visualizer](http://latentflip.com/loupe)
4. [webapi tutorial](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction)
