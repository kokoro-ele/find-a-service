/*
 * Firebase Data Structure(Collections)
 */

const Service = [
  {
    srv_id: 'unique', // str, service id 【service id 可以随便定义，我的定义格式是：#srv- 开头】
    category: 'service category', // str, 这个在作业说明中有，种类最好用下拉菜单固定几个类别，然后选
    srv_name: 'Kitchen Cleaning', // str, service name
    description: '', // str, service description
    prv_id: 'unique', // str, provider id 【🚨存 Firebase-Auth的 user.id】
    prv_name: 'Provider Company', // str, provider name
    viedos: ['url'], // array, to dispaly service, optional
    imgs: ['url'], // array, `mandatory`, at least 1 img
    price: 100, // int, service price
    location: {
      txt: 'Highfeild', // str, e.g., service only available within Highfeild
      gps: [lng, lat], // ⚠️ [纬度，经度]，要求根据位置找到服务【用Mapbox的API】
      // 🚨 Serive 这里的 loacation 字段直接通过 prv_id 来获取
    },
    available_time: ['Mon', 'Tue'], // array, 最好 TimePiker 让商家选 【🚨这个格式你定】
    duration: 30, // int, 30min，指定服务预计时长，这个参数将是 request 的时间选择间隔
    total: 5, // int, 同一服务在同一时间段可以被请求的次数（e.g. 清洁工人数）
    rate: 4.5, // float, 服务评分
  },
]

const Request = [
  {
    req_id: 'unique', // str, customer request id
    user_id: 'unique', // str, customer id， 【🚨存 Firebase-Auth的 user.id】
    srv_id: 'unique', // str, 发起请求的时候，根据 srv_name + prv_id 找到 srv_id
    desc: '', // str, description of customers' requirements when they request a service
    req_time: 'timestamp of (DD MM YYYY hh:mm:ss)', // 用时间戳, 用 moment.js [我装到 main 分支，记得拉取一下]
    status: 'pending', // ['pending', 'accepted', 'rejected', 'needDetail', 'completed']
  },
]

const ServiceProvider = [
  {
    prv_id: 'unique', // str, provider id 【🚨存 Firebase-Auth的 user.id】
    prv_name: 'Provider Company', // str, provider name
    description: 'This is the description of Provider Company',
    email: 'prefix@suffix.domain', // str
    //【🚨 不再需要 password字段，这个交给 Firebase-Auth 处理】
    phone: '', // str
    location: {
      txt: 'SO16 3UJ Glen Eyre Hall', // str, provider's address text
      gps: [lng, lat], // array, [纬度,经度] 按照 Mapbox 来
    },
    avatar: 'url', // img url, 商家头像
    imgs: ['url'], // array, 用于呈现商家主页的推销图片（顾客可以点击商家头像，查看商家主页）
  },
]

const Customer = [
  {
    user_id: 'unique', // str, customer id, 【🚨存 Firebase-Auth的 user.id】
    user_name: '', // str, no need to be unique
    email: 'prefix@sufix.domain', // str
    //【🚨 不再需要 password字段，这个交给 Firebase-Auth 处理】
    phone: '', // str
    location: {
      txt: 'Hampton', // str, 用户位置文本
      gps: [lng, lat], // [纬度,经度]，用户定位到当前位置
    },
    avatar: 'url', // img url, 客户头像
  },
]

const Reviews = [
  {
    rvw_id: 'unique', // str, review id
    srv_id: '', // 对应的 service
    author: {
      user_id: 'unique', // str
      user_name: '', // str
      user_avatar: 'url', // img url, 客户头像
    },
    title: '', // str, review title
    content: '', // str, review content
    rate: 5, // int, 0-5, 🌟级评分
    likes: 0, // int, 点赞数👍
    date: 'timestamp of (DD MM YYYY hh:mm:ss)', // 用时间戳, 用 moment.js [我装到 main 分支，记得拉取一下]
  },
]
