# Web performance monitoring with Prometheus and Grafana

## What is it?

This is a proof of concept that shows how web perfomance monitoring can be done. Here, I'm using:

- [Vue3](https://vuejs.org/) in a simple frontend application
- [NodeJS](https://nodejs.org/en) and [Express](https://www.npmjs.com/package/express), in a simple web API
- [Prometheus](https://prometheus.io/), as the time-series metrics recorder
- [Grafana](https://grafana.com/), as the dashboard tool to show the data
- [Alert Manager](https://prometheus.io/docs/alerting/latest/alertmanager/), as a notification tool
- [Docker](https://www.docker.com/), to run everything in containers

## Configuration

To run this project, you have to do the following:

- Create a Telegram bot, following [this tutorial](https://core.telegram.org/bots/tutorial)
- Get from the retrieved bot data the chat ID, and the bot token
- With the chat ID and the bot token in hands, go to `infrastructure/alertmanager.yml` and put there the values in the respective fields
- Go to `infrastructure` folder, and run `docker-compose up -d` in a bash terminal

## How to simulate the behaviour

In a new Chrome tab, open a dev tools, and then access the frontend, through [this url](http://localhost:5175/). Once you have access to the frontend, click in any place of the page, to generate the FID and LCP metrics. After generate these two metrics, you can click in another tab of Chrome, and then come back to the frontend. This is the way used to generate the CLS metric. Check if the metrics are logged in the console. If they are there, all good, the metrics were gathered and sent to the backend

After you do these operations, you can open [Prometheus](http://localhost:9090/) or the [metrics endpoint](http://localhost:3001/metrics), to check the metrics you have received from the frontend.

At the same time, if you access [Grafana](http://localhost:3000/) using `admin` as user and password, you should be able to see an already configured dashboard. To easy your life, you just have to open [this URL](http://localhost:3000/dashboards), after the login

Considering you have configured your `chat_id` and your `bot_token` in your `alertmanager.yml`, and you have a high Web Vitals metric, at this point you should receive a notification in a Telegram bot you have created

## Remarks

This proof of concept doesn't fit all the cases in the market. It's just an example how you can track the performance of your website. It's obvious that get notifications about all the navigations in a website is impossible. But configuring an alert policy like "notify me if the proportion of all high LCPs is greater than 60% of all navigations, in a period greater than 5 minutes", is a feasible thing.

## Conclusion

If you have some improvement for this proof of concept, just open a pull request, and I'll check it. Your ideas are full welcomed!
