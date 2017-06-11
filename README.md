# Github Team Status Monitor

![current look](https://d2ppvlu71ri8gs.cloudfront.net/items/0b3o3D1U261P3K0l072x/Screen%20Shot%202017-06-10%20at%2011.57.35%20PM.png?v=8f5987e6)

For now, startup is a bit wonky.

```
docker-compose up -d scrounger
cd overwatch
npm install
npm start
```

You'll need to define teams yourself (via postman, for example):
![postman](https://d2ppvlu71ri8gs.cloudfront.net/items/1C2L1x3s0N0m2Z103F2z/Screen%20Shot%202017-06-10%20at%2011.48.17%20PM.png?v=f3fd0f05)

You can enabled the automatic updates by changing `RUN_SCHEDULER` to `True` in `docker-compose.yml`. Alternatively, you may manually hit `0.0.0.0:5000/update` to trigger an update.

Still working on a proper dockerization, and fiddling with auth, which is very
important for this app.