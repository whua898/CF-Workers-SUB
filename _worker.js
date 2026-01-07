var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js whua
var mytoken = "auto";
var guestToken = "";
var BotToken = "";
var ChatID = "";
var TG = 0;
var FileName = "CF-Workers-SUB";
var SUBUpdateTime = 6;
var total = 99;
var timestamp = 41023296e5;
var MainData = ``;
var urls = [];
var subConverter = "subconverter.wh8.xx.kg"; //【修改】默认后端改为你的
var subConfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_MultiCountry.ini";
var subProtocol = "https";

// 判断是否为IP地址的正则表达式
function isIpAddress(url) {
  try {
    const hostname = new URL(url).hostname;
    // 简单检查是否为IP地址格式
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(hostname);
  } catch (e) {
    return false;
  }
}
__name(isIpAddress, "isIpAddress");

// 从URL获取内容
async function getSUB(urls) {
  const results = [];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const content = await response.text();
        results.push(content);
      } else {
        console.error(`Failed to fetch: ${url}, status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error fetching URL: ${url}`, error);
    }
  }
  return results.join('\n');
}
__name(getSUB, "getSUB");

// 通过subconverter获取GCP节点内容
async function getGCPNodes(gcpUrls) {
  if (gcpUrls.length === 0) return '';

  const combinedUrl = gcpUrls.join('|');
  const subconverterUrl = `${subProtocol}://${subConverter}/sub?target=mixed&url=${encodeURIComponent(combinedUrl)}&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;

  try {
    const response = await fetch(subconverterUrl);
    if (response.ok) {
      return await response.text();
    } else {
      console.error(`Failed to fetch from subconverter: ${subconverterUrl}, status: ${response.status}`);
      return '';
    }
  } catch (error) {
    console.error('Error fetching from subconverter:', error);
    return '';
  }
}
__name(getGCPNodes, "getGCPNodes");

var worker_default = {
  async fetch(request, env) {
    const userAgentHeader = request.headers.get("User-Agent");
    const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";
    const url = new URL(request.url);
    
    const urlPath = url.pathname.split("/").filter(p => p);
    let token = url.searchParams.get("token");
    let subKey = "main";

    if (urlPath.length === 1) {
        token = token || urlPath[0];
        subKey = "main";
    } else if (urlPath.length >= 2) {
        subKey = urlPath[0];
        token = token || urlPath[1];
    }
    
    mytoken = env.TOKEN || mytoken;
    BotToken = env.TGTOKEN || BotToken;
    ChatID = env.TGID || ChatID;
    TG = env.TG || TG;
    subConverter = env.SUBAPI || subConverter;
    if (subConverter.includes("http://")) {
      subConverter = subConverter.split("//")[1];
      subProtocol = "http";
    } else {
      subConverter = subConverter.split("//")[1] || subConverter;
    }
    subConfig = env.SUBCONFIG || subConfig;
    FileName = env.SUBNAME || FileName;
    const currentDate = /* @__PURE__ */ new Date();
    currentDate.setHours(0, 0, 0, 0);
    const timeTemp = Math.ceil(currentDate.getTime() / 1e3);
    const fakeToken = await MD5MD5(`${mytoken}${timeTemp}`);
    guestToken = env.GUESTTOKEN || env.GUEST || guestToken;
    if (!guestToken) guestToken = await MD5MD5(mytoken);
    const \u8BBF\u5BA2\u8BA2\u9605 = guestToken;
    let UD = Math.floor((timestamp - Date.now()) / timestamp * total * 1099511627776 / 2);
    total = total * 1099511627776;
    let expire = Math.floor(timestamp / 1e3);
    SUBUpdateTime = env.SUBUPTIME || SUBUpdateTime;
    
    if (!([mytoken, fakeToken, \u8BBF\u5BA2\u8BA2\u9605].includes(token) || url.pathname.includes("/" + mytoken) || url.pathname.includes("/" + subKey + "/" + mytoken))) {
      if (TG == 1 && url.pathname !== "/" && url.pathname !== "/favicon.ico") await sendMessage(`#\u5F02\u5E38\u8BBF\u95EE ${FileName}`, request.headers.get("CF-Connecting-IP"), `UA: ${userAgentHeader}</tg-spoiler>
\u57DF\u540D: ${url.hostname}
<tg-spoiler>\u5165\u53E3: ${url.pathname + url.search}</tg-spoiler>`);
      if (env.URL302) return Response.redirect(env.URL302, 302);
      else if (env.URL) return await proxyURL(env.URL, url);
      else return new Response(await nginx(), {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=UTF-8"
        }
      });
    } else {
      const KV_KEY = `LINK.${subKey}.txt`;
      if (env.KV) {
        await \u8FC1\u79FB\u5730\u5740\u5217\u8868(env, "LINK.txt", KV_KEY);
        if (userAgent.includes("mozilla") && !url.search) {
          await sendMessage(`#\u7F16\u8F91\u8BA2\u9605 ${FileName}`, request.headers.get("CF-Connecting-IP"), `UA: ${userAgentHeader}</tg-spoiler>
\u57DF\u540D: ${url.hostname}
<tg-spoiler>\u5165\u53E3: ${url.pathname + url.search}</tg-spoiler>`);
          return await KV(request, env, KV_KEY, \u8BBF\u5BA2\u8BA2\u9605);
        } else {
          MainData = await env.KV.get(KV_KEY) || MainData;
        }
      } else {
        MainData = env.LINK || MainData;
        if (env.LINKSUB) urls = await ADD(env.LINKSUB);
      }
      
      // 【修改】将所有链接（包括MainData和urls）合并
      const allLinks = (await ADD(MainData + "\n" + urls.join("\n"))).filter(link => link.trim() !== "");
      
      // 分类链接：IP地址链接（GCP节点）和域名链接（HF节点）
      const ipLinks = [];
      const domainLinks = [];
      
      for (const link of allLinks) {
        if (isIpAddress(link)) {
          ipLinks.push(link);
        } else {
          domainLinks.push(link);
        }
      }
      
      console.log(`IP links: ${ipLinks.length}, Domain links: ${domainLinks.length}`);
      
      // 并行获取不同类型的链接内容
      let ipContent = '';
      let domainContent = '';
      
      if (ipLinks.length > 0) {
        console.log('Fetching IP links via subconverter:', ipLinks);
        ipContent = await getGCPNodes(ipLinks);
      }
      
      if (domainLinks.length > 0) {
        console.log('Fetching domain links directly:', domainLinks);
        domainContent = await getSUB(domainLinks);
      }
      
      // 合并所有内容
      let fullContent = '';
      if (domainContent) fullContent += domainContent;
      if (ipContent) {
        if (fullContent) fullContent += '\n';
        fullContent += ipContent;
      }
      
      console.log(`Combined content length: ${fullContent.length}`);
      
      let targetClient = "clash"; // 默认转换成clash
      if (url.searchParams.has("b64") || url.searchParams.has("base64")) {
        // 如果是b64，直接返回base64编码的内容
        const base64Content = btoa(encodeURIComponent(fullContent).replace(/%([0-9A-F]{2})/g, function(match, p1) {
          return String.fromCharCode('0x' + p1);
        }));
        
        const newHeaders = new Headers();
        newHeaders.set("Content-Type", "text/plain; charset=utf-8");
        // 【修改】根据User-Agent判断是否添加Content-Disposition
        if (!userAgent.includes("mozilla")) {
          newHeaders.set("content-disposition", `attachment; filename*=UTF-8''${encodeURIComponent(FileName)}.txt`);
        }
        newHeaders.set("profile-update-interval", `${SUBUpdateTime}`);
        newHeaders.set("profile-web-page-url", request.url);
        
        return new Response(base64Content, {
          headers: newHeaders
        });
      } else if (url.searchParams.has("clash")) {
        targetClient = "clash";
      } else if (url.searchParams.has("singbox") || url.searchParams.has("sb")) {
        targetClient = "singbox";
      } else if (url.searchParams.has("surge")) {
        targetClient = "surge&ver=4";
      } else if (url.searchParams.has("quanx")) {
        targetClient = "quanx";
      } else if (url.searchParams.has("loon")) {
        targetClient = "loon";
      } else if (userAgent.includes("clash")) {
        targetClient = "clash";
      } else if (userAgent.includes("sing-box") || userAgent.includes("singbox")) {
        targetClient = "singbox";
      } else if (userAgent.includes("surge")) {
        targetClient = "surge&ver=4";
      } else if (userAgent.includes("quantumult")) {
        targetClient = "quanx";
      } else if (userAgent.includes("loon")) {
        targetClient = "loon";
      } else {
        // 对于非b64格式，将完整内容发送给subconverter进行格式转换
        targetClient = "clash";
      }
      
      // 如果不是base64请求，将合并的内容发送给subconverter进行格式转换
      if (url.searchParams.has("b64") || url.searchParams.has("base64")) {
        // 已经在上面处理了base64情况
      } else {
        // 使用POST方式将内容发送给subconverter进行转换
        let subconverterUrl = `${subProtocol}://${subConverter}/sub?target=${targetClient}&config=${encodeURIComponent(subConfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
        
        // 传递其他高级参数
        if (url.searchParams.get("exclude")) subconverterUrl += "&exclude=" + url.searchParams.get("exclude");
        if (url.searchParams.get("include")) subconverterUrl += "&include=" + url.searchParams.get("include");
        if (url.searchParams.get("filename")) subconverterUrl += "&filename=" + url.searchParams.get("filename");
        if (url.searchParams.get("rename")) subconverterUrl += "&rename=" + url.searchParams.get("rename");
        
        console.log("Subconverter POST URL:", subconverterUrl);
        
        // 发送POST请求到subconverter
        const response = await fetch(subconverterUrl, {
          method: 'POST',
          body: fullContent,
          headers: {
            "Content-Type": "text/plain",
            "User-Agent": userAgentHeader
          }
        });
        
        const newHeaders = new Headers(response.headers);
        // 【修改】根据User-Agent判断是否添加Content-Disposition
        if (!userAgent.includes("mozilla")) {
          newHeaders.set("content-disposition", `attachment; filename*=UTF-8''${encodeURIComponent(FileName)}`);
        }
        newHeaders.set("profile-update-interval", `${SUBUpdateTime}`);
        newHeaders.set("profile-web-page-url", request.url);
        
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
      }
    }
  }
};
async function ADD(envadd) {
  var addtext = envadd.replace(/[	"'|\r\n]+/g, "\n").replace(/\n+/g, "\n");
  if (addtext.charAt(0) == "\n") addtext = addtext.slice(1);
  if (addtext.charAt(addtext.length - 1) == "\n") addtext = addtext.slice(0, addtext.length - 1);
  const add = addtext.split("\n");
  return add;
}
__name(ADD, "ADD");
async function nginx() {
  const text = `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`;
  return text;
}
__name(nginx, "nginx");
async function sendMessage(type, ip, add_data = "") {
  if (BotToken !== "" && ChatID !== "") {
    let msg = "";
    const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
    if (response.status == 200) {
      const ipInfo = await response.json();
      msg = `${type}
IP: ${ip}
\u56FD\u5BB6: ${ipInfo.country}
<tg-spoiler>\u57CE\u5E02: ${ipInfo.city}
\u7EC4\u7EC7: ${ipInfo.org}
ASN: ${ipInfo.as}
${add_data}`;
    } else {
      msg = `${type}
IP: ${ip}
<tg-spoiler>${add_data}`;
    }
    let url = "https://api.telegram.org/bot" + BotToken + "/sendMessage?chat_id=" + ChatID + "&parse_mode=HTML&text=" + encodeURIComponent(msg);
    return fetch(url, {
      method: "get",
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": "Mozilla/5.0 Chrome/90.0.4430.72"
      }
    });
  }
}
__name(sendMessage, "sendMessage");
function base64Decode(str) {
  const bytes = new Uint8Array(atob(str).split("").map((c) => c.charCodeAt(0)));
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(bytes);
}
__name(base64Decode, "base64Decode");
async function MD5MD5(text) {
  const encoder = new TextEncoder();
  const firstPass = await crypto.subtle.digest("MD5", encoder.encode(text));
  const firstPassArray = Array.from(new Uint8Array(firstPass));
  const firstHex = firstPassArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  const secondPass = await crypto.subtle.digest("MD5", encoder.encode(firstHex.slice(7, 27)));
  const secondPassArray = Array.from(new Uint8Array(secondPass));
  const secondHex = secondPassArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return secondHex.toLowerCase();
}
__name(MD5MD5, "MD5MD5");
async function \u8FC1\u79FB\u5730\u5740\u5217\u8868(env, oldKey, newKey) {
  const oldData = await env.KV.get(oldKey);
  const newData = await env.KV.get(newKey);
  if (oldData && !newData) {
    await env.KV.put(newKey, oldData);
    await env.KV.delete(oldKey);
    return true;
  }
  return false;
}
__name(\u8FC1\u79FB\u5730\u5740\u5217\u8868, "\u8FC1\u79FB\u5730\u5740\u5217\u8868");
async function KV(request, env, txt, guest) {
  const url = new URL(request.url);
  const mytoken = env.TOKEN || "auto";
  const subKey = txt.split('.')[1] || 'main';
  try {
    if (request.method === "POST") {
      if (!env.KV) return new Response("\u672A\u7ED1\u5B9AKV\u7A7A\u95F4", { status: 400 });
      try {
        const content2 = await request.text();
        await env.KV.put(txt, content2);
        return new Response("\u4FDD\u5B58\u6210\u529F");
      } catch (error) {
        console.error("\u4FDD\u5B58KV\u65F6\u53D1\u751F\u9519\u8BEF:", error);
        return new Response("\u4FDD\u5B58\u5931\u8D25: " + error.message, { status: 500 });
      }
    }
    let content = "";
    let hasKV = !!env.KV;
    let subKeyList = [];
    if (hasKV) {
      try {
        content = await env.KV.get(txt) || "";
        const list = await env.KV.list({ prefix: "LINK." });
        for (const key of list.keys) {
            const parts = key.name.split('.');
            if (parts.length === 3 && parts[0] === 'LINK' && parts[2] === 'txt') {
                subKeyList.push(parts[1]);
            }
        }
      } catch (error) {
        console.error("\u8BFB\u53D6KV\u65F6\u53D1\u751F\u9519\u8BEF:", error);
        content = "\u8BFB\u53D6\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: " + error.message;
      }
    }
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${FileName} \u8BA2\u9605\u7F16\u8F91</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
						body { margin: 0; padding: 15px; box-sizing: border-box; font-size: 13px; }
						.editor-container { width: 100%; max-width: 100%; margin: 0 auto; }
						.editor { width: 100%; height: 300px; margin: 15px 0; padding: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px; font-size: 13px; line-height: 1.5; overflow-y: auto; resize: none; }
						.save-container { margin-top: 8px; display: flex; align-items: center; gap: 10px; }
						.save-btn, .back-btn { padding: 6px 15px; color: white; border: none; border-radius: 4px; cursor: pointer; }
						.save-btn { background: #4CAF50; }
						.save-btn:hover { background: #45a049; }
						.back-btn { background: #666; }
						.back-btn:hover { background: #555; }
						.save-status { color: #666; }
          </style>
          <script src="https://cdn.jsdelivr.net/npm/@keeex/qrcodejs-kx@1.0.2/qrcode.min.js"><\/script>
        </head>
        <body>
          ################################################################<br>
          Subscribe / sub \u8BA2\u9605\u5730\u5740, \u70B9\u51FB\u94FE\u63A5\u81EA\u52A8 <strong>\u590D\u5236\u8BA2\u9605\u94FE\u63A5</strong> \u5E76 <strong>\u751F\u6210\u8BA2\u9605\u4E8C\u7EF4\u7801</strong> <br>
          ---------------------------------------------------------------<br>
          \u5F53\u524D\u914D\u7F6E\u540D\u79F0: 
          <input type="text" id="configNameInput" value="${subKey}" style="border: 1px solid #ccc; padding: 5px; width: 150px; display: inline-block;">
          <button class="back-btn" onclick="goToConfig()" style="display: inline-block; padding: 6px 15px; margin-left: 10px; background: #6a11cb; color: white;">\u8FDB\u5165\u914D\u7F6E</button>
          <br>
          <div id="configList" style="margin-top: 10px;">
              \u5DF2\u6709\u914D\u7F6E: 
              ${subKeyList.map(k => `<span onclick="setConfig('${k}')" style="cursor:pointer; color:blue; text-decoration:underline; margin-right:10px;">${k}</span>`).join('')}
          </div>
          ---------------------------------------------------------------<br>
          \u81EA\u9002\u5E94\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?sub','qrcode_0')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}</a><br>
          <div id="qrcode_0" style="margin: 10px 10px 10px 10px;"></div>
          Base64\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?b64','qrcode_1')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}?b64</a><br>
          <div id="qrcode_1" style="margin: 10px 10px 10px 10px;"></div>
          clash\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?clash','qrcode_2')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}?clash</a><br>
          <div id="qrcode_2" style="margin: 10px 10px 10px 10px;"></div>
          singbox\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?sb','qrcode_3')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}?sb</a><br>
          <div id="qrcode_3" style="margin: 10px 10px 10px 10px;"></div>
          surge\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?surge','qrcode_4')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}?surge</a><br>
          <div id="qrcode_4" style="margin: 10px 10px 10px 10px;"></div>
          loon\u8BA2\u9605\u5730\u5740:<br>
          <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/${subKey}/${mytoken}?loon','qrcode_5')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/${subKey}/${mytoken}?loon</a><br>
          <div id="qrcode_5" style="margin: 10px 10px 10px 10px;"></div>
          &nbsp;&nbsp;<strong><a href="javascript:void(0);" id="noticeToggle" onclick="toggleNotice()">\u67E5\u770B\u8BBF\u5BA2\u8BA2\u9605\u2228</a></strong><br>
          <div id="noticeContent" class="notice-content" style="display: none;">
            ---------------------------------------------------------------<br>
            \u8BBF\u5BA2\u8BA2\u9605\u53EA\u80FD\u4F7F\u7528\u8BA2\u9605\u529F\u80FD\uFF0C\u65E0\u6CD5\u67E5\u770B\u914D\u7F6E\u9875\uFF01<br>
            GUEST\uFF08\u8BBF\u5BA2\u8BA2\u9605TOKEN\uFF09: <strong>${guest}</strong><br>
            ---------------------------------------------------------------<br>
            \u81EA\u9002\u5E94\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}','guest_0')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}</a><br>
            <div id="guest_0" style="margin: 10px 10px 10px 10px;"></div>
            Base64\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}&b64','guest_1')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}&b64</a><br>
            <div id="guest_1" style="margin: 10px 10px 10px 10px;"></div>
            clash\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}&clash','guest_2')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}&clash</a><br>
            <div id="guest_2" style="margin: 10px 10px 10px 10px;"></div>
            singbox\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}&sb','guest_3')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}&sb</a><br>
            <div id="guest_3" style="margin: 10px 10px 10px 10px;"></div>
            surge\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}&surge','guest_4')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}&surge</a><br>
            <div id="guest_4" style="margin: 10px 10px 10px 10px;"></div>
            loon\u8BA2\u9605\u5730\u5740:<br>
            <a href="javascript:void(0)" onclick="copyToClipboard('https://${url.hostname}/sub?token=${guest}&loon','guest_5')" style="color:blue;text-decoration:underline;cursor:pointer;">https://${url.hostname}/sub?token=${guest}&loon</a><br>
            <div id="guest_5" style="margin: 10px 10px 10px 10px;"></div>
          </div>
          ---------------------------------------------------------------<br>
          ################################################################<br>
          \u8BA2\u9605\u8F6C\u6362\u914D\u7F6E<br>
          ---------------------------------------------------------------<br>
          SUBAPI\uFF08\u8BA2\u9605\u8F6C\u6362\u540E\u7AEF\uFF09: <strong>${subProtocol}://${subConverter}</strong><br>
          SUBCONFIG\uFF08\u8BA2\u9605\u8F6C\u6362\u914D\u7F6E\u6587\u4EF6\uFF09: <strong>${subConfig}</strong><br>
          ---------------------------------------------------------------<br>
          ################################################################<br>
          CF-Workers-SUB \u6C47\u805A\u8BA2\u9605\u7F16\u8F91: 
          <div class="editor-container">
            ${hasKV ? `
            <textarea class="editor" 
              placeholder="LINK示例（一行一个订阅链接/节点链接）：\nvless://246aa795-0637-4f4c-8f64-2c8fb24c1bad@127.0.0.1:1234?encryption=none&security=tls&sni=TG.CMLiussss.loseyourip.com&allowInsecure=1&type=ws&host=TG.CMLiussss.loseyourip.com&path=%2F%3Fed%3D2560%23CFnat\ntrojan://aa6ddd2f-d1cf-4a52-ba1b-2640c41a7856@218.190.230.207:41288?security=tls&sni=hk12.bilibili.com&allowInsecure=1&type=tcp&headerType=none#HK\nss://Y2hhY2hhMjAtaWV0Zi1wb2x5MTMwNToyRXRQcW42SFlqVE5jSG9oTGZVcEZRd25makNDUTVtaDFtSmRFTUNCdWN1V1o5UDF1ZGtSS0huVnh1bzU1azFLWHoyRm82anJndDE4VzY2b3B0eTFlNGJtMWp6ZkNmQmI%3D@84.19.31.63:50841#DE\n\n\n（订阅链接示例）：\nhttps://sub.xf.free.hr/auto"
              id="content">${content}</textarea>
            <div class="save-container">
              <button class="save-btn" onclick="saveContent(this)">\u4FDD\u5B58</button>
              <span class="save-status" id="saveStatus"></span>
            </div>
            ` : "<p>\u8BF7\u7ED1\u5B9A <strong>\u53D8\u91CF\u540D\u79F0</strong> \u4E3A <strong>KV</strong> \u7684KV\u547D\u540D\u7A7A\u95F4</p>"}
          </div>
          <br>
          ################################################################<br>
          telegram 交流群 技术大佬~在线吹发！<br>
          <a href='https://t.me/CMLiussss'>https://t.me/CMLiussss</a><br>
          ---------------------------------------------------------------<br>
          github 项目地址 Star!Star!Star!!!<br>
          <a href='https://github.com/cmliu/CF-Workers-SUB'>https://github.com/cmliu/CF-Workers-SUB</a><br>
          <br><br>UA: <strong>${request.headers.get("User-Agent")}</strong>
          <script>
          const mytoken = '${mytoken}';
          function goToConfig() {
              const configName = document.getElementById('configNameInput').value;
              const currentPath = window.location.pathname;
              const newToken = currentPath.split('/').pop();
              const newUrl = \`https://${url.hostname}/\${configName}/\${newToken}\`;
              if (configName !== '${subKey}') {
                  window.location.href = newUrl;
              } else {
                  alert('\u914D\u7F6E\u540D\u79F0\u672A\u6539\u53D8\uFF0C\u65E0\u9700\u8FDB\u5165');
              }
          }
          function setConfig(name) {
              document.getElementById('configNameInput').value = name;
              goToConfig();
          }
          function copyToClipboard(text, qrcode) {
            navigator.clipboard.writeText(text).then(() => {
              alert('\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F');
            }).catch(err => {
              console.error('\u590D\u5236\u5931\u8D25:', err);
            });
            const qrcodeDiv = document.getElementById(qrcode);
            qrcodeDiv.innerHTML = '';
            new QRCode(qrcodeDiv, {
              text: text,
              width: 220,
              height: 220,
              colorDark: "#000000",
              colorLight: "#ffffff",
              correctLevel: QRCode.CorrectLevel.Q,
              scale: 1
            });
          }
					if (document.querySelector('.editor')) {
						let timer;
						const textarea = document.getElementById('content');
						const originalContent = textarea.value;
						function goBack() {
							const currentUrl = window.location.href;
							const parentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
							window.location.href = parentUrl;
						}
						function replaceFullwidthColon() {
							const text = textarea.value;
							textarea.value = text.replace(/\uFF1A/g, ':');
						}
						function saveContent(button) {
							try {
								const updateButtonText = (step) => {
									button.textContent = \`\u4FDD\u5B58\u4E2D: \${step}\`;
								};
								const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
								if (!isIOS) {
									replaceFullwidthColon();
								}
								updateButtonText('\u5F00\u59CB\u4FDD\u5B58');
								button.disabled = true;
								const textarea = document.getElementById('content');
								if (!textarea) {
									throw new Error('\u627E\u4E0D\u5230\u6587\u672C\u7F16\u8F91\u533A\u57DF');
								}
								updateButtonText('\u83B7\u53D6\u5185\u5BB9');
								let newContent;
								let originalContent;
								try {
									newContent = textarea.value || '';
									originalContent = textarea.defaultValue || '';
								} catch (e) {
									console.error('\u83B7\u53D6\u5185\u5BB9\u9519\u8BEF:', e);
									throw new Error('\u65E0\u6CD5\u83B7\u53D6\u7F16\u8F91\u5185\u5BB9');
								}
								updateButtonText('\u51C6\u5907\u72B6\u6001\u66F4\u65B0\u51FD\u6570');
								const updateStatus = (message, isError = false) => {
									const statusElem = document.getElementById('saveStatus');
									if (statusElem) {
										statusElem.textContent = message;
										statusElem.style.color = isError ? 'red' : '#666';
									}
								};
								updateButtonText('\u51C6\u5907\u6309\u94AE\u91CD\u7F6E\u51FD\u6570');
								const resetButton = () => {
									button.textContent = '\u4FDD\u5B58';
									button.disabled = false;
								};
                if (newContent !== originalContent) {
                  updateButtonText('\u53D1\u9001\u4FDD\u5B58\u8BF7\u6C42');
                  button.disabled = true;
                  const newConfigName = document.getElementById('configNameInput').value;
                  const newSaveUrl = \`https://${url.hostname}/\${newConfigName || 'main'}/\${mytoken}\`;
                  fetch(newSaveUrl, {
                    method: 'POST',
                    body: newContent,
                    headers: {
                      'Content-Type': 'text/plain;charset=UTF-8'
                    },
                    cache: 'no-cache'
                  })
                  .then(response => {
										updateButtonText('\u68C0\u67E5\u54CD\u5E94\u72B6\u6001');
										if (!response.ok) {
											throw new Error(\`HTTP error! status: \${response.status}\`);
										}
										updateButtonText('\u66F4\u65B0\u4FDD\u5B58\u72B6\u6001');
										const now = new Date().toLocaleString();
										document.title = \`\u7F16\u8F91\u5DF2\u4FDD\u5B58 \${now}\`;
										updateStatus(\`\u5DF2\u4FDD\u5B58 \${now}\`);
									})
									.catch(error => {
										updateButtonText('\u5904\u7406\u9519\u8BEF');
										console.error('Save error:', error);
										updateStatus(\`\u4FDD\u5B58\u5931\u8D25: \${error.message}\`, true);
									})
									.finally(() => {
										resetButton();
									});
								} else {
									updateButtonText('\u68C0\u67E5\u5185\u5BB9\u53D8\u5316');
									updateStatus('\u5185\u5BB9\u672A\u53D8\u5316');
									resetButton();
								}
							} catch (error) {
								console.error('\u4FDD\u5B58\u8FC7\u7A0B\u51FA\u9519:', error);
								button.textContent = '\u4FDD\u5B58';
								button.disabled = false;
								const statusElem = document.getElementById('saveStatus');
								if (statusElem) {
									statusElem.textContent = \`\u9519\u8BEF: \${error.message}\`;
									statusElem.style.color = 'red';
								}
							}
						}
						textarea.addEventListener('blur', saveContent);
						textarea.addEventListener('input', () => {
							clearTimeout(timer);
							timer = setTimeout(saveContent, 5000);
						});
					}
					function toggleNotice() {
						const noticeContent = document.getElementById('noticeContent');
						const noticeToggle = document.getElementById('noticeToggle');
						if (noticeContent.style.display === 'none' || noticeContent.style.display === '') {
							noticeContent.style.display = 'block';
							noticeToggle.textContent = '\u9690\u85CF\u8BBF\u5BA2\u8BA2\u9605\u2227';
						} else {
							noticeContent.style.display = 'none';
							noticeToggle.textContent = '\u67E5\u770B\u8BBF\u5BA2\u8BA2\u9605\u2228';
						}
					}
					document.addEventListener('DOMContentLoaded', () => {
						document.getElementById('noticeContent').style.display = 'none';
					});
					<\/script>
				</body>
			</html>
		`;
    return new Response(html, {
      headers: { "Content-Type": "text/html;charset=utf-8" }
    });
  } catch (error) {
    console.error("\u5904\u7406\u8BF7\u6C42\u65F6\u53D1\u751F\u9519\u8BEF:", error);
    return new Response("\u670D\u52A1\u5668\u9519\u8BEF: " + error.message, {
      status: 500,
      headers: { "Content-Type": "text/plain;charset=utf-8" }
    });
  }
}
__name(KV, "KV");
export {
  worker_default as default
};
//# sourceMappingURL=_worker.js.map