import Mock from 'mockjs';
Mock.setup({ timeout: 2000 });
Mock.mock('detail.php', 'post', function (option) {
  let data = JSON.parse(option.body)
  console.log(data,'data');
  // console.log(data, 'page');
  // let da = new Date(Date.now())
  // let time = da.getFullYear() + '-' + (da.getMonth() + 1) + '-' + da.getDate();
  return Mock.mock(
    {
      "code": "0",
      "msg": "",
      "result": {
        "status": data.params.status,
        "order_sn": data.params.order_sn,

        "bike_sn": data.params.bike_sn,
        "mode|1-2": 1,
        "start_location": "北京市昌平区回龙观东大街",
        "end_location": "北京市海淀区奥林匹克公园",
        "city_id": 1,
        "mobile": "13597482075",
        "user_name": data.params.user_name,
        "distance": data.params.distance,
        "bike_gps": "116.398806,40.008637",
        "start_time": 1521865027000,
        "end_time": 1521865251000,
        "total_time": 224,
        "position_list": [{
          "lon": 116.361221,
          "lat": 40.043776
        }, {
          "lon": 116.363736,
          "lat": 40.038086
        }, {
          "lon": 116.364599,
          "lat": 40.036484
        }, {
          "lon": 116.373438,
          "lat": 40.03538
        }, {
          "lon": 116.377966,
          "lat": 40.036263
        }, {
          "lon": 116.379762,
          "lat": 40.03654
        }, {
          "lon": 116.38084,
          "lat": 40.033225
        }, {
          "lon": 116.38084,
          "lat": 40.029413
        }, {
          "lon": 116.381343,
          "lat": 40.021291
        }, {
          "lon": 116.381846,
          "lat": 40.015821
        }, {
          "lon": 116.382637,
          "lat": 40.008084
        }, {
          "lon": 116.398806,
          "lat": 40.008637
        }],
        "area": [{
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
        ],
        "area_list": null,
        "npl_list": [{
          "id": 8265,
          "name": "北辰世纪中心-a座",
          "city_id": 1,
          "type": 3,
          "status": 0,
          "map_point": "116.39338796444|40.008120315215;116.39494038009002|40.008177258745;116.39496911688|40.006268094213;116.39512457763|40.004256795877;116.39360214742|40.004222412241;116.39357190147|40.005075745782;116.39351397873|40.005836165232;116.39338796444|40.008120315215",
          "map_point_array": ["116.39338796444|40.008120315215", "116.396053|40.008273", "116.396448|40.006338", "116.396915|40.004266", "116.39192|40.004072", "116.391525|40.004984", "116.391381|40.005924", "116.391166|40.007913"],
          "map_status": 1,
          "creator_name": "赵程程",
          "create_time": 1507863539000
        }]
      }
    }
  )
})







