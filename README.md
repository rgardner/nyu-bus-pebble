# nyu-bus-pebble
A Pebble app for the NYU Bus Schedule.

![NYU Bus B](/assets/nyu-bus-b.png?raw=true "NYU Bus B")


## Installation
1. Create an account on [Cloud Pebble](https://cloudpebble.net/ide/).
2. Create a new *Simply.js* project.
3. Select the *GITHUB* tab on the left and enter this url:
   https://github.com/rgardner/nyu-bus-pebble.git
4. Click on *PULL LATEST COMMIT*.


## Adding More Routes
1. Create an account on [PDF Tables](https://pdftables.com/). From their API,
   you can convert 500 *pdfs* for free. If you know a better way to convert
   tables in *pdfs* to *json* files, please open an issue - I'd love to know.

My goal is to have all the routes in the system by the time this project hits
1.0. However, NYU bus routes are subject to change so it is important to know
how to update the routes as quickly and painlessly as possible. **I do not want
anyone to have to manually convert the route pdf files into a more usable
format.** To aid in this, I have written a number of scripts in the *util*
directory to convert *pdfs* to *json* files.

To convert a *pdf* into a *json* file, use the `pdftojson` script:
```bash
./pdftojson "file.pdf" >file.json
```

If you want to convert many *pdfs* at once, put them in the `routes` directory
and run: `./routestojson`, which will output the corresponding *json* files
into the `data` directory.

**Unfortunately, you are not done.** Because the NYU route pdfs have poorly
formatted table headers, you still need to name each of the bus stops in the
output *json* files. The keys *stop0*, *stop1*, etc. should correspond to the
first, second, etc. bus stops in their corresponding *pdfs*, but please confirm
by checking the first few bus times.
