# Jake Archibald: In The Loop - JSConf.Asia
## things in the event loop
the event loop treats render steps differently. these steps include:
- style calculation: figuring out what css applied to what
- layout: creating a render tree. read more about that specifically in `[1]`
- actually painting 


## the flashing lines
in the talk he mentions these two lines can not cause flashing:
```javascript
document.body.appendChild(el);
el.style.display = 'none';
```
he says its because the event loop will always run a task to completion before it moves on. i guess he was referring to the possibility of having the render steps occur in-between lines, so that the element would appear in the dom visually before it got made invisible shortly after. however, as confirmed by several videos, the stack in this case would still have things to execute, so the event loop would not move on to render steps.

## requestAnimationFrame `[2]`
the prefered way to do animations using callbacks. if you instead animate by repeatedly queueing asynchronous animation functions youll find it clogs up the event-loop and rendering functions get a turn less often as a result.
```javascript
// cringe
function callback() {
    moveAnimation();
    setTimeout(callback, 0);
}
callback();
```

```javascript
// cool
function callback() {
    moveAnimation();
    requestAnimationFrame(callback);
}
callback();
```

TODO: experiment with this using a loop instead of recursion, maybe with a generator?

requestAnimationFrame also runs before the three aforementioned render steps always. this has some implications if you have successive animations based on changin the properties of dom elements. beware of the order code will execute in if you've put instructions that change the dom before a requestAnimationFrame. in the talk, he seems to "delay" execution in such a case by wrapping requestAnimationFrame inside another requestAnimationFrame, i imagine that is so that when the first layer executes, all it does is "shove" the inner one by one iteration. see `[9]` for details on the order in which subsequent calls to this function are executed.




## setTimeout betrug
setTimeout will not necessarily use 0ms as a timeout even if you specify it, its implementation defined, usually its 4.7ms

## look more into messageQueues and microtasks `[3,4,5]`
in his talk he mentioned something about simulating timeout = 0 using messagequeues and something called queuetask. i looked into these a little bit but theyre certainly a thing of their own. that also took me to microtasks and webworkers.

## render step speed and execution
render steps wont happen faster than what the screen can show you, the event loop apparently knows this. also, all render steps wont happend everytime.

## task order
according to archibald, tasks are executed in the other they are queued. i think i will make a clarification to myself here of what i think i understand. i think when he says "queued" here he would be specifically referring to the task queue rather than the order in which they appear in the code, cuz that wouldnt make any sense.

## other `[6,7,8]`
i found some stack overflow questions about various stuff related to what blocks and doesnt block js execution. im sure there's a billion more caveats like these but idk how to look for me. at any rate its a good opportunity to get some ideas of the kinda stuff you wanna be ready for.


# bibliography
1. [render trees](https://web.dev/critical-rendering-path-render-tree-construction/) 
2. [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
3. [using channel messaging](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API/Using_channel_messaging)
4. [microtasks and js](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)
5. [microtasks](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)
6. [dom blockage](https://stackoverflow.com/questions/47342730/javascript-are-dom-redraw-methods-synchronous)
7. [wonderful blockage by alert](https://stackoverflow.com/questions/52325435/why-blocking-event-loop-does-not-block-css-animation/52326008)
8. [more alert blockage](https://stackoverflow.com/questions/41346772/how-do-i-know-when-html5-canvas-rendering-is-finished/41347460#41347460)
9. [order of execution for requestAnimationFrame](https://stackoverflow.com/questions/34904470/requestanimationframe-processing-sequence)
