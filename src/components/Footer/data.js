import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box } from '@mui/system';
import { Facebook, Instagram, Linkedin, SnapChat, Twitter, Youtube } from 'assets';
import LinkedIn from '@mui/icons-material/LinkedIn';
export const menus = [
  {
    title: "Our Services: Fixed Inquiries/Forecasts",
    list: [
      "Free Type Question: ₹ 410 (approx. $5)",
      "Forecast_1 Month with specific focus area: ₹1230 (approx. $15)",
      "Forecast_3 Months with specific focus area: ₹2460 (approx. $30)",
      "Forecast_6 Months with specific focus area: ₹5740 (approx. $70)",
      "Forecast_12 Months with specific focus area: ₹7380 (approx. $90)",
      "Forecast through Numerology & Loshu Grid (In absence of Time of Birth): ₹1640 (approx. $20)",
      "Ghost Nullifying Technique: ₹2460 (approx. $30)",
      "Match Making and Remedies ₹1230 (approx. $15)"
    ]
  },
  {
    title: "Our Permanent Subscriptions",
    list: [
      "Quarterly Forecast ₹3279 (approx. $40)",
      "Half yearly forecast ₹6149 (approx. $75)",
      "Yearly Forecast ₹11479 (approx. $140)"
    ]
  }, {
    title: "Online Chatting with our Astrologers ",
    list: [
      "Dynamic Chat  ₹138(approx. $1.5) per  minute"
    ]
  }, {
    title: "Focus Areas",
    list: [
      "Love",
      "Career",
      "Health",
      "Finance",
      "Match Making",
      "Ghost Nullifying",
      "Remedies of all kind of problems",
      "Spells as per Verdic Astrology"
    ]
  }, {
    title: "Corporate Info",
    corporate: true,
    list: [
      { title: "About Us", link: "about_us" }, { title: "Pricing Policy", link: "price_policy" }, { title: "Refund and cancellation", link: "refund_policy" }, { title: " Terms and conditions", link: "terms" }, { title: "Disclaimer", link: "desclaimer" }
    ]
  }, {
    title: "Contact Us",
    list: [
      "Whatsapp: +91 8219888758",
      "Email ID: glistenastrology1968@gmail.com",
    ]
  }, {
    title: "Links",
    type: "icons",
    list: [
      <Box sx={{ width: "auto", height: { laptop: 50, mobile: 30 }, }} onClick={() => window.open(" https://www.facebook.com/glistenastrology/", "blank")} component="img" src={Facebook} ></Box>,
      <Box sx={{ width: "auto", height: { laptop: 50, mobile: 30 }, }} component="img" src={Instagram} onClick={() => window.open("https://www.instagram.com/glistenastrology/", "blank")} ></Box>,
      <Box sx={{ width: "auto", height: { laptop: 50, mobile: 30 }, marginRight: 2 }} component="img" src={Twitter} onClick={() => window.open("https://twitter.com/GlistenAstro", "blank")} ></Box>,
      <Box sx={{ width: { laptop: 50, mobile: 30 }, height: "auto", marginTop: 1 }} component="img" src={Youtube} onClick={() => window.open("https://www.youtube.com/channel/UCfSia0RKlWjFN9bUXq_a7Zw", "blank")}></Box>,
      <Box sx={{ width: "auto", height: { laptop: 50, mobile: 30 }, marginLeft: 1 }} component="img" src={Linkedin} onClick={() => window.open("https://www.linkedin.com/in/glisten-astrology/", "blank")} ></Box>,
      <Box sx={{ width: "auto", height: { laptop: 50, mobile: 30 }, marginLeft: 1 }} component="img" src={SnapChat} onClick={() => window.open("https://www.snapchat.com/add/glistenastro?share_id=MPo3Ax0Mdds&locale=en-US", "blank")} ></Box>,
    ]
  },
  {
    title: "Payment Modes",
    list: [
      "Wallet",
      "Debit/Credit Card"
    ]
  }
]

