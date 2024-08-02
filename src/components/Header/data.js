export const menus = [
  {
    title: "About US",
    type: 0,
    link: "/about_us"
  }, {
    title: "About Astrology",
    type: 0,
    link: "/about_astrology"
  }, {
    title: "Forecasting Future",
    type: 1,
    showFocus:true,
    list: [
      {title:"Free Type Question: ₹410 (approx. $5)",price:410},
      {title:"Forecast_1 Month with specific focus area: ₹1230 (approx. $15)",price:1230},
      {title:"Forecast_3 Months with specific focus area: ₹2460 (approx. $30)",price:2460},
      {title:"Forecast_6 Months with specific focus area: ₹5740 (approx. $70)",price:5740},
      {title:"Forecast_12 Months with specific focus area: ₹7380 (approx. $90)",price:7380},
      {title:"Forecast through Numerology & Loshu Grid (In absence of Time of Birth): ₹1640 (approx. $20)",price:1640},
      {title:"Ghost Nullifying Technique: ₹2460 (approx. $30)",price:2460},
      {title:"Match Making and Remedies ₹1230 (approx. $15)",price:1230}
    ]
  },
  {
    title: "Permanent Customer",
    type: 1,
    permanent:true,
    showFocus:true,
    list: [
      {title:"Quarterly Forecast ₹ 3279 (approx. $40)",price:3279},
     {title:"Half yearly forecast ₹ 6149 (approx. $75)",price:6149},
      {title:"Yearly Forecast ₹ 11479 (approx. $140)",price:11479}
    ]
  }, {
    title: "Online Chatting with our Astrologers ",
    type: 0, //chat
    link:"/astrolger_list",
    list: [
      "2 minutes Chat $3.99",
      "5 Minutes Chat $8.99 ",
      "Dynamic Chat (unlimited time): ₹138 per  minutes"
    ]
  }, {
    title: "Focus areas addressed at Glisten Astrology",
    type: 1,
    showFocus:false,
    list: [
      {title:"Love",price:410},
      {title:"Career",price:410},
      {title:"Health",price:410},
      {title:"Finance",price:410},
      {title:"Match Making",price:410},
      {title:"Ghost Nullifying",price:410},
      {title:"Remedies of all kind of problems",price:410},
      {title:"Spells as per Verdic Astrology",price:410}
    ]
  }
]

