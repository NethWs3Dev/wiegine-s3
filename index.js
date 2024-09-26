const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.set("json spaces", 4);
function userAgent() {
  const version = () => {
    const android = Math.floor(Math.random() * 14) + 1;
    if (android <= 4) {
      return "10";
    }
    if (android === 5) {
      const ver = ["5.0", "5.0.1", "5.1.1"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 6) {
      const ver = ["6.0", "6.0.1"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 7) {
      const ver = ["7.0.1", "7.1.1", "7.1.2"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 8) {
      const ver = ["8.0.0", "8.1.0"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else {
      return android;
    }
  }
  const ua1 = `Mozilla/5.0 (Linux, Android ${version()}; ${randomize("xxx-xxx").toUpperCase()}; Build/${randomize("xP1A.xxxxxx.0x6").toUpperCase()}; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/107.0.5304.36 Mobile Safari/537.36[FBAN/EMA;FBLC/en_US;FBAV/415.0.0.2.100;])`;
  const ua2 = `Mozilla/5.0 (Android ${version()}; ${randomize("xxx-xxx").toUpperCase()}; Mobile; rv:61.0) Gecko/61.0 Firefox/68.0`;
  const ua3 = `[FBAN/MQTT;FBAV/416.0.0.2.102;FBBV/621289759;FBDM/{density=1.5,width=540,height=960};FBLC/en_PH;FBCR/;FBMF/HUAWEI;FBBD/HUAWEI;FBPN/com.facebook.lite;FBDV/${randomize("xxx-xxx").toUpperCase()};FBSV/${version()};FBLR/0;FBBK/1;FBCA/arm64-v8a;]`
  return [ua1, ua2, ua3];
} 
function randomize(neth) {
  let _=Math.random()*12042023;
  return neth.replace(/[xy]/g,c=>{
    let __=Math.random()*16; 
    __=(__+_)%16|0;_=Math.floor(_/16);
    return[(c==='x'?__:(__&0x3|0x8)).toString(16)].map((_)=>Math.random()<.6?_:_.toUpperCase()).join('');
  });
}

function dummyCookie() {
  const sarap = `datr=${randomize("xxxxxxxxxxx_xxxxxxxxxxxx")};` +
    `sb=${randomize("xxxxxxxxxxxxxx-xxxxxxxxx")};` +
    `m_pixel_ratio=1.5;` +
    `ps_n=1;` +
    `ps_l=1;` +
    `locale=en_US;` +
    `wd=360x520;` +
    `fr=${randomize("xxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxx..xxx.A.A.xxxxx.xxxxxxxxxxx")};` +
    `c_user=1000${Math.floor(Math.random()*91251604995)};` +
    `xs=32%3An2wXMy3811cnYA%3A2%3A${Math.floor(Math.random()*1713515009)}%3A-1%3A-1;` +
    `vpd=v1%3B520x360x1.5;` +
    `fbl_st=${Math.floor(Math.random()*100000000)}%3BT%3A20002000;` +
    `wl_cbv=v2%3Bclient_version%3A2547%3Btimestamp%3A17198225555`;
   return sarap;
}


app.use(express.static(__dirname+"/public"));

app.get("/", async(req, res) => {
  return res.sendFile(__dirname+"/public/index.html");
});

app.get("/cpuptime", async(req,res) => {
  return res.json({
      running: os.uptime(),
      cpu: os.cpus(),
      memory: `${os.freemem()+" MB"} available of ${os.totalmem()+" MB"}`
    });
})

app.get("/useragent", async(req, res) => {
  const ua = userAgent();
  return res.json({
    ua
  });
});
app.get("/nglspam", async(req,res) => {
  const {username, amount, message} = req.query;
  if (!username||(!amount||isNaN(amount)||amount<=0)||!message){
    return res.json({
      error: "Enter a valid username / amount / message."
    });
  }
  async function spam(username, amount, message) {
    const headers = {
      'referer': `https://ngl.link/${username}`,
      'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    };
  
    const data = {
      'username': username,
      'question': message,
      'deviceId': randomize('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx').toLowerCase(),
      'gameSlug': '',
      'referrer': '',
    };
  
    let count = 0;
  
    const interval = setInterval(async () => {
      if (count >= amount) {
        clearInterval(interval);
        return;
      }
  
      try {
        await axios.post('https://ngl.link/api/submit', data, {
          headers,
        });
        //console.log(`Sent`);
      } catch (e) {
        //console.log('Test');
      }
      count++;
    }, 3 * 1000);
  }
  await spam(username, amount, message);
    return res.json({
    msg: "Success spam to target ngl link: @" + username
  })
});
app.listen(port, async () => {
  console.log(`Wiegine Echavez`);
  console.log(`Running: http://localhost:${port}`);
});
process.on("unhandledRejection", async (reason, p) => {
  console.error(reason);
});
