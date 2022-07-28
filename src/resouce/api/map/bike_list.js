import Mock from "mockjs"
Mock.setup({
  timeout: 1000
})
Mock.mock("bikeList.php", "post", function (option) {
  // console.log(JSON.parse(option.body).params.page, "123123sf");
  // let data = JSON.parse(option.body).params.page
  // console.log(JSON.parse(option.body), "创建bikeList页后端测试接收数据");
  return Mock.mock(
    {

      "code": 0,
      "result": {
        "total_count|30-100": 100,
        "bike_list": ["116.356619,40.017782", "116.437107,39.975331", "116.34972,40.070808", "116.323849,39.964714", "116.404912,40.015129", "116.365243,39.958078"],
        "route_list": ["116.353101,40.067835", "116.357701,40.053699", "116.374086,40.027626", "116.397801,40.01641"],
        "service_list": [{
          "lon": "116.274737",
          "lat": "40.139759",
          "ts": null
        },
        {
          "lon": "116.316562",
          "lat": "40.144943",
          "ts": null
        },
        {
          "lon": "116.351631",
          "lat": "40.129498",
          "ts": null
        },
        {
          "lon": "116.390582",
          "lat": "40.082481",
          "ts": null
        },
        {
          "lon": "116.38742",
          "lat": "40.01065",
          "ts": null
        },
        {
          "lon": "116.414297",
          "lat": "40.01181",
          "ts": null
        },
        {
          "lon": "116.696242",
          "lat": "39.964035",
          "ts": null
        },
        {
          "lon": "116.494498",
          "lat": "39.851306",
          "ts": null
        },
        {
          "lon": "116.238086",
          "lat": "39.848647",
          "ts": null
        },
        {
          "lon": "116.189454",
          "lat": "39.999418",
          "ts": null
        },
        {
          "lon": "116.244646",
          "lat": "39.990574",
          "ts": null
        },
        {
          "lon": "116.281441",
          "lat": "40.008703",
          "ts": null
        },
        {
          "lon": "116.271092",
          "lat": "40.142201",
          "ts": null
        },
        {
          "lon": "116.271092",
          "lat": "40.142201",
          "ts": null
        }
        ]
      }
    }
  )
})






