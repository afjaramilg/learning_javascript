# [mdn http tutorial](https://developer.mozilla.org/en-US/docs/Web/HTTP)

## identifying resources on the web
every resource has a URI, of which the most common type is the URL, which is a web address. 

the whole domain of a URL is also called the authority. 

you can specify parameters after the path of the resource in the URL by using a key-value syntax, like so: `?key1=value1&key2=value2`. 

fragments are anchors to points in the document, they are used by the browser to re-position the user in that location, tho these are never actually sent to the server along with the request.

## data URLS
i dislike the way the mdn article is written. fortunately, i found that the guy with the habbo avatar had also written one `[7]`. an obvious thing highlihted in his article that went over my head completely when reading the mdn one is that embedding a file into the html itself means you dont have to fetch it with another request. it also mentions that you can use them inside css. 

## mime types
i am interested in playing around with the type parameter more, maybe accessing its values and so on. `[8]` points out a way to get it from inside javascript on the client.

## connection management in http/1.x
apparently connection management is a big deal in terms of performance of a web application. i thought it was worth noting that settings for connection management apply only from hop to hop, not end to end, so a proxy might change the mode of communication on the last step.

another important note:
> Not all types of HTTP requests can be pipelined: only idempotent methods, that is GET, HEAD, PUT and DELETE, can be replayed safely 


## other
i find it to be worth noting that one of the performance disadvantages of HTTP/1.0 is that it opens a new TCP connection for every request/response pair, which in itself takes several round-trips. it'd be interesting to make an experiment where you compare the different speeds using a request-intensive task.

i found more information related to the different major versions of HTTP, but that in itself might take several days to read through it all. 

it might be worth going over all the http methods to think up experiments that showcase all of them, you can find that in `[5]`.

i looked up a performance comparison between the `XMLHttpRequest` and `fetch` APIs `[6]`.

## bibliography
<!--http connection related stuff...-->
1. [http pipelining in wikipedia](https://en.wikipedia.org/wiki/HTTP_pipelining)
2. [connection management in http/1.x](https://developer.mozilla.org/en-US/docs/Web/HTTP/Connection_management_in_HTTP_1.x)
3. [multiplexing in http/2.0](https://stackoverflow.com/questions/36517829/what-does-multiplexing-mean-in-http-2)
4. [more http/2.0](https://web.dev/performance-http2/)
5. [all http methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
6. [`XMLHttpRequest` and `fetch`](https://gomakethings.com/the-fetch-api-performance-vs.-xhr-in-vanilla-js/)
7. [data urls](https://flaviocopes.com/data-urls/)
8. [get mime type](https://stackoverflow.com/questions/12256134/how-to-know-mime-type-or-content-type-of-current-loaded-page-via-javascript)
9. [HOL blocking in pipelining](https://en.wikipedia.org/wiki/Head-of-line_blocking)
